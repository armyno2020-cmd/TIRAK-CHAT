import React from "react";
import { ArrowLeft, Smartphone, Plus, Monitor } from "lucide-react";

export const LinkedDevicesScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate && onNavigate("settings_account")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          อุปกรณ์ที่เชื่อมต่อ
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4">
        <div className="glass-surface p-6 rounded-2xl border border-white/80 shadow-2xs text-center flex flex-col items-center">
          <div className="w-16 h-16 glass-button-primary/10 text-[#7e5356] rounded-full flex items-center justify-center mb-3">
            <Monitor className="w-8 h-8" />
          </div>
          <h2 className="font-th-heading text-lg font-bold text-[#1b1b1d] mb-1">
            อุปกรณ์ที่เข้าสู่ระบบไว้
          </h2>
          <p className="text-xs text-[#687280] leading-relaxed max-w-md mb-4">
            เข้าถึงข้อความของคุณได้ทุกอุปกรณ์ ทั้งเว็บบราวเซอร์ แท็บเล็ต
            และคอมพิวเตอร์
          </p>
          <button
            onClick={() => onNavigate("qr_scanner")}
            className="glass-button-secondary glass-button-primary px-5 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-98 cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>เชื่อมต่ออุปกรณ์ใหม่</span>
          </button>
        </div>

        <section className="glass-surface border border-white/80 rounded-2xl p-4 shadow-2xs space-y-3">
          <h3 className="font-th-heading text-xs font-bold text-[#7e5356] uppercase tracking-wider">
            อุปกรณ์ปัจจุบัน
          </h3>
          <div className="flex items-center gap-3 p-2 glass-surface rounded-xl border border-white/40">
            <div className="w-10 h-10 rounded-xl glass-button-primary/10 flex items-center justify-center text-[#7e5356] shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-[#1b1b1d]">
                iPhone 15 Pro (เครื่องนี้)
              </p>
              <p className="text-xs text-[#687280]">
                แอป Tirak Chat • กำลังใช้งานอยู่
              </p>
            </div>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
          </div>
        </section>
      </main>
    </div>
  );
};
