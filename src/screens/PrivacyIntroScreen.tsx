import React, { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Shield,
  ShieldCheck,
  Lock,
  EyeOff,
  Fingerprint,
  HardDrive,
  History,
  ArrowRight,
  CheckCheck,
  X,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface PrivacyIntroScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const PrivacyIntroScreen: React.FC<PrivacyIntroScreenProps> = ({
  activeLanguage,
  onNavigate,
}) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".glass-surface");
        cards.forEach((card: any) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-transparent text-[#1b1b1d] min-h-screen font-[Inter] overflow-x-hidden selection:bg-[#ffdadb] selection:text-[#311215]">
      {/* TopAppBar */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ความเป็นส่วนตัว
          </span>
        </div>
      </header>

      {/* Background Atmospheric Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ffefef]/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f2f2f7]/40 blur-[120px] rounded-full"></div>
      </div>

      <main
        className="pt-32 pb-40 px-5 md:px-16 max-w-5xl mx-auto relative z-10"
        ref={cardsRef}
      >
        {/* Header Section */}
        <section className="mb-12 text-center md:text-left">
          <h2 className="font-[Prompt] text-[34px] md:text-[48px] font-bold mb-4 text-[#1b1b1d] leading-tight">
            ความเป็นส่วนตัวไม่ใช่ทางเลือก <br />
            <span
              style={{
                background: "linear-gradient(135deg, #5d5e63 0%, #7e5356 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              แต่คือคำสัญญาของเรา
            </span>
          </h2>
          <p className="text-[#45474a] font-[Inter] text-[17px] max-w-2xl leading-relaxed">
            {getTranslation(activeLanguage, "privacyManifestoDesc") ||
              "เราใช้การเข้ารหัสระดับโลกเพื่อให้มั่นใจว่าข้อมูลของคุณยังคงเป็นของคุณ Tirak Chat ไม่สามารถอ่าน เห็น หรือแบ่งปันบทสนทนาส่วนตัวของคุณได้"}
          </p>
        </section>

        {/* Bento Grid: Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Hero Card: E2E Encryption */}
          <div className="md:col-span-8 glass-surface glass-border rounded-[32px] p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl glass-button-primary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#7e5356]" />
              </div>
              <h3 className="font-[Prompt] text-[24px] font-bold text-[#1b1b1d] mb-3">
                {getTranslation(activeLanguage, "e2eeTitle") ||
                  "การเข้ารหัสแบบปลายทางถึงปลายทาง"}
              </h3>
              <p className="text-[#45474a] font-[Inter] text-[14px] max-w-md">
                {getTranslation(activeLanguage, "e2eeDesc") ||
                  "ข้อความของคุณถูกล็อกด้วยกุญแจเฉพาะที่คุณและผู้รับเท่านั้นที่มี ไม่มีตัวกลาง ไม่มีข้อยกเว้น"}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden glass-surface">
                    <img
                      className="rounded-[20px] shadow-sm w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      alt="User 1"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center glass-button-primary text-xs font-bold z-10">
                    <Lock className="w-4 h-4 fill-white" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden glass-surface">
                    <img
                      className="rounded-[20px] shadow-sm w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                      alt="User 2"
                    />
                  </div>
                </div>
                <span className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#45474a]/60 uppercase">
                  เซสชันความปลอดภัยทำงาน
                </span>
              </div>
            </div>

            {/* Abstract visual decoration */}
            <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <Shield
                className="w-full h-full text-[#5d5e63]"
                strokeWidth={1}
              />
            </div>
          </div>

          {/* Side Card: Zero-Knowledge */}
          <div className="md:col-span-4 glass-surface glass-border rounded-[32px] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#e0dfe4]/50 flex items-center justify-center mb-6">
                <EyeOff className="w-6 h-6 text-[#5d5e63]" />
              </div>
              <h3 className="font-[Prompt] text-[24px] font-bold text-[#1b1b1d] mb-3">
                {getTranslation(activeLanguage, "zeroKnowledgeTitle") ||
                  "สถาปัตยกรรมไร้การจดจำ"}
              </h3>
              <p className="text-[#45474a] font-[Inter] text-[14px]">
                {getTranslation(activeLanguage, "zeroKnowledgeDesc") ||
                  "แม้แต่เราก็ไม่มีกุญแจ ข้อมูลเมทาดาต้าของคุณถูกทำให้ไม่ระบุตัวตนและลบข้อมูลระบุตัวตนออก"}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#c6c6ca]/20">
              <div className="flex justify-between items-center">
                <span className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#5d5e63] uppercase">
                  สถานะข้อมูล
                </span>
                <span className="font-[Prompt] text-[11px] font-bold text-[#ba1a1a] bg-[#ffdad6]/50 px-2 py-1 rounded-full uppercase">
                  ล้างข้อมูลแล้ว
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row Bento */}
          <div className="md:col-span-4 glass-surface glass-border rounded-[32px] p-6 text-center animate-float">
            <Fingerprint className="w-10 h-10 text-[#7e5356] mb-4 mx-auto" />
            <h4 className="font-[Prompt] font-bold text-[#1b1b1d] mb-2">
              {getTranslation(activeLanguage, "biometricLockTitle") ||
                "ล็อกด้วยชีวมิติ"}
            </h4>
            <p className="text-[#45474a] font-[Inter] text-[14px]">
              {getTranslation(activeLanguage, "biometricLockDesc") ||
                "เพิ่มชั้นความปลอดภัยที่สองด้วยฮาร์ดแวร์"}
            </p>
          </div>

          <div
            className="md:col-span-4 glass-surface glass-border rounded-[32px] p-6 text-center animate-float"
            style={{ animationDelay: "1s" }}
          >
            <HardDrive className="w-10 h-10 text-[#5d5e63] mb-4 mx-auto" />
            <h4 className="font-[Prompt] font-bold text-[#1b1b1d] mb-2">
              {getTranslation(activeLanguage, "localStorageTitle") ||
                "พื้นที่จัดเก็บในเครื่อง"}
            </h4>
            <p className="text-[#45474a] font-[Inter] text-[14px]">
              {getTranslation(activeLanguage, "localStorageDesc") ||
                "กุญแจของคุณจะไม่เคยออกจากอุปกรณ์ของคุณ"}
            </p>
          </div>

          <div
            className="md:col-span-4 glass-surface glass-border rounded-[32px] p-6 text-center animate-float"
            style={{ animationDelay: "2s" }}
          >
            <History className="w-10 h-10 text-[#5d5e63] mb-4 mx-auto" />
            <h4 className="font-[Prompt] font-bold text-[#1b1b1d] mb-2">
              {getTranslation(activeLanguage, "autoErasureTitle") ||
                "ลบอัตโนมัติ"}
            </h4>
            <p className="text-[#45474a] font-[Inter] text-[14px]">
              {getTranslation(activeLanguage, "autoErasureDesc") ||
                "ข้อความหายไปหลังจากอ่านตามคำสั่งของคุณ"}
            </p>
          </div>
        </div>

        {/* Privacy Policy Minimal Link */}
        <div className="flex justify-center mt-8">
          <button className="glass-button-secondary flex items-center gap-2 text-[#45474a] hover:text-[#7e5356] transition-colors group">
            <span className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] uppercase">
              อ่านแถลงการณ์ความเป็นส่วนตัวฉบับเต็มของเรา
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Bottom Navigation Shell (Progress Focus) */}
      <nav className="fixed bottom-6 left-0 right-0 w-max mx-auto z-50 flex flex-col items-center gap-4 px-8 py-4 glass-surface rounded-full border border-white/30 shadow-lg">
        {/* Progress Steps */}
        <div className="flex gap-2 mb-2">
          <div className="w-12 h-1.5 rounded-full glass-button-primary"></div>
          <div className="w-12 h-1.5 rounded-full glass-button-primary"></div>
          <div className="w-12 h-1.5 rounded-full bg-[#ffefef]"></div>
          <div className="w-12 h-1.5 rounded-full bg-[#ffefef]"></div>
        </div>

        <div className="flex items-center gap-12">
          <button
            onClick={() => onNavigate("register")}
            className="glass-button-secondary text-[#45474a]/60 font-[Inter] text-[12px] font-semibold tracking-widest hover:text-[#1b1b1d] transition-colors uppercase"
          >
            ย้อนกลับ
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate("register")}
            className="glass-button-primary px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-[Prompt] text-[15px]"
            data-haptic="heavy"
          >
            ฉันเข้าใจ
            <CheckCheck className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate("register")}
            className="glass-button-secondary text-[#45474a]/60 font-[Inter] text-[12px] font-semibold tracking-widest hover:text-[#1b1b1d] transition-colors uppercase"
          >
            ข้าม
          </button>
        </div>
      </nav>
    </div>
  );
};
