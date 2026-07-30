import React from "react";
import { ShieldCheck, ArrowLeft, Globe } from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface NavigationHeaderProps {
  currentScreen: ScreenId;
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  title?: string;
  showBack?: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  activeLanguage,
  onNavigate,
  onOpenLanguageModal,
  title,
  showBack = false,
}) => {
  const getHeaderTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case "chat_list":
        return getTranslation(activeLanguage, "messages");
      case "stories_feed":
        return getTranslation(activeLanguage, "storiesTitle");
      case "call_history":
        return getTranslation(activeLanguage, "call");
      case "settings_account":
        return getTranslation(activeLanguage, "settings");
      case "settings_privacy":
        return getTranslation(activeLanguage, "privacySecurity");
      case "settings_notifications":
        return getTranslation(activeLanguage, "notifications");
      case "settings_backup":
        return getTranslation(activeLanguage, "storageBackup");
      case "settings_help":
        return getTranslation(activeLanguage, "helpAbout");
      case "privacy_intro":
        return "คำแถลงความเป็นส่วนตัว";
      case "security_setup":
        return "ตั้งค่าความปลอดภัย";
      default:
        return "Tirak Chat";
    }
  };

  return (
    <div className="w-full px-4 pt-4 pb-2 z-40 bg-transparent">
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center px-4 py-3 rounded-full glass-surface border border-white/60 shadow-sm relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            showBack ? onNavigate("chat_list") : onNavigate("welcome")
          }
        >
          {showBack ? (
            <ArrowLeft className="w-5 h-5 text-[#7e5356]" />
          ) : (
            <img
              src="/tirak_logo.png"
              alt="TIRAK CHAT"
              className="w-6 h-6 object-contain filter drop-shadow-2xs"
            />
          )}
          <div className="flex flex-col">
            <span className="font-th-heading text-lg md:text-xl tracking-tight text-[#1b1b1d] font-extrabold leading-none truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {getHeaderTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#7e5356] glass-surface border border-white/40 shadow-xs cursor-pointer glass-button-secondary"
            onClick={onOpenLanguageModal}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">
              {activeLanguage === "th" ? "TH" : "EN"}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};
