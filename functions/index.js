const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const firestore = admin.firestore();

/**
 * Cloud Function triggered by Realtime Database writes to /status/{uid}.
 * Listens to onDisconnect events in Realtime Database and updates the user's
 * 'presenceState' and 'lastSeenAt' fields in the 'users' Firestore collection.
 */
exports.onUserPresenceChange = functions.database
  .ref("/status/{uid}")
  .onWrite(async (change, context) => {
    const uid = context.params.uid;
    const eventData = change.after.val();

    if (!eventData) {
      return null;
    }

    const userRef = firestore.collection("users").doc(uid);

    const presenceState = eventData.presenceState || (eventData.isOnline ? "online" : "offline");
    const lastSeenAt = eventData.lastSeenAt || eventData.lastSeen || Date.now();
    const isOnline = eventData.isOnline ?? (presenceState === "online");

    console.log(`[Presence Cloud Function] Syncing user ${uid} to Firestore: state=${presenceState}`);

    return userRef.set(
      {
        presenceState: presenceState,
        lastSeenAt: lastSeenAt,
        isOnline: isOnline,
        lastSeen: lastSeenAt,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });

/**
 * Cloud Function triggered by new message creation in Firestore: /chats/{chatId}/messages/{messageId}
 * Fetches chat members and sends FCM Push Notifications to offline/background recipients.
 */
exports.onNewMessage = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const message = snapshot.data();
    const chatId = context.params.chatId;

    if (!message || !message.senderId) {
      return null;
    }

    try {
      // 1. Get Chat Room document to find all members
      const chatDoc = await firestore.collection("chats").doc(chatId).get();
      if (!chatDoc.exists) return null;

      const chatData = chatDoc.data();
      const members = chatData.members || [];
      const recipients = members.filter((uid) => uid !== message.senderId);

      if (recipients.length === 0) return null;

      // 2. Fetch FCM Tokens for all recipients
      const recipientTokens = [];
      for (const uid of recipients) {
        const userDoc = await firestore.collection("users").doc(uid).get();
        if (userDoc.exists) {
          const uData = userDoc.data();
          if (uData.fcmTokens && Array.isArray(uData.fcmTokens) && uData.fcmTokens.length > 0) {
            recipientTokens.push(...uData.fcmTokens);
          }
        }
      }

      if (recipientTokens.length === 0) {
        console.log(`[FCM Cloud Function] No FCM tokens found for recipients of chat ${chatId}`);
        return null;
      }

      // Deduplicate tokens
      const uniqueTokens = Array.from(new Set(recipientTokens));

      // 3. Construct Notification Payload
      const senderName = message.senderName || "Tirak User";
      const roomName = chatData.name || senderName;
      const isGroup = chatData.type === "group";
      const title = isGroup ? `${senderName} (@${roomName})` : senderName;

      let body = message.content || "ส่งข้อความถึงคุณ";
      if (message.contentType === "image") body = "📷 ส่งรูปภาพ";
      else if (message.contentType === "document") body = "📄 ส่งไฟล์เอกสาร";
      else if (message.contentType === "location") body = "📍 แชร์ตำแหน่ง";
      else if (message.contentType === "voice_note") body = "🎙️ ข้อความเสียง";

      const payload = {
        notification: {
          title: title,
          body: body,
        },
        data: {
          chatId: chatId,
          senderId: message.senderId,
          messageId: context.params.messageId,
          url: `/?chat=${chatId}`,
        },
        tokens: uniqueTokens,
      };

      // 4. Send Multicast Message
      const response = await admin.messaging().sendEachForMulticast(payload);
      console.log(`[FCM Cloud Function] Sent ${response.successCount} push notifications for message in chat ${chatId}`);
      return response;
    } catch (err) {
      console.error("[FCM Cloud Function] Error sending push notification:", err);
      return null;
    }
  });

