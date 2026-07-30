// @ts-nocheck
import React, { useState } from "react";
import { ArrowLeft, UserPlus, Search, ShieldAlert, Shield } from "lucide-react";

export const BlockedContactsScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  const [blockedList, setBlockedList] = useState<any[]>([]);

  const unblock = (id: number) => {
    setBlockedList(blockedList.filter((b) => b.id !== id));
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center justify-between w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("settings_privacy")}
            className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            รายชื่อที่ถูกบล็อก
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        <div className="space-y-3">
          {blockedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 glass-surface backdrop-blur-md rounded-2xl border border-white/80 p-6 text-center">
              <ShieldAlert className="w-10 h-10 text-[#7e5356] opacity-40 mb-2" />
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                ไม่มีผู้ติดต่อที่ถูกบล็อกในขณะนี้
              </p>
              <p className="text-xs text-[#687280] mt-1">
                ผู้ที่คุณบล็อกจะไม่สามารถส่งข้อความหรือโทรหาคุณได้
              </p>
            </div>
          ) : (
            blockedList.map((b) => (
              <div
                key={b.id}
                className="glass-surface border border-white/80 p-3 rounded-2xl flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-white"
                    alt="Profile"
                    src={b.img}
                  />
                  <div>
                    <h3 className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                      {b.name}
                    </h3>
                    <p className="text-xs text-[#687280]">{b.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => unblock(b.id)}
                  className="glass-button-secondary px-3 py-1.5 rounded-xl border border-white/40 text-[#45474a] font-bold text-xs glass-button-secondary transition-colors cursor-pointer"
                >
                  ปลดบล็อก
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 glass-surface rounded-2xl border border-white/80 shadow-2xs flex items-start gap-3">
          <Shield className="text-[#7e5356] w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs text-[#45474a] leading-relaxed">
            <h4 className="font-bold text-[#1b1b1d] mb-0.5">
              การคุ้มครองความเป็นส่วนตัว
            </h4>
            เมื่อคุณบล็อกผู้ติดต่อ พวกเขาจะไม่สามารถเห็นสถานะออนไลน์ของคุณ
            หรือส่งข้อความหาคุณได้ ข้อมูลของคุณปลอดภัยและได้รับการปกป้องอยู่เสมอ
          </div>
        </div>
      </main>
    </div>
  );
};
