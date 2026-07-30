import React, { useState } from "react";
import {
  ArrowLeft,
  Lock,
  EyeOff,
  ShieldCheck,
  Key,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { Language, ScreenId, ShieldSettings } from "../types";
import { getTranslation } from "../locales/i18n";

interface PrivacySettingsScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
  securitySettings: ShieldSettings;
  onUpdateShieldSettings?: (settings: Partial<ShieldSettings>) => void;
  onUpdateSecuritySettings?: (settings: Partial<ShieldSettings>) => void;
}

export const PrivacySettingsScreen: React.FC<PrivacySettingsScreenProps> = ({
  activeLanguage,
  onNavigate,
  securitySettings,
  onUpdateShieldSettings,
  onUpdateSecuritySettings,
}) => {
  const handleUpdate = (settings: Partial<ShieldSettings>) => {
    if (onUpdateShieldSettings) onUpdateShieldSettings(settings);
    if (onUpdateSecuritySettings) onUpdateSecuritySettings(settings);
  };
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
          {getTranslation(activeLanguage, "privacyIntro" as any) ||
            "ความเป็นส่วนตัวและความปลอดภัย"}
        </h2>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        {/* Read Receipts */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl glass-button-primary/10 text-[#7e5356] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                สถานะการอ่าน (Read Receipts)
              </p>
              <p className="text-xs text-[#687280]">
                ส่งการยืนยันเมื่อคุณอ่านข้อความแล้ว
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.readReceiptsEnabled}
              onChange={(e) =>
                handleUpdate({
                  readReceiptsEnabled: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 glass-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:glass-button-primary"></div>
          </label>
        </div>

        {/* Typing Indicators */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffefef]/60 text-[#7e5356] flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                การแสดงสถานะการพิมพ์ (Typing Indicators)
              </p>
              <p className="text-xs text-[#687280]">
                ซ่อนสถานะว่ากำลังพิมพ์ข้อความ
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.typingIndicatorsEnabled}
              onChange={(e) =>
                handleUpdate({
                  typingIndicatorsEnabled: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 glass-surface rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:glass-button-primary"></div>
          </label>
        </div>

        {/* Disappearing Timer */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                ตัวนับเวลาลบข้อความอัตโนมัติ
              </p>
              <p className="text-xs text-[#687280]">
                กำหนดเวลาสำหรับการลบข้อความในแชทใหม่
              </p>
            </div>
          </div>

          <select
            value={securitySettings.disappearingTimerDefault}
            onChange={(e) =>
              handleUpdate({
                disappearingTimerDefault: Number(e.target.value),
              })
            }
            className="py-1.5 px-3 rounded-xl glass-surface border border-white/40 text-xs font-bold text-[#1b1b1d] cursor-pointer"
          >
            <option value={0}>ปิด (Off)</option>
            <option value={5}>5 นาที</option>
            <option value={60}>1 ชั่วโมง</option>
            <option value={1440}>24 ชั่วโมง</option>
          </select>
        </div>

        {/* Safety Fingerprint Verification */}
        <div className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between glass-surface">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                รหัสความปลอดภัยการเข้ารหัส (Safety Fingerprint)
              </p>
              <p className="text-xs font-mono text-[#76777b]">
                NF-SEC-89A1-BC94
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("รหัสความปลอดภัยเข้ารหัส E2EE ถูกต้องสมบูรณ์")}
            className="glass-button-secondary px-3.5 py-1.5 rounded-xl glass-button-primary text-xs font-bold  transition-colors cursor-pointer"
          >
            ตรวจสอบ
          </button>
        </div>
      </main>
    </div>
  );
};
