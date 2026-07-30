import React from "react";
import {
  MessageSquare,
  Phone,
  CircleDot,
  Settings,
  UserPlus,
  Search,
  ShieldCheck,
  Globe,
  QrCode,
} from "lucide-react";
import { Language, ScreenId } from "../types";

interface DesktopNavigationRailProps {
  currentScreen: ScreenId;
  activeLanguage: Language;
  currentUser?: any;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  unreadCount?: number;
}

export const DesktopNavigationRail: React.FC<DesktopNavigationRailProps> = ({
  currentScreen,
  activeLanguage,
  currentUser,
  onNavigate,
  onOpenLanguageModal,
  unreadCount = 1,
}) => {
  const isTabActive = (screenGroup: string) => {
    if (
      screenGroup === "chats" &&
      (currentScreen === "chat_list" || currentScreen === "chat_detail")
    )
      return true;
    if (
      screenGroup === "calls" &&
      (currentScreen === "call_history" || currentScreen === "call_active")
    )
      return true;
    if (
      screenGroup === "stories" &&
      (currentScreen === "stories_feed" || currentScreen === "create_story")
    )
      return true;
    if (screenGroup === "settings" && currentScreen.startsWith("settings"))
      return true;
    if (screenGroup === "search" && currentScreen === "global_search")
      return true;
    if (screenGroup === "add_friend" && currentScreen === "add_friend")
      return true;
    return false;
  };

  return (
    <aside className="hidden md:flex flex-col items-center justify-between py-4 px-2 w-16 glass-surface border-r border-white/80 shrink-0 z-30 select-none">
      {/* Top Section: App Logo & User Avatar */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Brand Icon */}
        <button
          onClick={() => onNavigate("chat_list")}
          className="glass-button-secondary w-10 h-10 rounded-2xl glass-button-primary flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="TIRAK CHAT Desktop"
        >
          <MessageSquare className="w-5 h-5 transition-transform group-hover:rotate-6" />
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => onNavigate("settings_account")}
          className={`relative w-10 h-10 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
            isTabActive("settings")
              ? "border-[#7e5356] scale-105"
              : "border-white/80 hover:border-[#7e5356]/50"
          }`}
          title={currentUser?.displayName || "โปรไฟล์ของฉัน"}
        >
          <img
            className="w-full h-full rounded-full object-cover"
            src={
              currentUser?.photoURL ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
            }
            alt="Profile"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        </button>

        <div className="w-8 h-[1px] bg-black/5 my-1" />

        {/* Main Nav Rail Buttons */}
        <nav className="flex flex-col items-center gap-3 w-full">
          {/* Chats */}
          <button
            onClick={() => onNavigate("chat_list")}
            className={`relative p-2.5 rounded-2xl transition-all cursor-pointer group ${
              isTabActive("chats")
                ? "glass-button-primary shadow-md"
                : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
            }`}
            title="ข้อความแชท"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && !isTabActive("chats") && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Call History */}
          <button
            onClick={() => onNavigate("call_history")}
            className={`relative p-2.5 rounded-2xl transition-all cursor-pointer group ${
              isTabActive("calls")
                ? "glass-button-primary shadow-md"
                : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
            }`}
            title="ประวัติการโทร"
          >
            <Phone className="w-5 h-5" />
          </button>

          {/* Stories */}
          <button
            onClick={() => onNavigate("stories_feed")}
            className={`relative p-2.5 rounded-2xl transition-all cursor-pointer group ${
              isTabActive("stories")
                ? "glass-button-primary shadow-md"
                : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
            }`}
            title="สตอรี่"
          >
            <CircleDot className="w-5 h-5" />
          </button>

          {/* Search */}
          <button
            onClick={() => onNavigate("global_search")}
            className={`relative p-2.5 rounded-2xl transition-all cursor-pointer group ${
              isTabActive("search")
                ? "glass-button-primary shadow-md"
                : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
            }`}
            title="ค้นหา"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Add Friend */}
          <button
            onClick={() => onNavigate("add_friend")}
            className={`relative p-2.5 rounded-2xl transition-all cursor-pointer group ${
              isTabActive("add_friend")
                ? "glass-button-primary shadow-md"
                : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
            }`}
            title="เพิ่มเพื่อน"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </nav>
      </div>

      {/* Bottom Section: QR Code, Language Toggle, Settings */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* My QR Code */}
        <button
          onClick={() => onNavigate("my_qrcode")}
          className="glass-button-secondary p-2.5 rounded-2xl text-[#687280] hover:text-[#1b1b1d] transition-all cursor-pointer"
          title="คิวอาร์โค้ดของฉัน"
        >
          <QrCode className="w-5 h-5" />
        </button>

        {/* Language Modal */}
        <button
          className="p-2 rounded-xl text-[#7e5356] glass-button-secondary transition-all text-[11px] font-bold uppercase cursor-pointer flex flex-col items-center"
          onClick={onOpenLanguageModal}
          title="เปลี่ยนภาษา"
        >
          <Globe className="w-4 h-4 mb-0.5" />
          <span>{activeLanguage.toUpperCase()}</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onNavigate("settings_account")}
          className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
            isTabActive("settings")
              ? "glass-button-primary shadow-md"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
          title="การตั้งค่า"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div
          className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs"
          title="E2EE Security Connected"
        />
      </div>
    </aside>
  );
};
