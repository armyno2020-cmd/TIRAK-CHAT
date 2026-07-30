# TIRAK CHAT — Migration Guide: Supabase → Firebase + Filebase

## สรุปการเปลี่ยนแปลง

| ส่วนเดิม (Supabase) | ส่วนใหม่ (Firebase/Filebase) | หมายเหตุ |
|---------------------|------------------------------|----------|
| Supabase Auth | Firebase Authentication | รองรับ Phone OTP, Anonymous, Google |
| PostgreSQL | Cloud Firestore | NoSQL Document Database |
| Supabase Realtime | Firebase Realtime Database | Presence, Typing, Online Status |
| Supabase Storage | Filebase (IPFS) + Firebase Storage | ไฟล์สื่อเก็บบน Filebase (IPFS), Metadata เก็บบน Firestore |
| Supabase Edge Functions | Firebase Cloud Functions | Push, Scheduled Jobs, Thumbnails |
| Row Level Security (RLS) | Firestore Security Rules | ควบคุมการเข้าถึงข้อมูล |

---

## โครงสร้างโปรเจค

```
tirak-chat-firebase/
├── firebase.json                 # Firebase project config
├── firestore.rules               # กฎความปลอดภัย Firestore
├── firestore.indexes.json        # Indexes สำหรับ query
├── database.rules.json           # Realtime Database rules
├── functions/                    # Cloud Functions
│   ├── index.js                  # Entry point
│   ├── package.json              # Dependencies
│   ├── src/
│   │   ├── pushNotifications.js  # FCM Push
│   │   ├── scheduledMessages.js  # ส่งข้อความตั้งเวลา
│   │   ├── disappearingMsgs.js   # ลบข้อความหายเอง
│   │   ├── thumbnailGenerator.js # สร้าง thumbnail
│   │   └── livekitToken.js       # สร้าง LiveKit token
│   └── .env                      # Environment variables
├── src/
│   ├── config/
│   │   ├── firebase.js           # Firebase init
│   │   ├── filebase.js           # Filebase (IPFS) client
│   │   └── livekit.js            # LiveKit config
│   ├── models/
│   │   └── schema.js             # โครงสร้างข้อมูล
│   └── services/
│       ├── authService.js        # Auth functions
│       ├── chatService.js        # Messaging functions
│       ├── callService.js        # LiveKit calling
│       └── storageService.js     # Filebase upload/download
└── README.md
```

---

## ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 2. เลือกบริการ
- Firestore
- Functions
- Realtime Database
- Storage (optional — ใช้ Filebase เป็นหลัก)

### 3. ติดตั้ง Dependencies
```bash
cd functions
npm install firebase-admin firebase-functions livekit-server-sdk axios form-data
```

### 4. ตั้งค่า Environment Variables
```bash
firebase functions:config:set livekit.url="wss://tirak-chat-p7g1iml3.livekit.cloud"
firebase functions:config:set livekit.apikey="API2tXqJdXXY7oS"
firebase functions:config:set livekit.apisecret="12Z4TSiD4ObfCRfv7geODkHYf6nTl2KtBxLurl2ZJOaB"
firebase functions:config:set fcm.serverkey="YOUR_FCM_SERVER_KEY"
firebase functions:config:set filebase.key="YOUR_FILEBASE_KEY"
firebase functions:config:set filebase.secret="YOUR_FILEBASE_SECRET"
firebase functions:config:set filebase.bucket="YOUR_FILEBASE_BUCKET"
```

### 5. Deploy
```bash
firebase deploy
```

---

## หลักการออกแบบฐานข้อมูล

### Firestore Collections
- `users` — ข้อมูลผู้ใช้, public keys, privacy settings
- `chats` — ข้อมูลแชท (direct, group, self)
- `chatMembers` — สมาชิกในแชท + roles
- `messages` — ข้อความ (encrypted)
- `contacts` — รายชื่อผู้ติดต่อ
- `calls` — ประวัติการโทร
- `backups` — ข้อมูลการสำรอง
- `userSettings` — การตั้งค่าผู้ใช้
- `stories` — สตอรี่ 24 ชม.
- `scheduledMessages` — ข้อความตั้งเวลา
- `polls` — โพลในแชท

### Realtime Database Paths
- `/presence/{userId}` — สถานะออนไลน์
- `/typing/{chatId}/{userId}` — สถานะกำลังพิมพ์
- `/callInvites/{userId}` — สายเรียกเข้า

### Filebase (IPFS) Buckets
- `profile-images/{userId}/avatar.jpg`
- `chat-media/{chatId}/{messageId}/`
- `voice-notes/{chatId}/{messageId}.m4a`
- `documents/{chatId}/{messageId}/{filename}`
- `backups/{userId}/{backupId}.enc`
- `stories/{userId}/{storyId}.{ext}`

---

## ความปลอดภัย

- **E2EE**: ใช้ Signal Protocol (X3DH + Double Ratchet) บน Client-side
- **Firestore Rules**: ตรวจสอบสมาชิกแชทก่อนอ่าน/เขียนข้อความ
- **Filebase**: ใช้ Signed URLs + IPFS pinning สำหรับความทนทาน
- **LiveKit**: Token-based auth + SFrame E2EE สำหรับสาย

---

## หมายเหตุสำคัญ

⚠️ **อย่า push API Secrets ขึ้น Git** — ใช้ Firebase Environment Config หรือ Secret Manager
⚠️ **Filebase API Key** — ต้องสมัครที่ https://filebase.com และสร้าง Access Key
⚠️ **Firestore Pricing** — ออกแบบ query ให้มีการอ่าน/เขียนน้อยที่สุด
