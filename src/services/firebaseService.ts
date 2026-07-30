import { db, rtdb, auth } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import {
  ref as rtdbRef,
  set as rtdbSet,
  onValue,
  onDisconnect,
} from "firebase/database";
import { ChatMessage, ChatRoom, UserProfile } from "../types";

export interface CallSession {
  id: string;
  callerId: string;
  callerName: string;
  callerAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  chatId?: string;
  type: "voice" | "video";
  status: "calling" | "ongoing" | "ended" | "rejected";
  startedAt?: number;
  endedAt?: number;
  duration?: number;
  createdAt: number;
}

export class FirebaseService {
  /**
   * Fetch call history for a user
   */
  static async getCallHistory(userId: string): Promise<CallSession[]> {
    try {
      const callsRef = collection(db, "calls");

      // We query caller and receiver separately
      const outgoingQuery = query(callsRef, where("callerId", "==", userId));

      const incomingQuery = query(callsRef, where("receiverId", "==", userId));

      const [outgoingSnapshot, incomingSnapshot] = await Promise.all([
        getDocs(outgoingQuery),
        getDocs(incomingQuery),
      ]);

      const outgoingCalls = outgoingSnapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as CallSession,
      );
      const incomingCalls = incomingSnapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as CallSession,
      );

      const allCalls = [...outgoingCalls, ...incomingCalls];

      // Deduplicate in case a user calls themselves (edge case)
      const uniqueCalls = Array.from(
        new Map(allCalls.map((c) => [c.id, c])).values(),
      );

