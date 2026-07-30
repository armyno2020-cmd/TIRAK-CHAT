// ============================================
// TIRAK CHAT — Firebase Cloud Messaging Service Worker
// Handles background push notifications when the app tab is closed or minimized
// ============================================

// Import Firebase scripts for Service Worker (compat v9+)
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker context
firebase.initializeApp({
  apiKey: "AIzaSyATB3DxIxqXu2f4KjMbf3iuSARJPLIeLA0",
  authDomain: "project-e1927a0f-d4d9-418b-aa0.firebaseapp.com",
  databaseURL: "https://project-e1927a0f-d4d9-418b-aa0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-e1927a0f-d4d9-418b-aa0",
  storageBucket: "project-e1927a0f-d4d9-418b-aa0.firebasestorage.app",
  messagingSenderId: "444104936507",
  appId: "1:444104936507:web:bff3919268c8fef02da01e"
});

const messaging = firebase.messaging();

// Handle background messages (when app tab is closed or browser is in background)
messaging.onBackgroundMessage((payload) => {
  console.log('[Tirak Chat SW] Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Tirak Chat';
  const notificationOptions = {
    body: payload.notification?.body || 'คุณมีข้อความใหม่',
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: payload.data?.chatId || 'tirak-chat-notification',
    data: {
      chatId: payload.data?.chatId,
      senderId: payload.data?.senderId,
      url: payload.data?.url || '/',
    },
    // Vibration pattern for mobile devices
    vibrate: [200, 100, 200],
    // Renotify if same tag already exists
    renotify: true,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click — open or focus the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      return clients.openWindow(urlToOpen);
    })
  );
});
