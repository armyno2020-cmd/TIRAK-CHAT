import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Volume2,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface NotificationSettingsScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const NotificationSettingsScreen: React.FC<
  NotificationSettingsScreenProps
> = ({ activeLanguage, onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [previewEnabled, setPreviewEnabled] = useState(false);

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
          {getTranslation(activeLanguage, "notifications")}
        </h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        {/* Enable All Notifications */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl glass-button-primary/10 text-[#7e5356] flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                การแจ้งเตือนพุช (Push Notifications)
              </p>
              <p className="text-xs text-[#687280]">
                รับการแจ้งเตือนข้อความและการโทรเรียลไทม์
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 glass-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:glass-button-primary"></div>
          </label>
        </div>

        {/* In-app sound */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffefef]/60 text-[#7e5356] flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                เสียงและการสั่นในแอป (Sounds & Haptics)
              </p>
              <p className="text-xs text-[#687280]">
                เล่นเสียงเตือนเมื่อได้รับข้อความขณะเปิดแอป
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 glass-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:glass-button-primary"></div>
          </label>
        </div>

        {/* Hide message preview */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                แสดงตัวอย่างข้อความ (Message Preview)
              </p>
              <p className="text-xs text-[#687280]">
                แสดงเนื้อหาข้อความในป้ายแจ้งเตือน
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={previewEnabled}
              onChange={(e) => setPreviewEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 glass-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:glass-button-primary"></div>
          </label>
        </div>
      </main>
    </div>
  );
};
