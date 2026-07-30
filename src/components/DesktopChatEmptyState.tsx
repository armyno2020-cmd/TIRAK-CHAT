import React from "react";
import {
  ShieldCheck,
  MessageSquare,
  UserPlus,
  Users,
  QrCode,
  Lock,
  PhoneCall,
} from "lucide-react";
import { ScreenId } from "../types";

interface DesktopChatEmptyStateProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DesktopChatEmptyState: React.FC<DesktopChatEmptyStateProps> = ({
  onNavigate,
}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center glass-surface relative overflow-hidden select-none">
      {/* Decorative ambient glass light circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ffefef]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#e3e2e7]/40 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full z-10 flex flex-col items-center">
        {/* Brand Icon Emblem */}
        <div className="w-24 h-24 rounded-3xl glass-surface flex items-center justify-center shadow-xl border border-white/80 mb-6 bg-gradient-to-br from-white/80 to-[#f0edef]/60 relative group">
          <MessageSquare className="w-12 h-12 text-[#7e5356] transition-transform duration-300 group-hover:scale-110" />
          <div
            className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-white shadow-xs"
            title="E2EE Active"
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-th-heading text-2xl lg:text-3xl font-extrabold text-[#1b1b1d] mb-2 tracking-tight">
          TIRAK CHAT Desktop
        </h1>

        <p className="font-th-body text-sm text-[#45474a] leading-relaxed mb-6 max-w-sm">
          เลือกรายการแชทจากเมนูด้านซ้าย
          หรือเริ่มต้นส่งข้อความแบบเข้ารหัสปลอดภัยต้นทางถึงปลายทาง (End-to-End
          Encryption)
        </p>

        {/* Security Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-emerald-500/30 text-emerald-800 text-xs font-bold mb-8 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>ระบบเข้ารหัสข้อมูล E2EE ระดับสากล</span>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          <div className="glass-surface p-3 rounded-2xl border border-white/60 flex flex-col items-center text-center">
            <Lock className="w-5 h-5 text-[#7e5356] mb-1.5" />
            <span className="font-th-heading text-[12px] font-bold text-[#1b1b1d]">
              ส่วนตัวสูงสุด
            </span>
            <span className="font-th-body text-[10px] text-[#45474a]">
              ไร้โฆษณาแทรก
            </span>
          </div>

          <div className="glass-surface p-3 rounded-2xl border border-white/60 flex flex-col items-center text-center">
            <PhoneCall className="w-5 h-5 text-[#7e5356] mb-1.5" />
            <span className="font-th-heading text-[12px] font-bold text-[#1b1b1d]">
              โทรคมชัด
            </span>
            <span className="font-th-body text-[10px] text-[#45474a]">
              เสียง & วิดีโอ
            </span>
          </div>

          <div className="glass-surface p-3 rounded-2xl border border-white/60 flex flex-col items-center text-center">
            <ShieldCheck className="w-5 h-5 text-[#7e5356] mb-1.5" />
            <span className="font-th-heading text-[12px] font-bold text-[#1b1b1d]">
              ความเร็วสูง
            </span>
            <span className="font-th-body text-[10px] text-[#45474a]">
              ส่งไฟล์ไร้ขีดจำกัด
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={() => onNavigate("add_friend")}
            className="glass-button-secondary flex items-center gap-2 px-4 py-2.5 rounded-full glass-button-primary text-xs font-bold font-th-body shadow-md  active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>เพิ่มเพื่อนใหม่</span>
          </button>

          <button
            onClick={() => onNavigate("create_group")}
            className="glass-button-secondary flex items-center gap-2 px-4 py-2.5 rounded-full glass-surface text-[#1b1b1d] text-xs font-bold font-th-body border border-white/80 glass-button-secondary active:scale-95 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#7e5356]" />
            <span>สร้างกลุ่มแชท</span>
          </button>

          <button
            onClick={() => onNavigate("my_qrcode")}
            className="glass-button-secondary flex items-center gap-2 px-4 py-2.5 rounded-full glass-surface text-[#1b1b1d] text-xs font-bold font-th-body border border-white/80 glass-button-secondary active:scale-95 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#7e5356]" />
            <span>สแกน QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
