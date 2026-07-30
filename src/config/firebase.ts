import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  doc,
  getDocFromServer,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import firebaseAppletConfig from "../../firebase-applet-config.json";

// Firebase configuration for project NewFound (tirak-chat-29583)
export const firebaseConfig = {
  apiKey: firebaseAppletConfig.apiKey,
  authDomain: firebaseAppletConfig.authDomain,
  projectId: firebaseAppletConfig.projectId,
  storageBucket: firebaseAppletConfig.storageBucket,
  messagingSenderId: firebaseAppletConfig.messagingSenderId,
  appId: firebaseAppletConfig.appId,
  measurementId: firebaseAppletConfig.measurementId,
  databaseURL: (firebaseAppletConfig as any).databaseURL,
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firestore with long-polling auto-detect for resilient connection in iframe environments
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalAutoDetectLongPolling: true,
    },
    firebaseAppletConfig.firestoreDatabaseId &&
      firebaseAppletConfig.firestoreDatabaseId !== "(default)"
      ? firebaseAppletConfig.firestoreDatabaseId
      : undefined,
  );
} catch {
  firestoreInstance =
    firebaseAppletConfig.firestoreDatabaseId &&
    firebaseAppletConfig.firestoreDatabaseId !== "(default)"
      ? getFirestore(app, firebaseAppletConfig.firestoreDatabaseId)
      : getFirestore(app);
}

export const db = firestoreInstance;
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

// Gracefully handle transient offline / connection-failed warnings from Firestore SDK
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    if (
      event.reason &&
      (event.reason.code === "unavailable" ||
        (typeof event.reason.message === "string" &&
          event.reason.message.includes(
            "Could not reach Cloud Firestore backend",
          )))
    ) {
      console.warn(
        "Firestore offline mode active (transient connection delay).",
      );
      event.preventDefault(); // Suppress uncaught runtime error dialog
    }
  });
}

// Connection test helper as required by Firebase skill
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, "system", "connection"));
    console.log("Firebase Firestore Connection Verified successfully.");
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("the client is offline") ||
        error.message.includes("Could not reach"))
    ) {
      console.warn(
        "Firebase client is currently in offline mode or initial connection pending.",
      );
    } else {
      console.log(
        "Firestore ping result (normal for unseeded system doc):",
        error,
      );
    }
    return false;
  }
}

export default app;
