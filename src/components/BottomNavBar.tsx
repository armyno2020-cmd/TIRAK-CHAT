import React from "react";
import {
  MessageSquare,
  Users,
  Phone,
  CircleDot,
  Settings,
  Plus,
} from "lucide-react";
import { Language, MainTab, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface BottomNavBarProps {
  activeTab?: MainTab;
  activeScreen?: ScreenId;
  activeLanguage: Language;
  onTabSelect?: (tab: MainTab) => void;
  onNavigate?: (screen: ScreenId) => void;
  onQuickCompose?: () => void;
  unreadCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  activeScreen,
  activeLanguage,
  onTabSelect,
  onNavigate,
  onQuickCompose,
  unreadCount = 0,
}) => {
  const currentTab: MainTab = (() => {
    if (activeTab) return activeTab;
    if (activeScreen === "chat_list") return "chats";
    if (activeScreen === "create_group") return "groups";
    if (activeScreen === "call_history" || activeScreen === "call_active")
      return "calls";
    if (activeScreen === "stories_feed") return "stories";
    if (activeScreen?.startsWith("settings")) return "settings";
    return "chats";
  })();

  const handleTabClick = (tab: MainTab) => {
    if (onTabSelect) {
      onTabSelect(tab);
      return;
    }
    if (onNavigate) {
      switch (tab) {
        case "chats":
          onNavigate("chat_list");
          break;
        case "groups":
          onNavigate("create_group");
          break;
        case "calls":
          onNavigate("call_history");
          break;
        case "stories":
          onNavigate("stories_feed");
          break;
        case "settings":
          onNavigate("settings_account");
          break;
        default:
          onNavigate("chat_list");
      }
    }
  };

  const handleQuickCompose = () => {
    if (onQuickCompose) {
      onQuickCompose();
      return;
    }
    if (onNavigate) {
      onNavigate("create_group");
    }
  };

  return (
    <div className="w-full glass-surface border-t border-white/60 px-2 py-1.5 z-40 shrink-0">
      <div className="relative glass-surface rounded-2xl p-1 shadow-sm border border-white/80 flex items-center justify-around gap-1 max-w-md mx-auto">
        {/* Messages Tab */}
        <button
          onClick={() => handleTabClick("chats")}
          className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === "chats"
              ? "glass-button-primary shadow-xs"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && currentTab !== "chats" && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-th-body font-medium mt-0.5 whitespace-nowrap truncate px-0.5">
            {getTranslation(activeLanguage, "messages")}
          </span>
        </button>

        {/* Communities / Groups Tab */}
        <button
          onClick={() => handleTabClick("groups")}
          className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === "groups"
              ? "glass-button-primary shadow-xs"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-th-body font-medium mt-0.5 whitespace-nowrap truncate px-0.5">
            {getTranslation(activeLanguage, "channels")}
          </span>
        </button>

        {/* Quick Compose Button */}
        <div className="px-0.5 flex-shrink-0">
          <button
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7e5356] to-[#512c2f] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            onClick={handleQuickCompose}
            data-haptic="medium"
            aria-label="สร้างข้อความหรือกลุ่มใหม่"
            title="เขียนข้อความเข้ารหัส E2EE"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Calls Tab */}
        <button
          onClick={() => handleTabClick("calls")}
          className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === "calls"
              ? "glass-button-primary shadow-xs"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-th-body font-medium mt-0.5 whitespace-nowrap truncate px-0.5">
            {getTranslation(activeLanguage, "call")}
          </span>
        </button>

        {/* Stories Tab */}
        <button
          onClick={() => handleTabClick("stories")}
          className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === "stories"
              ? "glass-button-primary shadow-xs"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
        >
          <CircleDot className="w-5 h-5" />
          <span className="text-[10px] font-th-body font-medium mt-0.5 whitespace-nowrap truncate px-0.5">
            {getTranslation(activeLanguage, "storiesTitle")}
          </span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => handleTabClick("settings")}
          className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === "settings"
              ? "glass-button-primary shadow-xs"
              : "text-[#687280] hover:text-[#1b1b1d] glass-button-secondary"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-th-body font-medium mt-0.5 whitespace-nowrap truncate px-0.5">
            {getTranslation(activeLanguage, "settings")}
          </span>
        </button>
      </div>
    </div>
  );
};