      return uniqueCalls
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .slice(0, 50);
    } catch (error) {
      console.error("Error fetching call history:", error);
      return [];
    }
  }

  /**
   * Ensures Firebase Auth state is active (using anonymous auth if not signed in)
   */
  public static async ensureFirebaseAuth(): Promise<void> {
    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
    } catch (err) {
      // Ignore if anonymous auth disabled or offline
    }
  }

  /**
   * Find user profile by phone number to prevent duplicate registration
   */

  /**
   * Strictly restricted for security & privacy: Users cannot dump all users publicly.
   * Returns empty list to preserve interface contract while enforcing strict privacy lock.
   */
  public static async getAllUsers(): Promise<any[]> {
    console.warn("getAllUsers is restricted due to privacy lock. Use subscribeToFriends instead.");
    return [];
  }

  public static async findUserByPhone(
    phone: string,
  ): Promise<UserProfile | null> {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phone", "==", phone));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
      }

      // Secondary check without symbols if no direct match
      if (cleanPhone.length >= 8) {
        const allUsersSnap = await getDocs(usersRef);
        for (const docSnap of allUsersSnap.docs) {
          const uData = docSnap.data();
          if (
            uData.phone &&
            uData.phone.replace(/\D/g, "").includes(cleanPhone)
          ) {
            return { uid: docSnap.id, ...uData } as UserProfile;
          }
        }
      }
      return null;
    } catch (err) {
      console.warn("findUserByPhone error:", err);
      return null;
    }
  }

  /**
   * Find user profile by UID or email
   */
  public static async findUserByUidOrEmail(
    identifier: string,
  ): Promise<UserProfile | null> {
    try {
      // 1. Direct doc lookup by UID
      const userDocRef = doc(db, "users", identifier);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        return { uid: userSnap.id, ...userSnap.data() } as UserProfile;
      }

      // 2. Query by email field
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", identifier));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
      }

      return null;
    } catch (err) {
      console.warn("findUserByUidOrEmail error:", err);
      return null;
    }
  }

  /**
   * Phone Authentication: Setup Recaptcha
   */
  public static setupRecaptcha(containerId: string): RecaptchaVerifier {
    return new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      }
    });
  }

  /**
   * Phone Authentication: Send OTP
   */
  public static async sendOtp(
    phoneNumber: string,
    appVerifier: RecaptchaVerifier
  ): Promise<ConfirmationResult> {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error) {
      console.error("Error during sendOtp:", error);
      throw error;
    }
  }

  /**
   * Phone Authentication: Verify OTP
   */
  public static async verifyOtp(
    confirmationResult: ConfirmationResult,
    code: string
  ): Promise<UserProfile> {
    try {
      const result = await confirmationResult.confirm(code);
      const fUser = result.user;
      
      let userProfile = await this.findUserByUidOrEmail(fUser.uid);
      
      if (!userProfile) {
        // If they are registering, create a new profile placeholder.
        const mockUsername = `user_${fUser.uid.substring(0, 6)}`;
        const mockName = `User ${fUser.uid.substring(0, 4)}`;
        userProfile = {
          uid: fUser.uid,
          displayName: mockName,
          username: mockUsername.toLowerCase(),
          email: "",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          phone: fUser.phoneNumber || "",
          about: "Hey there! I am using Tirak Chat.",
          isOnline: true,
          createdAt: Date.now(),
        };
        await this.saveUserProfile(userProfile);
      }
      return userProfile;
    } catch (error) {
      console.error("Error during verifyOtp:", error);
      throw error;
    }
  }

  /**
   * Sign in with Google (Gmail Account)
   */
  public static async signInWithGoogle(): Promise<{
    user: UserProfile;
    isExisting: boolean;
  }> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const gUser = result.user;

      // Check if user already exists in Firestore's 'users' collection
      let existingUser =
        (await this.findUserByUidOrEmail(gUser.uid)) ||
        (gUser.email ? await this.findUserByUidOrEmail(gUser.email) : null);

      if (existingUser) {
        // Only fill in missing fields from Google info to prevent overwriting custom user edits
        if (!existingUser.displayName && gUser.displayName) existingUser.displayName = gUser.displayName;
        if (!existingUser.photoURL && gUser.photoURL) existingUser.photoURL = gUser.photoURL;
        if (!existingUser.email && gUser.email) existingUser.email = gUser.email;

        // Persist user profile update in Firestore 'users' collection using upsert
        await this.saveUserProfile(existingUser);
        return { user: existingUser, isExisting: true };
      }

      // Create new user profile from Google info
      const newUser: UserProfile = {
        uid: gUser.uid,
        displayName: gUser.displayName || "NewFound User",
        username: (
          gUser.email?.split("@")[0] || `user_${Date.now()}`
        ).toLowerCase(),
        email: gUser.email || "",
        photoURL:
          gUser.photoURL ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        phone: gUser.phoneNumber || "",
        about: "Hey there! I am using Tirak Chat.",
        isOnline: true,
        createdAt: Date.now(),
      };

      await this.saveUserProfile(newUser);
      return { user: newUser, isExisting: false };
    } catch (err: any) {
      console.warn(
        "Google Sign In failed or popup blocked:",
        err?.code,
        err?.message,
      );
      if (
        err?.code === "auth/popup-blocked" ||
        err?.code === "auth/cancelled-popup-request" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/unauthorized-domain" ||
        err?.message?.includes("popup") ||
        err?.message?.includes("unauthorized domain")
      ) {
        // Fallback for sandboxed iframe environments: sign in anonymously and use a Google fallback profile
        const anonResult = await signInAnonymously(auth);
        const gUser = anonResult.user;

        const fallbackEmail =
          gUser.email || `user_${gUser.uid.substring(0, 6)}@tirak.app`;
        const fallbackName =
          gUser.displayName ||
          gUser.email?.split("@")[0] ||
          `User_${gUser.uid.substring(0, 4)}`;

        const fallbackUser: UserProfile = {
          uid: gUser.uid,
          displayName: fallbackName,
          username: (
            gUser.email?.split("@")[0] || `user_${gUser.uid.substring(0, 6)}`
          ).toLowerCase(),
          email: fallbackEmail,
          photoURL:
            gUser.photoURL ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          about: "ใช้งาน Tirak Chat",
          isOnline: true,
          createdAt: Date.now(),
        };

        const existingUser =
          (await this.findUserByUidOrEmail(fallbackUser.uid)) ||
          (gUser.email ? await this.findUserByUidOrEmail(gUser.email) : null);
        if (existingUser) {
          await this.saveUserProfile(existingUser);
          return { user: existingUser, isExisting: true };
        }

        await this.saveUserProfile(fallbackUser);
        return { user: fallbackUser, isExisting: false };
      }
      throw err;
    }
  }

  /**
   * Subscribe to Firebase Auth state changes with onAuthStateChanged observer
   * Persists user profile in Firestore's 'users' collection upon authentication.
   */
  public static subscribeToAuthChanges(
    callback: (userProfile: UserProfile | null) => void,
  ) {
    return onAuthStateChanged(auth, async (fUser) => {
      if (fUser) {
        let userProfile = await this.findUserByUidOrEmail(fUser.uid);
        if (!userProfile && fUser.email) {
          userProfile = await this.findUserByUidOrEmail(fUser.email);
        }
        if (!userProfile) {
          const userEmail = fUser.email || `${fUser.uid}@tirak.app`;
          const userName =
            fUser.displayName ||
            fUser.email?.split("@")[0] ||
            "สมาชิก Tirak Chat";

          userProfile = {
            uid: fUser.uid,
            displayName: userName,
            username: (
              fUser.email?.split("@")[0] || `user_${fUser.uid.substring(0, 6)}`
            ).toLowerCase(),
            email: userEmail,
            photoURL:
              fUser.photoURL ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
            about: "ใช้งาน Tirak Chat",
            isOnline: true,
            createdAt: Date.now(),
          };
        } else if (fUser.displayName || fUser.photoURL || fUser.email) {
          if (!userProfile.displayName && fUser.displayName) userProfile.displayName = fUser.displayName;
          if (!userProfile.photoURL && fUser.photoURL) userProfile.photoURL = fUser.photoURL;
          if (!userProfile.email && fUser.email) userProfile.email = fUser.email;
        }

        // Persist user profile to Firestore's 'users' collection
        await this.saveUserProfile(userProfile);
        callback(userProfile);
      } else {
        callback(null);
      }
    });
  }

  /**
   * Save or update user profile in Firestore
   */
  public static async saveUserProfile(user: UserProfile): Promise<void> {
    if (!user || !user.uid) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const profileData: Record<string, any> = {
        ...user,
        isOnline: true,
        presenceState: "online",
        lastSeenAt: Date.now(),
        lastSeen: Date.now(),
        updatedAt: serverTimestamp(),
      };

      // Strip out any undefined fields so setDoc with merge won't fail
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] === undefined) {
          delete profileData[key];
        }
      });

      await setDoc(userRef, profileData, { merge: true });

      // Synchronize presence in Realtime Database if available
      if (rtdb) {
        try {
          const statusRef = rtdbRef(rtdb, `status/${user.uid}`);
          await rtdbSet(statusRef, {
            isOnline: true,
            presenceState: "online",
            lastSeenAt: Date.now(),
            lastSeen: Date.now(),
          });

          const presenceRef = rtdbRef(rtdb, `presence/${user.uid}`);
          await rtdbSet(presenceRef, {
            isOnline: true,
            lastSeen: Date.now(),
          });
        } catch (rtdbErr) {
          console.warn("RTDB presence sync warning:", rtdbErr);
        }
      }
    } catch (err) {
      console.warn("Firestore saveUserProfile error:", err);
    }
  }

  /**
   * Listen to real-time chat rooms for a given user from Firestore
   * Seeds initial rooms if collection is empty
   */
  public static subscribeToChatRooms(
    userId: string,
    callback: (rooms: ChatRoom[]) => void,
  ): () => void {
    this.ensureFirebaseAuth();
    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("members", "array-contains", userId));

      return onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            callback([]);
            return;
          }

          const rooms: ChatRoom[] = [];
          snapshot.forEach((docSnap) => {
            rooms.push({ id: docSnap.id, ...docSnap.data() } as ChatRoom);
          });

          // Sort rooms by lastMessageAt descending
          rooms.sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0));
          callback(rooms);
        },
        (err) => {
          console.warn("subscribeToChatRooms error:", err);
          callback([]);
        },
      );
    } catch (err) {
      callback([]);
      return () => {};
    }
  }

  /**
   * Listen to real-time chat messages for a given chatId from Firestore
   * Seeds initial messages if subcollection is empty
   */
  public static subscribeToMessages(
    chatId: string,
    callback: (messages: ChatMessage[]) => void,
  ): () => void {
    this.ensureFirebaseAuth();
    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      return onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            callback([]);
            return;
          }

          const msgs: ChatMessage[] = [];
          snapshot.forEach((docSnap) => {
            msgs.push({ id: docSnap.id, ...docSnap.data() } as ChatMessage);
          });
          callback(msgs);
        },
        (error) => {
          console.warn("subscribeToMessages error:", error);
          callback([]);
        },
      );
    } catch (err) {
      console.warn("subscribeToMessages try-catch error:", err);
      callback([]);
      return () => {};
    }
  }

  public static async togglePinMessage(
    chatId: string,
    messageId: string,
    isPinned: boolean,
  ): Promise<void> {
    try {
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      await updateDoc(messageRef, { isPinned });
    } catch (err) {
      console.warn("Firestore togglePinMessage error:", err);
    }
  }

  public static async deleteMessage(
    chatId: string,
    messageId: string,
  ): Promise<void> {
    try {
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      await updateDoc(messageRef, {
        isDeleted: true,
        content: "ข้อความนี้ถูกลบแล้ว",
      });
    } catch (err) {
      console.warn("Firestore deleteMessage error:", err);
    }
  }

  public static async addReaction(
    chatId: string,
    messageId: string,
    userId: string,
    emoji: string,
  ): Promise<void> {
    try {
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      const msgSnap = await getDoc(messageRef);
      if (msgSnap.exists()) {
        const currentReactions = msgSnap.data().reactions || {};
        // Toggle emoji if already exists from this user
        if (currentReactions[userId] === emoji) {
          delete currentReactions[userId];
        } else {
          currentReactions[userId] = emoji;
        }
        await updateDoc(messageRef, { reactions: currentReactions });
      }
    } catch (err) {
      console.warn("Firestore addReaction error:", err);
    }
  }

  public static async markMessageAsRead(
    chatId: string,
    messageId: string,
    userId: string,
  ): Promise<void> {
    try {
      const messageRef = doc(db, "chats", chatId, "messages", messageId);
      const msgSnap = await getDoc(messageRef);
      if (msgSnap.exists()) {
        const readBy: string[] = msgSnap.data().readBy || [];
        if (!readBy.includes(userId)) {
          readBy.push(userId);
          await updateDoc(messageRef, { readBy });
        }
      }
    } catch (err) {
      console.warn("Firestore markMessageAsRead error:", err);
    }
  }

  /**
   * Send encrypted message to Firestore
   */
  public static async sendMessage(
    chatId: string,
    message: Omit<ChatMessage, "id">,
  ): Promise<string> {
    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      const newDoc = await addDoc(messagesRef, {
        ...message,
        createdAt: Date.now(),
      });

      // Update chat last message preview
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: message.content,
        lastMessageSenderId: message.senderId,
        lastMessageAt: Date.now(),
      });

      return newDoc.id;
    } catch (err) {
      console.warn("Firestore sendMessage error:", err);
      return "local_" + Date.now();
    }
  }

  /**
   * Create a new chat room in Firestore
   */
  public static async createChatRoom(room: ChatRoom): Promise<void> {
    try {
      const roomRef = doc(db, "chats", room.id);
      await setDoc(roomRef, room, { merge: true });
    } catch (err) {
      console.warn("Firestore createChatRoom error:", err);
    }
  }

  // ==========================================
  // FRIENDSHIP LOGIC
  // ==========================================

  public static async addFriend(
    userId: string,
    friendCode: string,
  ): Promise<{ success: boolean; status?: "pending" | "accepted"; message?: string }> {
    try {
      let friendId = friendCode;
      const cleanCode = friendCode.trim();

      // 1. Try to find by phone if it contains mostly numbers
      if (cleanCode.replace(/\D/g, "").length >= 8) {
        const userByPhone = await this.findUserByPhone(cleanCode);
        if (userByPhone) {
          friendId = userByPhone.uid;
        }
      }

      // 2. Try by username
      if (friendId === cleanCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", cleanCode.toLowerCase()));
        const qSnap = await getDocs(q);

        if (!qSnap.empty) {
          friendId = qSnap.docs[0].id;
        } else {
          // 3. Try as raw UID
          const docRef = doc(db, "users", cleanCode);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            return { success: false, message: "ไม่พบผู้ใช้งานนี้ในระบบ" };
          }
        }
      }

      if (userId === friendId) {
        return { success: false, message: "ไม่สามารถเพิ่มตนเองเป็นเพื่อนได้" };
      }

      const friendshipId =
        userId < friendId ? `${userId}_${friendId}` : `${friendId}_${userId}`;
      const friendshipRef = doc(db, "friendships", friendshipId);
      const existingSnap = await getDoc(friendshipRef);

      if (existingSnap.exists()) {
        const existingData = existingSnap.data();
        if (existingData.status === "accepted") {
          return { success: true, status: "accepted", message: "เป็นเพื่อนกันอยู่แล้ว" };
        }
        if (existingData.status === "pending") {
          // If the currentUser is the recipient of a pending request, auto accept
          if (existingData.recipientId === userId) {
            await updateDoc(friendshipRef, { status: "accepted", updatedAt: Date.now() });
            return { success: true, status: "accepted", message: "ตอบรับคำขอเป็นเพื่อนสำเร็จ" };
          }
          return { success: true, status: "pending", message: "ได้ส่งคำขอเป็นเพื่อนไปแล้ว รอการยืนยัน" };
        }
      }

      // Create new pending friend request
      await setDoc(
        friendshipRef,
        {
          id: friendshipId,
          userId: userId,
          friendId: friendId,
          requesterId: userId,
          recipientId: friendId,
          status: "pending", // Must be manually accepted by recipient
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        { merge: true },
      );

      return { success: true, status: "pending", message: "ส่งคำขอเป็นเพื่อนเรียบร้อยแล้ว" };
    } catch (err) {
      console.warn("Error adding friend:", err);
      return { success: false, message: "เกิดข้อผิดพลาดในการส่งคำขอเป็นเพื่อน" };
    }
  }

  public static async acceptFriendRequest(friendshipId: string): Promise<boolean> {
    try {
      const friendshipRef = doc(db, "friendships", friendshipId);
      await updateDoc(friendshipRef, {
        status: "accepted",
        updatedAt: Date.now(),
      });
      return true;
    } catch (err) {
      console.warn("Error accepting friend request:", err);
      return false;
    }
  }

  public static async rejectFriendRequest(friendshipId: string): Promise<boolean> {
    try {
      const friendshipRef = doc(db, "friendships", friendshipId);
      await updateDoc(friendshipRef, {
        status: "rejected",
        updatedAt: Date.now(),
      });
      return true;
    } catch (err) {
      console.warn("Error rejecting friend request:", err);
      return false;
    }
  }

  public static subscribeToFriendRequests(
    userId: string,
    callback: (requests: any[]) => void,
  ): () => void {
    try {
      const friendshipsRef = collection(db, "friendships");
      const q = query(
        friendshipsRef,
        where("recipientId", "==", userId),
        where("status", "==", "pending"),
      );

      return onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            callback([]);
            return;
          }

          const requests: any[] = [];
          for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            const requesterDoc = await getDoc(doc(db, "users", data.requesterId || data.userId));
            if (requesterDoc.exists()) {
              requests.push({
                friendshipId: docSnap.id,
                ...data,
                requester: { id: requesterDoc.id, ...requesterDoc.data() },
              });
            }
          }
          callback(requests);
        },
        (err) => {
          console.warn("subscribeToFriendRequests error:", err);
          callback([]);
        },
      );
    } catch (err) {
      console.warn("subscribeToFriendRequests try-catch error:", err);
      callback([]);
      return () => {};
    }
  }

  public static subscribeToFriends(
    userId: string,
    callback: (friends: any[]) => void,
  ): () => void {
    try {
      const friendshipsRef = collection(db, "friendships");
      const q1 = query(
        friendshipsRef,
        where("userId", "==", userId),
        where("status", "==", "accepted"),
      );
      const q2 = query(
        friendshipsRef,
        where("friendId", "==", userId),
        where("status", "==", "accepted"),
      );

      const fetchAndSetFriends = async () => {
        try {
          const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
          const friendIds = new Set<string>();

          snap1.forEach((d) => {
            const data = d.data();
            const target = data.friendId === userId ? data.userId : data.friendId;
            if (target && target !== userId) friendIds.add(target);
          });
          snap2.forEach((d) => {
            const data = d.data();
            const target = data.userId === userId ? data.friendId : data.userId;
            if (target && target !== userId) friendIds.add(target);
          });

          if (friendIds.size === 0) {
            callback([]);
            return;
          }

          const users: any[] = [];
          for (const fid of Array.from(friendIds)) {
            const userDoc = await getDoc(doc(db, "users", fid));
            if (userDoc.exists()) {
              users.push({ id: userDoc.id, uid: userDoc.id, ...userDoc.data() });
            }
          }
          callback(users);
        } catch (e) {
          console.warn("fetchAndSetFriends error:", e);
          callback([]);
        }
      };

      fetchAndSetFriends();
      const unsub1 = onSnapshot(q1, () => fetchAndSetFriends());
      const unsub2 = onSnapshot(q2, () => fetchAndSetFriends());

      return () => {
        unsub1();
        unsub2();
      };
    } catch (err) {
      console.warn("subscribeToFriends error:", err);
      callback([]);
      return () => {};
    }
  }

  // ==========================================
  // REAL-TIME CALL SIGNALING (FIRESTORE)
  // ==========================================

  /**
   * Step 2: Create Call Document in Firestore `/calls/{callId}`
   */
  public static async createCallSession(params: {
    callerId: string;
    callerName: string;
    callerAvatar: string;
    receiverId: string;
    receiverName: string;
    receiverAvatar: string;
    chatId?: string;
    type: "voice" | "video";
  }): Promise<string> {
    try {
      const callRef = doc(collection(db, "calls"));
      const newCall: CallSession = {
        id: callRef.id,
        callerId: params.callerId,
        callerName: params.callerName,
        callerAvatar: params.callerAvatar,
        receiverId: params.receiverId,
        receiverName: params.receiverName,
        receiverAvatar: params.receiverAvatar,
        chatId: params.chatId,
        type: params.type,
        status: "calling",
        createdAt: Date.now(),
      };

      await setDoc(callRef, newCall);
      return callRef.id;
    } catch (err) {
      console.warn("Firestore createCallSession error:", err);
      return "call_" + Date.now();
    }
  }

  /**
   * Step 3 & 4: Listen to incoming calls for Callee (receiverId == userId & status == 'calling')
   */
  public static subscribeToIncomingCalls(
    userId: string,
    groupIds: string[],
    callback: (call: CallSession | null) => void,
  ): () => void {
    this.ensureFirebaseAuth();
    try {
      const callsRef = collection(db, "calls");
      const q = query(
        callsRef,
        where("receiverId", "in", [userId, ...groupIds.slice(0, 29)]),
        where("status", "==", "calling"),
      );

      return onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            callback(null);
            return;
          }

          const firstDoc = snapshot.docs[0];
          callback({ id: firstDoc.id, ...firstDoc.data() } as CallSession);
        },
        () => {
          callback(null);
        },
      );
    } catch (err) {
      return () => {};
    }
  }

  /**
   * Step 7: Listen to active call updates for ongoing status, rejection, or end
   */
  public static subscribeToActiveCall(
    callId: string,
    callback: (call: CallSession | null) => void,
  ): () => void {
    try {
      const callRef = doc(db, "calls", callId);
      return onSnapshot(
        callRef,
        (docSnap) => {
          if (!docSnap.exists()) {
            callback(null);
            return;
          }
          callback({ id: docSnap.id, ...docSnap.data() } as CallSession);
        },
        (err) => {
          console.warn("Active call listener error:", err);
        },
      );
    } catch (err) {
      return () => {};
    }
  }

  /**
   * Step 5 & 6: Callee accepts call -> update status to "ongoing"
   */
  public static async acceptCall(callId: string): Promise<void> {
    try {
      const callRef = doc(db, "calls", callId);
      await updateDoc(callRef, {
        status: "ongoing",
        startedAt: Date.now(),
      });
    } catch (err) {
      console.warn("Firestore acceptCall error:", err);
    }
  }

  /**
   * Callee rejects call -> update status to "rejected"
   */
  public static async rejectCall(callId: string): Promise<void> {
    try {
      const callRef = doc(db, "calls", callId);
      await updateDoc(callRef, {
        status: "rejected",
        endedAt: Date.now(),
      });
    } catch (err) {
      console.warn("Firestore rejectCall error:", err);
    }
  }

  /**
   * Step 8 & 9: Either party ends call -> update status to "ended"
   */
  public static async endCall(
    callId: string,
    durationSecs: number,
  ): Promise<void> {
    try {
      const callRef = doc(db, "calls", callId);
      await updateDoc(callRef, {
        status: "ended",
        duration: durationSecs,
        endedAt: Date.now(),
      });
    } catch (err) {
      console.warn("Firestore endCall error:", err);
    }
  }

  /**
   * Listen to user presence status in Realtime Database
   */
  public static subscribeToPresence(
    uid: string,
    callback: (isOnline: boolean) => void,
  ): () => void {
    try {
      const presenceRef = rtdbRef(rtdb, `presence/${uid}`);
      return onValue(presenceRef, (snapshot) => {
        const data = snapshot.val();
        if (data && typeof data.isOnline === "boolean") {
          callback(data.isOnline);
        }
      });
    } catch {
      return () => {};
    }
  }

  /**
   * Realtime Database Presence Tracking with onDisconnect support.
   * Connects to '.info/connected' and attaches an onDisconnect trigger to '/status/{uid}' in RTDB.
   * When client disconnects, RTDB updates status to offline, triggering Cloud Function onUserPresenceChange
   * to update 'presenceState' and 'lastSeenAt' in Firestore '/users/{uid}' collection.
   */
  public static setupPresenceTracking(uid: string): () => void {
    try {
      const connectedRef = rtdbRef(rtdb, ".info/connected");
      const userStatusDatabaseRef = rtdbRef(rtdb, `status/${uid}`);
      const legacyPresenceRef = rtdbRef(rtdb, `presence/${uid}`);

      const isOfflineForDatabase = {
        isOnline: false,
        presenceState: "offline",
        lastSeenAt: Date.now(),
        lastSeen: Date.now(),
      };

      const isOnlineForDatabase = {
        isOnline: true,
        presenceState: "online",
        lastSeenAt: Date.now(),
        lastSeen: Date.now(),
      };

      const unsubscribe = onValue(connectedRef, (snapshot) => {
        if (snapshot.val() === false) {
          return;
        }

        onDisconnect(userStatusDatabaseRef)
          .set(isOfflineForDatabase)
          .then(() => {
            rtdbSet(userStatusDatabaseRef, isOnlineForDatabase);
            rtdbSet(legacyPresenceRef, {
              isOnline: true,
              lastSeen: Date.now(),
            });
          })
          .catch(() => {
            // In unauthenticated preview mode, fallback to setting local presence node directly
            try {
              rtdbSet(legacyPresenceRef, {
                isOnline: true,
                lastSeen: Date.now(),
              });
            } catch (e) {}
          });
      });

      return unsubscribe;
    } catch (err) {
      console.warn("setupPresenceTracking error:", err);
      return () => {};
    }
  }

  /**
   * Save story to Firestore
   */
  public static async saveStory(story: any): Promise<void> {
    try {
      const storyRef = doc(db, "stories", story.id);
      await setDoc(storyRef, story, { merge: true });
    } catch (err) {
      console.warn("saveStory error:", err);
    }
  }

  /**
   * Subscribe to stories from Firestore
   */
  public static subscribeToStories(callback: (stories: any[]) => void): () => void {
    try {
      const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
      return onSnapshot(
        q,
        (snapshot) => {
          const stories: any[] = [];
          snapshot.forEach((docSnap) => {
            stories.push({ id: docSnap.id, ...docSnap.data() });
          });
          callback(stories);
        },
        (err) => {
          console.warn("subscribeToStories error:", err);
          callback([]);
        }
      );
    } catch (err) {
      console.warn("subscribeToStories try-catch error:", err);
      callback([]);
      return () => {};
    }
  }

  /**
   * Set user typing status in Firebase Realtime Database
   */
  public static setTypingStatus(
    chatId: string,
    userId: string,
    displayName: string,
    isTyping: boolean
  ): void {
    if (!chatId || !userId) return;
    try {
      const typingRef = rtdbRef(rtdb, `typing/${chatId}/${userId}`);
      if (isTyping) {
        rtdbSet(typingRef, {
          displayName: displayName || "User",
          timestamp: Date.now(),
        });
      } else {
        rtdbSet(typingRef, null);
      }
    } catch (err) {
      console.warn("setTypingStatus error:", err);
    }
  }

  /**
   * Subscribe to live typing indicators for a chat room
   */
  public static subscribeToTyping(
    chatId: string,
    currentUserId: string,
    callback: (typers: string[]) => void
  ): () => void {
    if (!chatId) {
      callback([]);
      return () => {};
    }
    try {
      const roomTypingRef = rtdbRef(rtdb, `typing/${chatId}`);
      return onValue(roomTypingRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          callback([]);
          return;
        }
        const now = Date.now();
        const activeTypers: string[] = [];
        Object.entries(data).forEach(([uid, info]: [string, any]) => {
          if (
            uid !== currentUserId &&
            info &&
            info.timestamp &&
            now - info.timestamp < 4000
          ) {
            activeTypers.push(info.displayName || "เพื่อนของคุณ");
          }
        });
        callback(activeTypers);
      });
    } catch (err) {
      console.warn("subscribeToTyping error:", err);
      callback([]);
      return () => {};
    }
  }

  /**
   * Subscribe to detailed presence data (isOnline + lastSeenAt) from Realtime Database
   * Used by ChatDetailScreen to show human-readable Thai last seen status
   */
  public static subscribeToPresenceDetail(
    uid: string,
    callback: (data: { isOnline: boolean; lastSeenAt: number }) => void,
  ): () => void {
    try {
      const statusRef = rtdbRef(rtdb, `status/${uid}`);
      return onValue(statusRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          callback({
            isOnline: data.isOnline ?? false,
            lastSeenAt: data.lastSeenAt || data.lastSeen || 0,
          });
        } else {
          // Fallback: try legacy presence node
          const presenceRef = rtdbRef(rtdb, `presence/${uid}`);
          onValue(presenceRef, (presSnap) => {
            const presData = presSnap.val();
            callback({
              isOnline: presData?.isOnline ?? false,
              lastSeenAt: presData?.lastSeen || 0,
            });
          }, { onlyOnce: true });
        }
      });
    } catch {
      callback({ isOnline: false, lastSeenAt: 0 });
      return () => {};
    }
  }

  /**
   * Save FCM push notification token to Firestore user document
   * Uses arrayUnion to store multiple device tokens per user
   */
  public static async saveFcmToken(uid: string, token: string): Promise<void> {
    if (!uid || !token) return;
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        fcmTokens: arrayUnion(token),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("saveFcmToken error:", err);
    }
  }
}
