import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Mic,
  Image as ImageIcon,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Play,
  Pause,
  Trash2,
  CornerUpLeft,
  Pin,
  FileText,
  Eye,
  ShieldCheck,
  Smile,
  Languages,
  Sparkles,
  Loader2,
  MapPin,
  Map,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatMessage,
  ChatRoom,
  Language,
  ScreenId,
  UserProfile,
} from "../types";
import { getTranslation } from "../locales/i18n";
import { PresenceDot } from "../components/PresenceDot";
import { FirebaseService } from "../services/firebaseService";

interface ChatDetailScreenProps {
  chatRoom: ChatRoom;
  messages: ChatMessage[];
  currentUser: UserProfile;
  activeLanguage: Language;
  readReceiptsEnabled?: boolean;
  onNavigate: (screen: ScreenId) => void;
  onSendMessage: (
    roomId: string,
    content: string,
    type?: "text" | "image" | "voice_note" | "document" | "audio",
    extra?: any,
  ) => void;
  onStartCall: (peerUid: string, type: "voice" | "video") => void;
  onTogglePinMessage?: (messageId: string, isPinned: boolean) => void;
  onDeleteMessage?: (messageId: string) => void;
  onAddReaction?: (messageId: string, emoji: string) => void;
  onMarkMessageAsRead?: (chatId: string, messageId: string) => void;
  onOpenGroupInfo: () => void;
  onOpenMediaViewer: (url: string) => void;
}

