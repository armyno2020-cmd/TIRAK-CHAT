// @ts-nocheck
import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Pin,
  ShieldCheck,
  Plus,
  CheckCheck,
  CircleDot,
  User,
  ArrowUpRight,
} from "lucide-react";
import { ChatRoom, Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";
import { PresenceDot } from "../components/PresenceDot";

interface ChatListScreenProps {
  activeLanguage: Language;
  chats: ChatRoom[];
  onSelectChat: (chatId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenNewGroup: () => void;
  currentUser?: any;
}

export const ChatListScreen: React.FC<ChatListScreenProps> = ({
  activeLanguage,
  chats,
  onSelectChat,
  onNavigate,
  onOpenNewGroup,
  currentUser,
}) => {
  const [activeFolder, setActiveFolder] = useState<
    "all" | "my_chats" | "work" | "channels"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState<"activity" | "unread" | "name">("activity");

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chat.lastMessage &&
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeFolder === "all") return true;
    if (activeFolder === "my_chats")
      return chat.type === "direct" || chat.type === "note_to_self";
    if (activeFolder === "work")
      return chat.folder === "work" || chat.type === "group";
    if (activeFolder === "channels") return chat.type === "channel";
    return true;
  });

  // Sorting Utility: Prioritizes explicitly pinned chats, then auto-pins unread messages to top, sorted by lastMessageAt
  const sortedChats = [...filteredChats].sort((a, b) => {
    // 1. User-pinned chats always go first
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;

    if (sortBy === "unread") {
      const aUnread = (a.unreadCount && a.unreadCount > 0) ? 1 : 0;
      const bUnread = (b.unreadCount && b.unreadCount > 0) ? 1 : 0;
      if (aUnread !== bUnread) return bUnread - aUnread;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name, "th");
    }

    // Default 'activity' sorting: Auto-pin unread messages to top, then sort by lastMessageAt timestamp
    const aUnread = (a.unreadCount && a.unreadCount > 0) ? 1 : 0;
    const bUnread = (b.unreadCount && b.unreadCount > 0) ? 1 : 0;
    if (aUnread !== bUnread) return bUnread - aUnread;

    const timeA = a.lastMessageAt || (a as any).lastUpdated || a.createdAt || 0;
    const timeB = b.lastMessageAt || (b as any).lastUpdated || b.createdAt || 0;
    return timeB - timeA;
  });

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full overflow-hidden flex flex-col font-th-body relative w-full">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface shadow-2xs flex justify-between items-center w-full border-b border-white/60">
        <div className="flex items-center gap-2.5">
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ข้อความ
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#ffefef] text-[#7e5356] text-[11px] font-bold">
            E2EE
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate("global_search")}
            className="glass-button-secondary p-2 rounded-full glass-button-secondary text-[#45474a] transition-colors cursor-pointer"
            title="ค้นหาทั่วโลก"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate("add_friend")}
            className="glass-button-secondary p-2 rounded-full glass-button-secondary text-[#7e5356] transition-colors cursor-pointer"
            title="เพิ่มเพื่อน"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 w-full overflow-y-auto space-y-3">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#76777b]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อแชท สมาชิก หรือข้อความ..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full glass-surface border border-white/60 text-sm font-th-body text-[#1b1b1d] placeholder:text-[#76777b] outline-none focus:ring-2 focus:ring-[#7e5356]/20 transition-all shadow-xs"
          />
        </div>

        {/* Folder Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-5 pb-1">
          {[
            { id: "all", label: "ทั้งหมด" },
            { id: "my_chats", label: "แชทส่วนตัว" },
            { id: "work", label: "กลุ่มแชท" },
            { id: "channels", label: "ช่องทางข่าวสาร" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFolder(tab.id as any)}
              className={`px-4 py-1.5 rounded-full font-th-body text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                activeFolder === tab.id
                  ? "glass-button-primary border-[#7e5356] shadow-xs"
                  : "glass-surface text-[#45474a] border-white/40 glass-button-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Carousel */}
        <section className="mb-6 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar py-1 items-center">
            {/* Add Story */}
            <div
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              onClick={() => onNavigate("create_story")}
            >
              <div className="w-14 h-14 rounded-full glass-surface flex items-center justify-center border border-white/60 group-hover:scale-105 active:scale-95 transition-transform">
                <Plus className="w-6 h-6 text-[#7e5356]" />
              </div>
              <span className="font-th-body text-[11px] font-semibold text-[#45474a] whitespace-nowrap">
                เพิ่มสตอรี่
              </span>
            </div>
          </div>
        </section>

        {/* Chat List Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="font-th-heading text-lg font-extrabold text-[#1b1b1d] flex items-center gap-2">
              <span>รายการแชทล่าสุด</span>
              {sortedChats.some((c) => (c.unreadCount || 0) > 0) && (
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                  มีข้อความยังไม่อ่าน
                </span>
              )}
            </h2>
            <div className="flex items-center gap-1 text-[11px] font-th-body text-[#7e5356] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>E2EE Active</span>
            </div>
          </div>

          {sortedChats.length === 0 ? (
            <div className="glass-surface rounded-3xl p-8 text-center border border-white/40 my-4">
              <p className="font-th-body text-sm text-[#45474a] font-medium">
                ไม่พบรายการแชทตามคำค้นหา
              </p>
            </div>
          ) : (
            sortedChats.map((chat) => {
              const peerUid =
                chat.members?.find((m) => m !== currentUser?.uid) ||
                chat.members?.[0];
              const chatTimestamp =
                chat.lastMessageAt || (chat as any).lastUpdated || chat.createdAt;
              const hasUnread = (chat.unreadCount || 0) > 0;

              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`glass-surface rounded-3xl p-3.5 sm:p-4 flex items-center gap-3.5 cursor-pointer transition-all duration-200 active:scale-[0.99] border glass-surface shadow-xs relative ${
                    hasUnread
                      ? "border-rose-300/80 bg-rose-50/30"
                      : "border-white/50 glass-button-secondary"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/60 shadow-xs">
                      <img
                        className="rounded-[20px] shadow-sm w-full h-full object-cover"
                        src={chat.avatarUrl}
                        alt={chat.name}
                      />
                    </div>
                    {peerUid && <PresenceDot uid={peerUid} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5 gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        {chat.isPinned && (
                          <Pin className="w-3.5 h-3.5 text-[#7e5356] fill-[#7e5356] shrink-0" />
                        )}
                        <span className="font-th-heading text-[15px] sm:text-[16px] font-bold truncate text-[#1b1b1d]">
                          {chat.name}
                        </span>
                      </div>
                      <span className="font-th-body text-[11px] font-medium text-[#76777b] whitespace-nowrap flex-shrink-0">
                        {chatTimestamp
                          ? new Date(chatTimestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`font-th-body text-[13px] sm:text-[14px] truncate leading-snug ${
                          hasUnread
                            ? "text-[#1b1b1d] font-semibold"
                            : "text-[#45474a] font-normal"
                        }`}
                      >
                        {chat.lastMessage || "ไม่มีข้อความ"}
                      </p>
                      {hasUnread ? (
                        <span className="glass-button-primary px-2 py-0.5 rounded-full font-th-body font-bold text-[10px] whitespace-nowrap flex-shrink-0 shadow-2xs bg-rose-600 text-white">
                          {chat.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};
