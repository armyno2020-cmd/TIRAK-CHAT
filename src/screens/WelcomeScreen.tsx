import React from "react";
import {
  ShieldCheck,
  ArrowRight,
  Shield,
  Globe,
  Lock,
  EyeOff,
  Laptop,
  MessageSquare,
  FolderLock,
  Sparkles,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";
import { NewFoundLogo } from "../components/NewFoundLogo";

interface WelcomeScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  onGoogleSignIn?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  activeLanguage,
  onNavigate,
  onOpenLanguageModal,
  onGoogleSignIn,
}) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between p-4 md:p-8 relative overflow-hidden font-th-body">
      {/* Background Atmospheric Element */}
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#ffefef]/60 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] -left-[5%] w-[350px] h-[350px] rounded-full bg-[#f2f2f7]/60 blur-[100px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface shadow-xs flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl border border-white/60">
        <div className="flex items-center gap-3">
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ยินดีต้อนรับ
          </span>
        </div>
      </header>

      {/* Hero Body */}
      <main className="max-w-5xl mx-auto w-full my-auto pt-20 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
        {/* Left Content Column */}
        <div className="flex flex-col items-start gap-5 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/20 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#7e5356]" />
            <span className="font-th-heading text-[11px] font-bold text-[#7e5356] uppercase tracking-wider">
              {getTranslation(activeLanguage, "militaryGradeProtection")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-[1.15] tracking-tight">
            {activeLanguage === "th" ? (
              <>
                ความปลอดภัยที่ <span className="text-gradient-pink">นิยาม</span>{" "}
                ตัวตนดิจิทัลของคุณ
              </>
            ) : (
              <>
                Shield that <span className="text-gradient-pink">defines</span>{" "}
                your digital existence.
              </>
            )}
          </h1>

          <p className="font-th-body text-sm sm:text-base text-[#45474a] max-w-xl leading-relaxed">
            {activeLanguage === "th"
              ? "NEWFOUND สร้างเกราะป้องกันรอบการสื่อสารที่สำคัญของคุณ เราไม่เพียงเข้ารหัสข้อมูล แต่เราปกป้องความเป็นส่วนตัวของคุณจากโลกภายนอก"
              : "NEWFOUND creates an impenetrable layer around your most sensitive communications. We don't just encrypt; we disappear your footprint from the global grid."}
          </p>

          {/* Action Button Stack */}
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              onClick={() => onNavigate("privacy_intro")}
              className="glass-button-primary px-7 py-3.5 rounded-full font-th-heading font-bold text-base flex items-center justify-center gap-2"
              data-haptic="heavy"
            >
              <span>{getTranslation(activeLanguage, "getStarted")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate("privacy_intro")}
              className="glass-button-secondary glass-button-secondary px-7 py-3.5 rounded-full font-th-heading font-bold text-base flex items-center justify-center gap-2"
            >
              {getTranslation(activeLanguage, "learnMore")}
            </button>
          </div>

          {/* Google Sign-in Button */}
          <div className="w-full pt-1">
            <button
              className="glass-button-secondary w-full px-6 py-3.5 rounded-full font-th-heading font-bold text-sm flex items-center justify-center gap-3"
              onClick={onGoogleSignIn}
            >
              <img
                className="rounded-[20px] shadow-sm w-5 h-5 object-contain"
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google Logo"
              />
              <span>
                {activeLanguage === "th"
                  ? "เข้าสู่ระบบด้วย Google"
                  : "Sign in with Google"}
              </span>
            </button>
          </div>

          {/* Trust Highlights Row */}
          <div className="pt-4 flex flex-wrap gap-5 text-xs text-[#5d5e63]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "zeroKnowledge")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "noMetaData")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "seamlessSync")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Badge Column */}
        <div className="relative flex justify-center items-center py-4">
          <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-square flex items-center justify-center">
            {/* Spinning background glass rings */}
            <div className="absolute inset-0 border border-[#7e5356]/15 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none"></div>
            <div className="absolute inset-8 border border-[#7e5356]/10 rounded-full animate-[spin_18s_linear_infinite_reverse] pointer-events-none"></div>

            {/* Central Glass Shield Card */}
            <div className="glass-surface w-[75%] h-[75%] rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl floating-element border border-white/90">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffdadb]/30 to-transparent pointer-events-none"></div>

              <NewFoundLogo size="xl" />

              <div className="mt-3 text-center z-10">
                <span className="font-th-heading font-extrabold text-lg text-[#1A2648] tracking-wider uppercase block">
                  NEWFOUND
                </span>
                <span className="text-[10px] text-[#7e5356] font-bold uppercase tracking-widest block">
                  E2EE Signal Vault
                </span>
              </div>
            </div>

            {/* Floating Top Node */}
            <div
              className="absolute -top-2 right-[5%] glass-surface p-3.5 rounded-2xl border border-white/80 shadow-lg flex items-center gap-3 floating-element"
              style={{ animationDelay: "-1.5s" }}
            >
              <div className="w-9 h-9 rounded-full bg-[#ffdadb] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#7e5356]" />
              </div>
              <div className="text-left">
                <p className="font-th-heading text-[10px] font-bold text-[#7e5356] tracking-wider">
                  แชทส่วนตัว
                </p>
                <p className="font-th-body text-xs font-extrabold text-[#1b1b1d]">
                  เข้ารหัส E2EE
                </p>
              </div>
            </div>

            {/* Floating Bottom Node */}
            <div
              className="absolute bottom-[8%] -left-3 glass-surface p-3.5 rounded-2xl border border-white/80 shadow-lg flex items-center gap-3 floating-element"
              style={{ animationDelay: "-3s" }}
            >
              <div className="w-9 h-9 rounded-full bg-[#e3e2e7] flex items-center justify-center">
                <FolderLock className="w-5 h-5 text-[#5d5e63]" />
              </div>
              <div className="text-left">
                <p className="font-th-heading text-[10px] font-bold text-[#5d5e63] tracking-wider">
                  คลังปลอดภัย
                </p>
                <p className="font-th-body text-xs font-extrabold text-[#1b1b1d]">
                  พื้นที่จัดเก็บเข้ารหัส
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-6 border-t border-[#c6c6ca]/20 text-xs text-[#626267] z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-75">
            <span className="font-th-heading font-extrabold text-[#1b1b1d]">
              NEWFOUND
            </span>
            <span>© 2026 ระบบความเป็นส่วนตัว NEWFOUND</span>
          </div>

          <div className="flex gap-8 text-center">
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                256-bit
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                การเข้ารหัส AES
              </p>
            </div>
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                100%
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                ตรวจสอบได้โปร่งใส
              </p>
            </div>
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                0
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                ประวัติข้อมูลรั่วไหล
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