const EMOJI_REACTIONS = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({
  chatRoom,
  messages,
  currentUser,
  activeLanguage,
  readReceiptsEnabled = true,
  onNavigate,
  onSendMessage,
  onStartCall,
  onTogglePinMessage,
  onDeleteMessage,
  onAddReaction,
  onMarkMessageAsRead,
  onOpenGroupInfo,
  onOpenMediaViewer,
}) => {
  const currentUserId = currentUser?.uid || "";
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [viewOnceEnabled, setViewOnceEnabled] = useState(false);
  const [activeReactionMessageId, setActiveReactionMessageId] = useState<
    string | null
  >(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [typers, setTypers] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [peerOnline, setPeerOnline] = useState(false);
  const [peerLastSeen, setPeerLastSeen] = useState(0);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Utility: Format lastSeenAt timestamp to human-readable Thai text
  const formatLastSeen = (timestamp: number): string => {
    if (!timestamp || timestamp <= 0) return "ไม่ทราบสถานะ";
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "ใช้งานเมื่อสักครู่";
    if (minutes < 60) return `ใช้งานเมื่อ ${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `ใช้งานเมื่อ ${hours} ชั่วโมงที่แล้ว`;

    const date = new Date(timestamp);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timeStr = date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });

    if (date.toDateString() === yesterday.toDateString()) {
      return `ใช้งานเมื่อวานนี้ ${timeStr}`;
    }
    const dateStr = date.toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" });
    return `ใช้งาน ${dateStr} ${timeStr}`;
  };

  // Subscribe to live typing status from Firebase Realtime Database
  useEffect(() => {
    if (!chatRoom?.id || !currentUserId) return;
    const unsub = FirebaseService.subscribeToTyping(
      chatRoom.id,
      currentUserId,
      (activeTypers) => {
        setTypers(activeTypers);
      }
    );
    return () => unsub();
  }, [chatRoom?.id, currentUserId]);

  // Subscribe to peer presence detail (online status + last seen timestamp)
  useEffect(() => {
    if (!chatRoom?.id || !chatRoom.members) return;
    const peerUids = chatRoom.members.filter((m: string) => m !== currentUserId);
    if (peerUids.length === 0) return;
    // For direct chats, subscribe to the single peer; for groups, skip (show member count)
    if (chatRoom.type === "group" || peerUids.length > 1) return;
    const unsub = FirebaseService.subscribeToPresenceDetail(
      peerUids[0],
      (data) => {
        setPeerOnline(data.isOnline);
        setPeerLastSeen(data.lastSeenAt);
      }
    );
    return () => unsub();
  }, [chatRoom?.id, chatRoom?.members, currentUserId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);

    if (chatRoom?.id && currentUserId) {
      FirebaseService.setTypingStatus(
        chatRoom.id,
        currentUserId,
        currentUser.displayName || currentUser.username || "ผู้ใช้",
        true
      );

      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        FirebaseService.setTypingStatus(
          chatRoom.id,
          currentUserId,
          currentUser.displayName || currentUser.username || "ผู้ใช้",
          false
        );
      }, 2500);
    }
  };

  const handleSendLocation = () => {
    setIsGettingLocation(true);
    const sendLoc = (lat: number, lng: number, address: string) => {
      onSendMessage(
        chatRoom.id,
        `📍 ${address}`,
        "location" as any,
        {
          latitude: lat,
          longitude: lng,
          locationAddress: address,
          replyToId: replyingTo?.id,
          viewOnce: viewOnceEnabled,
        }
      );
      setIsGettingLocation(false);
      setShowAttachmentMenu(false);
      setReplyingTo(null);
      setViewOnceEnabled(false);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(6));
          const lng = parseFloat(pos.coords.longitude.toFixed(6));
          sendLoc(lat, lng, `ตำแหน่งปัจจุบัน (${lat}, ${lng})`);
        },
        (err) => {
          console.warn("Geolocation warning/fallback:", err);
          sendLoc(13.7466, 100.5347, "สยามพารากอน, กรุงเทพมหานคร");
        },
        { timeout: 5000 }
      );
    } else {
      sendLoc(13.7466, 100.5347, "สยามพารากอน, กรุงเทพมหานคร");
    }
  };

  // Auto-mark unread incoming messages as read if read receipts are enabled
  useEffect(() => {
    if (!readReceiptsEnabled || !onMarkMessageAsRead || !chatRoom?.id || !currentUserId) return;

    messages.forEach((msg) => {
      if (msg.senderId !== currentUserId) {
        const readByList = msg.readBy || [];
        if (!readByList.includes(currentUserId)) {
          onMarkMessageAsRead(chatRoom.id, msg.id);
        }
      }
    });
  }, [chatRoom?.id, messages, currentUserId, readReceiptsEnabled, onMarkMessageAsRead]);

  // Translation State powered by Gemini API
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translatingIds, setTranslatingIds] = useState<Record<string, boolean>>(
    {},
  );

  const handleTranslateMessage = async (messageId: string, text: string) => {
    if (translations[messageId]) {
      setTranslations((prev) => {
        const copy = { ...prev };
        delete copy[messageId];
        return copy;
      });
      return;
    }

    setTranslatingIds((prev) => ({ ...prev, [messageId]: true }));
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: activeLanguage }),
      });
      const data = await res.json();
      if (data.translation) {
        setTranslations((prev) => ({ ...prev, [messageId]: data.translation }));
      }
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setTranslatingIds((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(chatRoom.id, inputText, "text", {
      replyToId: replyingTo?.id,
      viewOnce: viewOnceEnabled,
    });
    setInputText("");
    setReplyingTo(null);
    setViewOnceEnabled(false);
  };

  const handleSendVoiceNote = () => {
    if (recordingSeconds > 0) {
      onSendMessage(
        chatRoom.id,
        `ข้อความเสียง (${recordingSeconds} วิ)`,
        "voice_note",
        { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled },
      );
    }
    setIsRecording(false);
    setReplyingTo(null);
    setViewOnceEnabled(false);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const resultUrl = reader.result as string;
      onSendMessage(chatRoom.id, "ส่งรูปภาพ", "image", {
        mediaUrl: resultUrl,
        replyToId: replyingTo?.id,
        viewOnce: viewOnceEnabled,
      });
      setShowAttachmentMenu(false);
      setViewOnceEnabled(false);
      setReplyingTo(null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const resultUrl = reader.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      onSendMessage(chatRoom.id, file.name, "document", {
        mediaUrl: resultUrl,
        fileName: file.name,
        fileSize: `${sizeMb} MB`,
        replyToId: replyingTo?.id,
        viewOnce: viewOnceEnabled,
      });
      setShowAttachmentMenu(false);
      setViewOnceEnabled(false);
      setReplyingTo(null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const peerUid =
    chatRoom.members?.find((m) => m !== currentUser.uid) ||
    chatRoom.members?.[0] ||
    "Unknown";

  const formatMessageTime = (ts: number) => {
    return new Date(ts)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      .toUpperCase();
  };

  const pinnedMessage = messages.find((m) => m.isPinned);

  return (
    <div className="bg-transparent h-full font-th-body text-[#1b1b1d] overflow-hidden flex flex-col relative w-full">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <input
        type="file"
        ref={docInputRef}
        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
        className="hidden"
        onChange={handleDocFileChange}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 p-3 glass-surface shadow-2xs flex justify-between items-center px-4 py-2.5 w-full border-b border-white/60">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-2 -ml-1 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] shrink-0 md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            className="relative shrink-0 cursor-pointer"
            onClick={onOpenGroupInfo}
          >
            <img
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
              src={
                chatRoom.avatarUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              }
              alt={chatRoom.name}
            />
            <PresenceDot
              uid={peerUid}
              className="bottom-0 right-0 border-2 border-white"
            />
          </div>

          <div className="min-w-0 cursor-pointer" onClick={onOpenGroupInfo}>
            <div className="flex items-center gap-1.5">
              <h2 className="font-th-heading text-[16px] text-[#1b1b1d] font-bold tracking-tight truncate">
                {chatRoom.name}
              </h2>
              <span title="เข้ารหัส E2EE">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </span>
            </div>
            <p className="text-[11px] text-[#76777b] truncate flex items-center gap-1.5">
              {typers.length > 0 ? (
                <span className="text-[#7e5356] font-bold flex items-center gap-1 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#7e5356] animate-ping" />
                  <span>💬 {typers.join(", ")} กำลังพิมพ์...</span>
                </span>
              ) : chatRoom.type === "group" ? (
                <>
                  <span>{chatRoom.members?.length || 0} สมาชิก</span> •{" "}
                  <span className="text-emerald-700 font-medium">
                    E2EE Protected
                  </span>
                </>
              ) : peerOnline ? (
                <>
                  <span className="text-emerald-600 font-medium">ออนไลน์</span> •{" "}
                  <span className="text-emerald-700 font-medium">
                    E2EE Protected
                  </span>
                </>
              ) : (
                <>
                  <span>{formatLastSeen(peerLastSeen)}</span> •{" "}
                  <span className="text-emerald-700 font-medium">
                    E2EE Protected
                  </span>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("settings_privacy");
                }}
                className={`ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer border ${
                  readReceiptsEnabled
                    ? "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
                title={
                  readReceiptsEnabled
                    ? "สถานะการอ่านเปิดใช้งานอยู่ (คลิกเพื่อตั้งค่า)"
                    : "สถานะการอ่านปิดใช้งานอยู่ (คลิกเพื่อตั้งค่า)"
                }
              >
                <ShieldCheck className="w-3 h-3" />
                <span>{readReceiptsEnabled ? "แจ้งอ่านแล้ว" : "ปิดแจ้งอ่าน"}</span>
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onStartCall(peerUid, "voice")}
            className="glass-button-secondary p-2.5 rounded-full glass-button-secondary text-[#7e5356] transition-colors"
            title="โทรเสียง"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => onStartCall(peerUid, "video")}
            className="glass-button-secondary p-2.5 rounded-full glass-button-secondary text-[#7e5356] transition-colors"
            title="วิดีโอคอล"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full glass-button-secondary text-[#45474a] transition-colors"
            onClick={onOpenGroupInfo}
            title="รายละเอียด"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Chat Canvas */}
      <main className="flex-1 overflow-y-auto px-4 py-3 flex flex-col w-full relative">
        {/* Pinned Message Banner */}
        {pinnedMessage && (
          <div className="sticky top-2 z-20 mx-auto w-full max-w-md glass-surface backdrop-blur-md rounded-full border border-[#7e5356]/20 px-4 py-2 shadow-sm flex items-center justify-between text-xs my-1">
            <div className="flex items-center gap-2 min-w-0">
              <Pin className="w-4 h-4 text-[#7e5356] fill-current shrink-0" />
              <div className="truncate">
                <span className="font-bold text-[#7e5356]">
                  ข้อความปักหมุด:{" "}
                </span>
                <span className="text-[#1b1b1d]">{pinnedMessage.content}</span>
              </div>
            </div>
            <button
              onClick={() =>
                onTogglePinMessage &&
                onTogglePinMessage(pinnedMessage.id, false)
              }
              className="text-[10px] text-[#76777b] hover:text-[#7e5356] ml-2 shrink-0 font-bold glass-button-secondary"
            >
              ปลดปักหมุด
            </button>
          </div>
        )}

        <div
          className="flex-1 space-y-4 pb-4 pt-2 relative z-10"
          id="chat-container"
        >
          <div className="flex justify-center my-4">
            <span className="font-label-caps text-[#45474a]/60 bg-[#f6f3f5]/60 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider border border-white/40 shadow-2xs">
              🔒 ข้อความทั้งหมดถูกเข้ารหัสต้นทางถึงปลายทาง (E2EE)
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.uid;
            const hasReactions =
              msg.reactions && Object.keys(msg.reactions).length > 0;

            return (
              <div
                key={msg.id}
                id={`msg-${msg.id}`}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[85%] md:max-w-[70%] ${isMe ? "ml-auto" : ""} space-y-1 group relative`}
              >
                {/* Reply Bar Context */}
                {msg.replyToId && (
                  <div
                    className={`flex items-center gap-1 mb-0.5 text-[11px] ${isMe ? "text-[#7e5356]" : "text-[#45474a]"}`}
                  >
                    <CornerUpLeft className="w-3 h-3" />
                    <span>ตอบกลับข้อความ</span>
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`${isMe ? "glass-bubble-sender rounded-2xl rounded-br-xs" : "glass-surface rounded-2xl rounded-bl-xs"} px-4 py-3 relative overflow-hidden`}
                >
                  {/* View Once Badge */}
                  {msg.viewOnce && (
                    <div
                      className="flex items-center gap-1.5 mb-2 text-rose-500 font-bold text-xs cursor-pointer bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 w-fit"
                      onClick={() => {
                        if (msg.mediaUrl) onOpenMediaViewer(msg.mediaUrl);
                      }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ข้อความดูครั้งเดียว (View Once)</span>
                    </div>
                  )}

                  {/* Text Message */}
                  {msg.contentType === "text" && (
                    <div className="space-y-1">
                      <p
                        className={`text-[15px] leading-relaxed whitespace-pre-wrap break-words ${isMe ? "text-[#1b1b1d]" : "text-[#1b1b1d]"}`}
                      >
                        {msg.content}
                      </p>

                      {/* Gemini Translation Result Card */}
                      {translations[msg.id] && (
                        <div className="mt-2 pt-2 border-t border-black/10 text-[13px] glass-surface backdrop-blur-xs rounded-xl p-2.5 space-y-1 shadow-2xs">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#7e5356]">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#7e5356]" />{" "}
                              แปลภาษาโดย Gemini AI
                            </span>
                            <button
                              onClick={() =>
                                handleTranslateMessage(msg.id, msg.content)
                              }
                              className="hover:underline text-[10px] text-[#45474a] cursor-pointer glass-button-secondary"
                            >
                              ซ่อน
                            </button>
                          </div>
                          <p className="text-[#1b1b1d] font-th-body leading-relaxed">
                            {translations[msg.id]}
                          </p>
                        </div>
                      )}

                      {/* Translate Button if not translated */}
                      {!translations[msg.id] && (
                        <button
                          onClick={() =>
                            handleTranslateMessage(msg.id, msg.content)
                          }
                          disabled={translatingIds[msg.id]}
                          className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#7e5356]/80 hover:text-[#7e5356] transition-colors cursor-pointer select-none glass-button-secondary"
                        >
                          {translatingIds[msg.id] ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>กำลังแปลภาษา...</span>
                            </>
                          ) : (
                            <>
                              <Languages className="w-3 h-3" />
                              <span>แปลภาษา</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Image Message */}
                  {msg.contentType === "image" && msg.mediaUrl && (
                    <div
                      className="relative rounded-xl overflow-hidden mb-1 cursor-pointer group/img"
                      onClick={() => onOpenMediaViewer(msg.mediaUrl!)}
                    >
                      <img
                        className="max-w-full h-auto object-cover max-h-72 rounded-xl border border-white/50 shadow-xs"
                        src={msg.mediaUrl}
                        alt="Attachment"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                        <Eye className="w-4 h-4" /> ดูรูปขนาดเต็ม
                      </div>
                    </div>
                  )}

                  {/* Document Message */}
                  {msg.contentType === "document" && (
                    <a
                      href={msg.mediaUrl || "#"}
                      download={msg.fileName || "file"}
                      className="flex items-center gap-3 p-2.5 rounded-xl glass-surface border border-white glass-button-secondary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center text-[#7e5356] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#1b1b1d] truncate">
                          {msg.fileName || msg.content}
                        </p>
                        <p className="text-[11px] text-[#76777b]">
                          {msg.fileSize || "ไฟล์แนบ"}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* Voice Note Message */}
                  {msg.contentType === "voice_note" && (
                    <div className="flex items-center space-x-3 w-52 py-1">
                      <button
                        onClick={() =>
                          setPlayingVoiceId(
                            playingVoiceId === msg.id ? null : msg.id,
                          )
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isMe ? "glass-button-primary" : "glass-surface text-[#1b1b1d] shadow-sm"}`}
                      >
                        {playingVoiceId === msg.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[11px] text-[#76777b] font-mono">
                          <span>{msg.content}</span>
                        </div>
                        <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative">
                          <div
                            className={`h-full ${playingVoiceId === msg.id ? "w-full transition-all duration-3000" : "w-1/3"} ${isMe ? "glass-button-primary" : "bg-[#1b1b1d]"}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location Message Card */}
                  {(msg.contentType === ("location" as any) || msg.latitude !== undefined) && (
                    <div className="space-y-2 max-w-xs">
                      <div className="relative rounded-2xl overflow-hidden glass-surface border border-white/60 shadow-sm p-3 bg-linear-to-br from-rose-50/50 to-sky-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#7e5356] text-white flex items-center justify-center shadow-xs shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#1b1b1d] truncate">
                              {msg.locationAddress || msg.content || "ตำแหน่งปักหมุด"}
                            </p>
                            <p className="text-[10px] text-[#76777b] font-mono">
                              {msg.latitude && msg.longitude
                                ? `${msg.latitude}, ${msg.longitude}`
                                : "GPS Coordinates"}
                            </p>
                          </div>
                        </div>

                        <div className="h-24 rounded-xl bg-slate-200/80 relative overflow-hidden flex items-center justify-center border border-black/5 shadow-inner my-1">
                          <div className="absolute inset-0 bg-[radial-gradient(#7e5356_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
                          <div className="relative z-10 flex flex-col items-center gap-1 text-center p-2">
                            <Navigation className="w-6 h-6 text-[#7e5356] drop-shadow-xs" />
                            <span className="text-[10px] font-bold text-[#1b1b1d] bg-white/90 px-2.5 py-0.5 rounded-full border border-white shadow-2xs">
                              ตำแหน่ง GPS
                            </span>
                          </div>
                        </div>

                        <a
                          href={`https://www.google.com/maps?q=${msg.latitude || 13.7466},${msg.longitude || 100.5347}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 w-full py-1.5 px-3 rounded-xl glass-button-primary text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>เปิดดูใน Google Maps</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Reaction Pill Badge on Message */}
                  {hasReactions && (
                    <div
                      className={`flex items-center gap-1 mt-1.5 pt-1 border-t border-black/5 text-xs`}
                    >
                      {Object.entries(msg.reactions!).map(([uid, emoji]) => (
                        <span
                          key={uid}
                          className="glass-surface border border-black/5 px-2 py-0.5 rounded-full text-[12px] shadow-2xs"
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Time & Read Receipts */}
                <div
                  className={`flex items-center gap-1 text-[11px] font-label-caps text-[#45474a]/60 uppercase ${isMe ? "mr-1" : "ml-1"}`}
                >
                  <span>{formatMessageTime(msg.createdAt)}</span>
                  {isMe && (
                    <span className="flex items-center gap-0.5 ml-1">
                      {(() => {
                        const isReadByOthers =
                          (msg.readBy || []).filter((id) => id !== currentUserId).length > 0;

                        if (readReceiptsEnabled) {
                          if (isReadByOthers) {
                            return (
                              <span
                                className="flex items-center gap-0.5 text-sky-600 font-bold"
                                title="อ่านแล้วโดยผู้รับ (Read by recipient)"
                              >
                                <span className="text-[10px] normal-case">อ่านแล้ว</span>
                                <CheckCheck className="w-[14px] h-[14px] text-sky-500 shrink-0" />
                              </span>
                            );
                          }
                          if (msg.deliveredTo && msg.deliveredTo.length > 0) {
                            return (
                              <span
                                className="flex items-center gap-0.5 text-[#76777b]"
                                title="ส่งถึงผู้รับแล้ว (Delivered)"
                              >
                                <span className="text-[10px] normal-case">ส่งถึงแล้ว</span>
                                <CheckCheck className="w-[14px] h-[14px] shrink-0" />
                              </span>
                            );
                          }
                          return (
                            <span
                              className="flex items-center gap-0.5 text-[#76777b]"
                              title="ส่งเรียบร้อยแล้ว (Sent)"
                            >
                              <span className="text-[10px] normal-case">ส่งแล้ว</span>
                              <Check className="w-[14px] h-[14px] shrink-0" />
                            </span>
                          );
                        } else {
                          // Read receipts disabled by user setting
                          return (
                            <span
                              className="flex items-center gap-0.5 text-[#76777b]/70 cursor-help"
                              title="สถานะการอ่านปิดอยู่เนื่องจากตั้งค่าความเป็นส่วนตัว (Read Receipts Disabled)"
                            >
                              {isReadByOthers ? (
                                <CheckCheck className="w-[14px] h-[14px] shrink-0" />
                              ) : (
                                <Check className="w-[14px] h-[14px] shrink-0" />
                              )}
                            </span>
                          );
                        }
                      })()}
                    </span>
                  )}
                  {msg.isPinned && (
                    <span className="flex items-center gap-0.5 ml-1 text-[#7e5356]">
                      • <Pin className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>

                {/* Hover Action Floating Menu */}
                <div
                  className={`absolute -top-3 ${isMe ? "right-2" : "left-2"} flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 glass-surface backdrop-blur-md p-1 rounded-full border border-[#eae7ea] shadow-sm`}
                >
                  {msg.contentType === "text" && (
                    <button
                      onClick={() =>
                        handleTranslateMessage(msg.id, msg.content)
                      }
                      disabled={translatingIds[msg.id]}
                      className="p-1 rounded-full text-[#7e5356] cursor-pointer glass-button-secondary"
                      title="แปลภาษาด้วย Gemini AI"
                    >
                      {translatingIds[msg.id] ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Languages className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => setReplyingTo(msg)}
                    className="glass-button-secondary p-1 rounded-full text-[#7e5356] cursor-pointer"
                    title="ตอบกลับ"
                  >
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveReactionMessageId(
                        activeReactionMessageId === msg.id ? null : msg.id,
                      )
                    }
                    className="p-1 rounded-full text-amber-600 glass-button-secondary"
                    title="แสดงความรู้สึก"
                  >
                    <Smile className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (onTogglePinMessage)
                        onTogglePinMessage(msg.id, !msg.isPinned);
                    }}
                    className="p-1 rounded-full glass-button-secondary text-[#5d5e63]"
                    title={msg.isPinned ? "ปลดปักหมุด" : "ปักหมุด"}
                  >
                    <Pin
                      className={`w-3.5 h-3.5 ${msg.isPinned ? "fill-current" : ""}`}
                    />
                  </button>
                  {isMe && onDeleteMessage && (
                    <button
                      onClick={() => onDeleteMessage(msg.id)}
                      className="glass-button-secondary p-1 rounded-full text-rose-500"
                      title="ลบข้อความ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Emoji Reaction Selector Drawer */}
                {activeReactionMessageId === msg.id && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-surface rounded-full shadow-lg border border-white/40 px-3 py-1 flex gap-2 z-30 animate-in fade-in zoom-in duration-150">
                    {EMOJI_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          if (onAddReaction) onAddReaction(msg.id, emoji);
                          setActiveReactionMessageId(null);
                        }}
                        className="text-lg hover:scale-125 transition-transform p-0.5 glass-button-secondary"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Attachment Options Drawer */}
      <AnimatePresence>
        {showAttachmentMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3 pb-2 z-40"
          >
            <div className="glass-surface backdrop-blur-2xl p-3 rounded-[24px] border border-white shadow-xl mx-auto w-fit flex gap-3">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="glass-button-secondary p-3 rounded-[18px] bg-transparent flex flex-col items-center glass-button-secondary text-[#7e5356] shadow-2xs border border-white transition-all active:scale-95 w-20 cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-bold font-th-body">
                  รูปภาพ
                </span>
              </button>

              <button
                onClick={() => docInputRef.current?.click()}
                className="p-3 rounded-[18px] bg-transparent flex flex-col items-center glass-button-secondary text-[#7e5356] shadow-2xs border border-white transition-all active:scale-95 w-20 cursor-pointer"
              >
                <FileText className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-bold font-th-body">
                  เอกสาร
                </span>
              </button>

              <button
                onClick={handleSendLocation}
                disabled={isGettingLocation}
                className="p-3 rounded-[18px] bg-transparent flex flex-col items-center glass-button-secondary text-emerald-700 shadow-2xs border border-white transition-all active:scale-95 w-20 cursor-pointer"
              >
                {isGettingLocation ? (
                  <Loader2 className="w-5 h-5 mb-1 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5 mb-1 text-emerald-600" />
                )}
                <span className="text-[11px] font-bold font-th-body">
                  {isGettingLocation ? "กำลังดึง..." : "ตำแหน่ง"}
                </span>
              </button>

              <button
                onClick={() => {
                  setViewOnceEnabled(!viewOnceEnabled);
                  setShowAttachmentMenu(false);
                }}
                className={`p-3 rounded-[18px] shadow-2xs border border-white flex flex-col items-center transition-all active:scale-95 w-20 cursor-pointer ${viewOnceEnabled ? "bg-rose-500 text-white" : "bg-transparent text-amber-600 glass-button-secondary"}`}
              >
                <Eye className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-bold font-th-body">
                  {viewOnceEnabled ? "ดูครั้งเดียว (เปิด)" : "ดูครั้งเดียว"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Input Footer Bar */}
      <footer className="p-3 z-30 glass-surface border-t border-white/60">
        {/* Replying Context Bar */}
        {replyingTo && (
          <div className="mb-2 glass-surface backdrop-blur-md p-2.5 rounded-[16px] border border-white shadow-2xs flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356] shrink-0">
                <CornerUpLeft className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#1b1b1d] text-[11px]">
                  ตอบกลับ {replyingTo.senderName}
                </p>
                <p className="text-[10px] text-[#45474a] truncate mt-0.5">
                  {replyingTo.content}
                </p>
              </div>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="w-6 h-6 rounded-full glass-button-secondary flex items-center justify-center text-[#45474a] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {isRecording ? (
          <div className="glass-surface backdrop-blur-2xl border border-white/60 rounded-full shadow-md p-1.5 flex items-center gap-2">
            <button
              onClick={() => setIsRecording(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-rose-500 glass-button-secondary transition-colors active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center space-x-2 px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span className="text-xs font-mono font-bold text-rose-600">
                กำลังอัดเสียง... 0:
                {recordingSeconds.toString().padStart(2, "0")}
              </span>
            </div>
            <button
              className="w-10 h-10 glass-button-primary rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
              onClick={handleSendVoiceNote}
              data-haptic="heavy"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSend}
            className="glass-surface rounded-squircle-full p-2 flex items-center gap-2 shadow-ambient"
          >
            <button
              type="button"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="min-w-[40px] min-h-[40px] rounded-full glass-button-secondary flex items-center justify-center text-[#45474a]/70 hover:text-[#1b1b1d] transition-colors shrink-0 cursor-pointer"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder={
                  getTranslation(activeLanguage, "typeMessage") ||
                  "พิมพ์ข้อความ..."
                }
                className="w-full min-h-[44px] bg-transparent text-[15px] text-[#1b1b1d] placeholder:text-[#45474a]/50 focus:outline-none px-4"
              />
              {viewOnceEnabled && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                  View Once
                </span>
              )}
            </div>

            {inputText.trim() ? (
              <button
                className="min-w-[44px] min-h-[44px] rounded-full glass-button-primary flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0 cursor-pointer"
                type="submit"
                data-haptic="heavy"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsRecording(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#45474a]/70 hover:text-[#7e5356] glass-button-secondary transition-colors shrink-0 cursor-pointer"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </form>
        )}
      </footer>
    </div>
  );
};
