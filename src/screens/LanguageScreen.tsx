import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Language, ScreenId, UserProfile } from "../types";
import { getTranslation } from "../locales/i18n";

interface LanguageScreenProps {
  onSelectLanguage?: (lang: Language) => void;
  activeLanguage: Language;
  onNavigate?: (screen: ScreenId) => void;
  currentUser?: UserProfile | null;
  isOnboarded?: boolean;
}

export const LanguageScreen: React.FC<LanguageScreenProps> = ({
  onSelectLanguage,
  activeLanguage,
  onNavigate,
  currentUser,
  isOnboarded,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(activeLanguage);

  const languagesList: {
    code: Language;
    nativeName: string;
    region: string;
    badge: string;
    flagCode: string;
  }[] = [
    {
      code: "th",
      nativeName: "ภาษาไทย",
      region: "Thailand",
      badge: "TH",
      flagCode: "th",
    },
    {
      code: "en",
      nativeName: "English",
      region: "United States",
      badge: "EN",
      flagCode: "us",
    },
    {
      code: "zh",
      nativeName: "中文",
      region: "China",
      badge: "ZH",
      flagCode: "cn",
    },
    {
      code: "ja",
      nativeName: "日本語",
      region: "Japan",
      badge: "JA",
      flagCode: "jp",
    },
    {
      code: "ko",
      nativeName: "한국어",
      region: "South Korea",
      badge: "KO",
      flagCode: "kr",
    },
  ];

  const handleConfirm = () => {
    if (onSelectLanguage) onSelectLanguage(selectedLang);
    if (onNavigate) {
      if (isOnboarded) {
        onNavigate("chat_list");
      } else {
        onNavigate("welcome");
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent liquid-bg flex flex-col justify-between p-4 md:p-8 relative overflow-hidden font-th-body">
      {/* Background Atmospheric Element */}
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#ffefef]/60 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] -left-[5%] w-[350px] h-[350px] rounded-full bg-[#f2f2f7]/60 blur-[100px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ภาษา
          </span>
        </div>
      </header>

      {/* Main Card Canvas */}
      <main className="max-w-5xl mx-auto w-full my-auto py-12 flex justify-center z-10">
        <div
          className="glass-surface w-full max-w-md rounded-3xl p-8 md:p-10 flex flex-col shadow-lg border border-white/80 floating-element"
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        >
          <div className="text-center mb-6">
            <h1 className="font-th-heading text-2xl md:text-3xl font-extrabold text-[#1b1b1d] tracking-tight mb-2">
              เลือกภาษา
            </h1>
            <p className="font-th-body text-sm text-[#45474a] leading-relaxed">
              เลือกภาษาที่คุณต้องการใช้งานสำหรับระบบ NEWFOUND
            </p>
          </div>

          {/* Language List */}
          <div className="space-y-3 mb-8">
            {languagesList.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl glass-surface border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#7e5356] shadow-md glass-surface scale-[1.02]"
                      : "border-[#c6c6ca]/50 glass-button-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center glass-surface shadow-sm border border-[#c6c6ca]/30 overflow-hidden shrink-0 ${
                        isSelected ? "ring-2 ring-[#7e5356]/40" : ""
                      }`}
                    >
                      <img
                        className="w-7 h-5 object-cover rounded-[2px]"
                        src={`https://flagcdn.com/w80/${lang.flagCode}.png`}
                        alt={`${lang.nativeName} flag`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-th-heading text-base font-bold text-[#1b1b1d]">
                        {lang.nativeName}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full glass-button-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#7e5356]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="w-full py-4 rounded-full glass-button-primary font-th-heading font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all"
            onClick={handleConfirm}
          >
            <span>ยืนยันการเลือกภาษา</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Footer Space for Balance */}
      <footer className="w-full max-w-5xl mx-auto pt-6 opacity-0 pointer-events-none">
        <div className="h-6"></div>
      </footer>
    </div>
  );
};
