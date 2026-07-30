// ============================================
// TIRAK CHAT — LiveKit Client Configuration
// ใช้สำหรับ Voice/Video/Group Calls + Screen Sharing
// ============================================

import { Room, RoomEvent, VideoPresets } from "livekit-client";

const LIVEKIT_URL = "wss://tirak-chat-p7g1iml3.livekit.cloud";

/**
 * เชื่อมต่อห้องสาย (Voice/Video/Group)
 * @param {string} roomName - ชื่อห้อง
 * @param {string} token - Access Token จาก Server
 * @param {object} options - { audio: boolean, video: boolean, screenShare: boolean }
 * @returns {Promise<Room>}
 */
export const connectLiveKitRoom = async (roomName, token, options = {}) => {
  const room = new Room({
    adaptiveStream: true,
    dynacast: true,
    videoCaptureDefaults: {
      resolution: VideoPresets.h720.resolution,
    },
  });

  // Events
  room.on(RoomEvent.Connected, () => {
    console.log("Connected to LiveKit room:", roomName);
  });

  room.on(RoomEvent.Disconnected, (reason) => {
    console.log("Disconnected from room:", reason);
  });

  room.on(RoomEvent.ParticipantConnected, (participant) => {
    console.log("Participant connected:", participant.identity);
  });

  room.on(RoomEvent.ParticipantDisconnected, (participant) => {
    console.log("Participant disconnected:", participant.identity);
  });

  room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    console.log("Track subscribed:", track.kind, "from", participant.identity);
  });

  await room.connect(LIVEKIT_URL, token);

  // Publish local tracks
  if (options.audio !== false) {
    await room.localParticipant.setMicrophoneEnabled(true);
  }
  if (options.video === true) {
    await room.localParticipant.setCameraEnabled(true);
  }
  if (options.screenShare === true) {
    await room.localParticipant.setScreenShareEnabled(true, { audio: true });
  }

  return room;
};

/**
 * สลับกล้องหน้า/หลัง (มือถือ)
 */
export const switchCamera = async (room) => {
  const devices = await Room.getLocalDevices("videoinput");
  const currentDevice = room.localParticipant.videoTrack?.mediaStreamTrack?.getSettings()?.deviceId;
  const nextDevice = devices.find((d) => d.deviceId !== currentDevice);
  if (nextDevice) {
    await room.switchActiveDevice("videoinput", nextDevice.deviceId);
  }
};

/**
 * ปิด/เปิดเสียงตนเอง
 */
export const toggleMute = async (room) => {
  const enabled = room.localParticipant.isMicrophoneEnabled;
  await room.localParticipant.setMicrophoneEnabled(!enabled);
  return !enabled;
};

/**
 * ปิด/เปิดวิดีโอตนเอง
 */
export const toggleVideo = async (room) => {
  const enabled = room.localParticipant.isCameraEnabled;
  await room.localParticipant.setCameraEnabled(!enabled);
  return !enabled;
};

/**
 * แชร์หน้าจอ
 */
export const toggleScreenShare = async (room) => {
  const enabled = room.localParticipant.isScreenShareEnabled;
  await room.localParticipant.setScreenShareEnabled(!enabled, { audio: true });
  return !enabled;
};

/**
 * วางสาย + ทำลายห้อง
 */
export const endCall = async (room) => {
  await room.disconnect();
};

/**
 * ปิดเสียงสมาชิกระยะไกล (Remote Mute) — ต้องเป็น Admin
 * ใช้ Data Channel ส่งคำสั่งไปยังอีกฝ่าย หรือใช้ Server API
 */
export const remoteMuteParticipant = async (room, participantIdentity) => {
  // ส่งผ่าน LiveKit Data Channel หรือ Firebase Realtime
  const payload = JSON.stringify({
    type: "remote_mute",
    target: participantIdentity,
    timestamp: Date.now(),
  });
  await room.localParticipant.publishData(
    new TextEncoder().encode(payload),
    { reliable: true }
  );
};

export { LIVEKIT_URL };
