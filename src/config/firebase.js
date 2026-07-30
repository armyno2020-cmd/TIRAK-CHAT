// ============================================
// TIRAK CHAT — Firebase Client Configuration
// ย้ายจาก Supabase → Firebase + Filebase
// ============================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase Config จากโปรเจคของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyATB3DxIxqXu2f4KjMbf3iuSARJPLIeLA0",
  authDomain: "project-e1927a0f-d4d9-418b-aa0.firebaseapp.com",
  databaseURL: "https://project-e1927a0f-d4d9-418b-aa0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-e1927a0f-d4d9-418b-aa0",
  storageBucket: "project-e1927a0f-d4d9-418b-aa0.firebasestorage.app",
  messagingSenderId: "444104936507",
  appId: "1:444104936507:web:bff3919268c8fef02da01e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);        // Firestore (แทน PostgreSQL)
export const rtdb = getDatabase(app);        // Realtime DB (แทน Supabase Realtime)
export const storage = getStorage(app);      // Firebase Storage (สำรอง/เผื่อใช้)

// FCM Web Push
export const messaging = getMessaging(app);

// VAPID Key สำหรับ Web Push
const VAPID_KEY = "BJD1NFTMwtRf4yfhWDJS8zD0qAHAusIoNYXNsR3rOpROZQdvocLxGqnEIlGKLy3LIwc46DndDvLgkqeM1ZIjnsk";

export const requestNotificationPermission = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available.");
      return null;
    }
  } catch (err) {
    console.error("An error occurred while retrieving token.", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default app;
