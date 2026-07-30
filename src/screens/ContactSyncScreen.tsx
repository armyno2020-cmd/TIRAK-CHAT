import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  Search,
  Smartphone,
} from "lucide-react";
import { Language, ScreenId, UserProfile } from "../types";
import { getTranslation } from "../locales/i18n";
import { FirebaseService } from "../services/firebaseService";

interface ContactSyncScreenProps {
  activeLanguage: Language;
  currentUser: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onCompleteOnboarding: () => void;
}

export const ContactSyncScreen: React.FC<ContactSyncScreenProps> = ({
  activeLanguage,
  currentUser,
  onNavigate,
  onCompleteOnboarding,
}) => {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [syncedContacts, setSyncedContacts] = useState<UserProfile[]>([]);
  const [syncComplete, setSyncComplete] = useState(false);

  useEffect(() => {
    if (syncing) {
      // Simulate sync progress
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 10;
        });
      }, 300);

      // Perform actual fetch
      const performSync = async () => {
        try {
          const users = await FirebaseService.getAllUsers();
          const currentId = currentUser?.uid || currentUser?.id;
          const others = users.filter((u) => u.id !== currentId && u.uid !== currentId);
          setSyncedContacts(others);
        } catch (error) {
          console.error("Error syncing contacts:", error);
        } finally {
          setTimeout(() => setSyncComplete(true), 3000); // ensure progress reaches 100
        }
      };

      performSync();
      return () => clearInterval(interval);
    }
  }, [syncing, currentUser.uid]);

  const handleStartSync = () => {
    setSyncing(true);
  };

  const handleFinish = () => {
    onCompleteOnboarding();
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
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ซิงค์รายชื่อ
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
              ซิงก์รายชื่อผู้ติดต่อ
            </h1>
            <p className="font-th-body text-sm text-[#45474a] leading-relaxed">
              ค้นหาเพื่อนที่ใช้ NEWFOUND จากสมุดโทรศัพท์ของคุณ
            </p>
          </div>

          {!syncing && !syncComplete ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-24 h-24 rounded-full bg-[#ffefef] flex items-center justify-center mb-6 shadow-sm border border-[#c6c6ca]/50 relative">
                <Users className="w-10 h-10 text-[#7e5356]" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full glass-surface flex items-center justify-center shadow-md">
                  <Smartphone className="w-4 h-4 text-[#7e5356]" />
                </div>
              </div>
              <button
                className="w-full py-4 rounded-full glass-button-primary font-th-heading font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all mb-4"
                onClick={handleStartSync}
              >
                <Search className="w-5 h-5 text-rose-200" />
                <span>เริ่มค้นหาผู้ติดต่อ</span>
              </button>
              <button
                className="w-full py-4 rounded-full glass-surface text-[#1b1b1d] font-th-heading font-bold text-sm border border-[#c6c6ca]/50 glass-button-secondary shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                onClick={handleFinish}
              >
                ข้ามขั้นตอนนี้
              </button>
            </div>
          ) : !syncComplete ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="none"
                    stroke="#c6c6ca"
                    strokeWidth="4"
                    className="opacity-30"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="none"
                    stroke="#7e5356"
                    strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-th-heading text-xl font-bold text-[#7e5356]">
                    {progress}%
                  </span>
                </div>
              </div>
              <p className="font-th-heading font-bold text-[#1b1b1d] mb-2 animate-pulse">
                กำลังเข้ารหัสและค้นหา...
              </p>
              <p className="text-xs text-[#45474a]">
                กระบวนการนี้ใช้สถาปัตยกรรม Zero-Knowledge
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 rounded-full bg-[#ffefef] flex items-center justify-center mb-6 shadow-sm border border-[#c6c6ca]/50">
                <CheckCircle2 className="w-10 h-10 text-[#7e5356]" />
              </div>
              <h2 className="font-th-heading text-xl font-bold text-[#1b1b1d] mb-4">
                พบ {syncedContacts.length} ผู้ติดต่อ
              </h2>

              <div className="w-full max-h-48 overflow-y-auto mb-6 space-y-2 pr-2 custom-scrollbar text-left">
                {syncedContacts.map((contact, idx) => (
                  <div
                    key={contact.uid || contact.id || `contact-${idx}`}
                    className="flex items-center gap-3 p-3 rounded-2xl glass-surface border border-[#c6c6ca]/30"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={contact.photoURL}
                      alt={contact.displayName}
                    />
                    <div className="flex-1">
                      <p className="font-th-heading font-bold text-sm text-[#1b1b1d]">
                        {contact.displayName}
                      </p>
                      <p className="text-[10px] text-[#45474a]">
                        @{contact.username}
                      </p>
                    </div>
                    <button className="glass-button-secondary w-8 h-8 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356]">
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {syncedContacts.length === 0 && (
                  <p className="text-sm text-center text-[#45474a] py-4">
                    ไม่พบผู้ติดต่อในระบบ
                  </p>
                )}
              </div>

              <button
                className="w-full py-4 rounded-full glass-button-primary font-th-heading font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all"
                onClick={handleFinish}
              >
                <span>เข้าสู่แอปพลิเคชัน</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          <div className="text-center pt-6">
            <p className="text-xs text-[#76777b] font-th-body">
              ข้อมูลสมุดโทรศัพท์ของคุณจะไม่ถูกจัดเก็บไว้บนเซิร์ฟเวอร์
            </p>
          </div>
        </div>
      </main>

      {/* Footer Space for Balance */}
      <footer className="w-full max-w-5xl mx-auto pt-6 opacity-0 pointer-events-none">
        <div className="h-6"></div>
      </footer>
    </div>
  );
};
