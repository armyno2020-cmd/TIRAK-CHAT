import React from "react";
import { X, Check, Globe } from "lucide-react";
import { Language } from "../types";
import { getTranslation } from "../locales/i18n";

interface LanguageSelectorModalProps {
  isOpen: boolean;
  currentLanguage: Language;
  onClose: () => void;
  onSelectLanguage: (lang: Language) => void;
}

const LANGUAGES_LIST: {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  flagCode: string;
}[] = [
  {
    code: "th",
    name: "Thai",
    nativeName: "ภาษาไทย",
    flag: "🇹🇭",
    flagCode: "th",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English (US)",
    flag: "🇺🇸",
    flagCode: "us",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    flagCode: "fr",
  },
  {
    code: "jp",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    flagCode: "jp",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    flagCode: "es",
  },
];

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  currentLanguage,
  onClose,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-sm glass-surface rounded-3xl p-6 border border-white/80 shadow-2xl relative animate-scale-up">
        <button
          className="absolute top-4 right-4 p-2 rounded-full glass-button-secondary text-[#687280]"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl glass-button-primary/10 flex items-center justify-center text-[#7e5356]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-th-heading text-lg font-bold text-[#1b1b1d]">
              {getTranslation(currentLanguage, "chooseLanguage")}
            </h3>
            <p className="text-xs text-[#687280] font-th-body">
              {getTranslation(currentLanguage, "chooseLanguageSub")}
            </p>
          </div>
        </div>

        <div className="space-y-2 my-4">
          {LANGUAGES_LIST.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? "glass-button-primary shadow-md shadow-[#7e5356]/20"
                    : "glass-surface glass-button-secondary text-[#1b1b1d]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full glass-surface flex items-center justify-center overflow-hidden shrink-0 border border-black/5 shadow-2xs">
                    <img
                      className="w-6 h-4 object-cover rounded-xs"
                      src={`https://flagcdn.com/w80/${lang.flagCode}.png`}
                      alt={lang.name}

                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-semibold text-sm ${isSelected ? "text-white" : "text-[#1b1b1d]"}`}
                    >
                      {lang.nativeName}
                    </p>
                    <p
                      className={`text-xs ${isSelected ? "text-rose-100" : "text-[#76777b]"}`}
                    >
                      {lang.name}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full glass-surface flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-[#76777b] font-th-body">
          {getTranslation(currentLanguage, "changeLaterNotice")}
        </p>
      </div>
    </div>
  );
};
