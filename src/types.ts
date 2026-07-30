export type Language = "th" | "en" | "fr" | "jp" | "es" | "zh" | "ja" | "ko";

export type ScreenId =
  | "welcome"
  | "language_select"
  | "privacy_intro"
  | "register"
  | "otp_verification"
  | "profile_setup"
  | "security_setup"
  | "permissions"
  | "contact_sync"
  | "add_friend"
  | "chat_list"
  | "chat_detail"
  | "group_info"
  | "create_group"
  | "call_active"
  | "call_screen"
  | "call_history"
  | "stories_feed"
  | "create_story"
  | "settings_notifications"
  | "settings_privacy"
  | "settings_backup"
  | "settings_account"
  | "account"
  | "settings_help"
  | "my_qrcode"
  | "qr_scanner"
  | "data_usage"
  | "starred_messages"
  | "linked_devices"
  | "report_feedback"
  | "friend_profile"
  | "official_account"
  | "archived_chats"
  | "global_search"
  | "blocked_contacts"
  | "two_step_verification"
  | "architecture_diagrams";

export type MainTab = "chats" | "groups" | "calls" | "stories" | "settings";

export type ChatType = "direct" | "group" | "channel" | "note_to_self";

export type MessageContentType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "voice_note"
  | "document"
  | "location"
  | "system";

export interface UserProfile {
  uid: string;
  id?: string;
  phone?: string;
  countryCode?: string;
  displayName: string;
  username: string;
  photoURL: string;
  about?: string;
  email?: string;
  isOnline: boolean;
  presenceState?: "online" | "offline" | "away";
  lastSeen?: number | string;
  lastSeenAt?: number | string;
  publicKey?: string;
  createdAt: number | string;
  securitySettings?: SecuritySettings;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  encryptedContent?: string;
  contentType: MessageContentType;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  replyToId?: string;
  replyToContent?: string;
  reactions?: Record<string, string>; // e.g. { uid: '❤️' }
  readBy?: string[];
  deliveredTo?: string[];
  isEdited?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
  viewOnce?: boolean;
  expiresAt?: number;
  scheduledAt?: number;
  createdAt: number;
}

export interface ChatRoom {
  id: string;
  type: ChatType;
  name: string;
  description?: string;
  avatarUrl: string;
  members: string[]; // uids
  ownerId?: string;
  adminIds?: string[];
  lastMessage?: string;
  lastMessageSenderId?: string;
  lastMessageAt?: number;
  isPinned?: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
  unreadCount?: number;
  disappearingTime?: number; // minutes or 0 for off
  folder?: "all" | "my_chats" | "family" | "work" | "channels";
  createdAt: number;
}

export interface CallLog {
  id: string;
  peerUid: string;
  peerName: string;
  peerAvatar: string;
  type: "voice" | "video";
  direction: "incoming" | "outgoing" | "missed";
  durationSeconds?: number;
  timestamp: number;
}

export interface StoryItem {
  id: string;
  authorUid: string;
  authorName: string;
  authorAvatar: string;
  mediaUrl: string;
  mediaType: "image" | "video" | "text";
  textCaption?: string;
  bgGradient?: string;
  createdAt: number;
  viewsCount?: number;
}

export interface UserPermissions {
  camera: boolean;
  photos: boolean;
  contacts: boolean;
  notifications: boolean;
}

export interface SecuritySettings {
  pin: string;
  pinCode?: string;
  biometricEnabled: boolean;
  appLockEnabled?: boolean;
  hideInAppSwitcher?: boolean;
  screenLockEnabled?: boolean;
  readReceiptsEnabled: boolean;
  typingIndicatorsEnabled: boolean;
  disappearingTimerDefault: number; // in minutes
}

export type ShieldSettings = SecuritySettings;

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: "pending" | "accepted" | "blocked";
  createdAt: number;
}
