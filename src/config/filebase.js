// ============================================
// TIRAK CHAT — Filebase (IPFS) Client
// ใช้เก็บสื่อ, ไฟล์สำรอง, สตอรี่ (แทน Supabase Storage)
// ============================================

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Filebase S3-compatible Configuration
// สมัครที่ https://filebase.com → Access Keys → นำ Key/Secret มาใส่
const FILEBASE_CONFIG = {
  endpoint: "https://s3.filebase.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_FILEBASE_KEY || "YOUR_FILEBASE_ACCESS_KEY",
    secretAccessKey: process.env.REACT_APP_FILEBASE_SECRET || "YOUR_FILEBASE_SECRET_KEY",
  },
};

const BUCKETS = {
  profileImages: "tirak-profile-images",
  chatMedia: "tirak-chat-media",
  voiceNotes: "tirak-voice-notes",
  documents: "tirak-documents",
  backups: "tirak-backups",
  stories: "tirak-stories",
};

const s3Client = new S3Client(FILEBASE_CONFIG);

/**
 * อัปโหลดไฟล์ไป Filebase (IPFS)
 * @param {string} bucketKey - key ของ bucket (profileImages, chatMedia, etc.)
 * @param {string} key - path ใน bucket (เช่น userId/avatar.jpg)
 * @param {Blob|Buffer} file - ไฟล์
 * @param {string} contentType - MIME type
 * @returns {Promise<{cid: string, url: string}>}
 */
export const uploadToFilebase = async (bucketKey, key, file, contentType) => {
  const bucketName = BUCKETS[bucketKey];
  if (!bucketName) throw new Error("Invalid bucket key");

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: {
      "x-amz-meta-pin": "true", // Pin บน IPFS
    },
  });

  await s3Client.send(command);

  // Filebase จะคืน CID ผ่าน header หรือใช้รูปแบบ URL
  const cid = await getFilebaseCID(bucketName, key);
  const url = `https://ipfs.filebase.io/ipfs/${cid}`;

  return { cid, url, bucket: bucketName, key };
};

/**
 * ดึง CID จาก Filebase (หลังอัปโหลด)
 */
const getFilebaseCID = async (bucket, key) => {
  // Filebase เก็บ CID ใน Metadata หรือใช้ S3 head
  // วิธีที่ง่าย: ใช้ IPFS Gateway โดยตรงหลังจาก pin สำเร็จ
  // หรือใช้ Filebase API ดึง metadata
  // ตัวอย่างนี้ return เป็น hash จากการคำนวณหรือดึงจาก response
  return `${bucket}/${key}`; // แก้ไขตาม Filebase API จริง
};

/**
 * สร้าง Signed URL สำหรับดาวน์โหลด
 */
export const getFilebaseSignedUrl = async (bucketKey, key, expiresIn = 3600) => {
  const bucketName = BUCKETS[bucketKey];
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return await getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * ลบไฟล์จาก Filebase
 */
export const deleteFromFilebase = async (bucketKey, key) => {
  const bucketName = BUCKETS[bucketKey];
  const command = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
  await s3Client.send(command);
};

/**
 * อัปโหลดรูปโปรไฟล์
 */
export const uploadProfileImage = async (userId, imageFile) => {
  const key = `${userId}/avatar.jpg`;
  return await uploadToFilebase("profileImages", key, imageFile, "image/jpeg");
};

/**
 * อัปโหลดสื่อแชท
 */
export const uploadChatMedia = async (chatId, messageId, mediaFile, contentType) => {
  const ext = contentType.split("/")[1] || "bin";
  const key = `${chatId}/${messageId}/original.${ext}`;
  return await uploadToFilebase("chatMedia", key, mediaFile, contentType);
};

/**
 * อัปโหลด Thumbnail
 */
export const uploadThumbnail = async (chatId, messageId, thumbBlob) => {
  const key = `${chatId}/${messageId}/thumbnail.jpg`;
  return await uploadToFilebase("chatMedia", key, thumbBlob, "image/jpeg");
};

/**
 * อัปโหลด Voice Note
 */
export const uploadVoiceNote = async (chatId, messageId, audioBlob) => {
  const key = `${chatId}/${messageId}.m4a`;
  return await uploadToFilebase("voiceNotes", key, audioBlob, "audio/mp4");
};

/**
 * อัปโหลดเอกสาร
 */
export const uploadDocument = async (chatId, messageId, file, fileName) => {
  const key = `${chatId}/${messageId}/${fileName}`;
  return await uploadToFilebase("documents", key, file, file.type || "application/octet-stream");
};

/**
 * อัปโหลดไฟล์สำรอง (Backup)
 */
export const uploadBackup = async (userId, backupId, encryptedFile) => {
  const key = `${userId}/${backupId}.enc`;
  return await uploadToFilebase("backups", key, encryptedFile, "application/octet-stream");
};

/**
 * อัปโหลดสตอรี่
 */
export const uploadStory = async (userId, storyId, mediaFile, contentType) => {
  const ext = contentType.split("/")[1] || "jpg";
  const key = `${userId}/${storyId}.${ext}`;
  return await uploadToFilebase("stories", key, mediaFile, contentType);
};

export { BUCKETS, s3Client };
