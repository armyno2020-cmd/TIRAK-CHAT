import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  HelpCircle,
  FileText,
  Code2,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";
import { NewFoundLogo } from "../components/NewFoundLogo";

interface HelpScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({
  activeLanguage,
  onNavigate,
}) => {
  const faqs = [
    {
      q: "How does End-to-End Encryption work in NEWFOUND?",
      a: "We use Signal Protocol (ECDH P-256 and AES-256-GCM). Messages are encrypted on your device before transmission and can only be decrypted by the intended recipient.",
    },
    {
      q: "Does NEWFOUND store my phone number or messages?",
      a: "No. Our Zero-Knowledge architecture means no plain-text metadata or message logs are preserved on servers.",
    },
    {
      q: "Can I transfer my chats across devices?",
      a: "Yes, using Encrypted Local or Cloud Backup keys secured with your PIN.",
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col bg-transparent font-th-body text-[#1b1b1d] relative">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate("settings_account")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-th-heading text-[18px] font-bold text-[#7e5356] tracking-tight">
          {getTranslation(activeLanguage, "helpAbout")}
        </h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        {/* App Info Card */}
        <div className="glass-surface p-6 rounded-2xl border border-white/80 shadow-2xs text-center flex flex-col items-center glass-surface">
          <div className="mb-3">
            <NewFoundLogo size="lg" />
          </div>
          <h3 className="font-th-heading text-xl font-extrabold text-[#7e5356]">
            TIRAK CHAT
          </h3>
          <p className="text-xs text-[#7e5356] font-bold mt-1">
            Version 1.0.0 (Build 2026)
          </p>
          <p className="text-xs text-[#687280] mt-1.5">
            {getTranslation(activeLanguage, "secureChat" as any) ||
              "แอปพลิเคชันรับส่งข้อความปลอดภัยระดับทหาร เข้ารหัส E2EE"}
          </p>
        </div>

        {/* Architecture Diagrams Quick Access Card */}
        <div className="glass-surface p-4 rounded-2xl border border-[#7e5356]/20 glass-surface shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl glass-button-primary shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                แผนผังสถาปัตยกรรมระบบ
              </h4>
              <p className="font-th-body text-xs text-[#45474a]">
                ดู Diagram ระบบรวม, Call Flow, Message & Upload
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("architecture_diagrams")}
            className="glass-button-secondary px-3.5 py-2 rounded-xl glass-button-primary font-th-heading text-xs font-bold shadow-2xs  transition-all shrink-0 cursor-pointer"
          >
            เปิดดู
          </button>
        </div>

        {/* FAQs */}
        <div className="space-y-3 pt-2">
          <h4 className="font-th-heading text-sm font-bold text-[#7e5356] px-1">
            คำถามที่พบบ่อย (FAQs)
          </h4>

          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs space-y-1.5 glass-surface"
            >
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                {faq.q}
              </p>
              <p className="font-th-body text-xs text-[#687280] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-2 pb-6">
          <p className="text-[11px] text-[#687280]">
            Signal E2EE Engine Active •{" "}
            <span className="font-mono text-[#7e5356]">tirak-chat-v1</span>
          </p>
        </div>
      </main>
    </div>
  );
};
