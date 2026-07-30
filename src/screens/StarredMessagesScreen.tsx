import React from "react";
import { ArrowLeft, Star, Search, MessageCircle } from "lucide-react";

const starred = [
  {
    id: 1,
    sender: "วิศรุต กิตติคุณ",
    content: "รหัสปลดล็อคห้องประชุมบ่ายนี้คือ 4892 นะครับ ห้ามลืม",
    time: "10:30 น.",
    date: "วันนี้",
  },
  {
    id: 2,
    sender: "Group: Design System",
    content: "ผมอัปเดตไฟล์ Liquid Glass Components.fig แล้ว เข้าไปดูได้เลย",
    time: "เมื่อวานนี้",
    date: "27 ก.ค.",
  },
  {
    id: 3,
    sender: "Maya Smith",
    content:
      "Please review the updated legal contract in the Vault before tomorrow.",
    time: "14:20 น.",
    date: "25 ก.ค.",
  },
];

export const StarredMessagesScreen: React.FC<any> = (props) => {
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
          ข้อความที่ติดดาว
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        <section className="glass-surface p-4 rounded-2xl border border-white/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 glass-button-primary/10 text-[#7e5356] rounded-xl flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="font-th-heading text-base font-bold text-[#1b1b1d]">
              รายการข้อความที่ติดดาว
            </h2>
            <p className="text-xs text-[#687280]">
              ข้อความสำคัญที่คุณบันทึกไว้สำหรับเข้าถึงแบบรวดเร็ว
            </p>
          </div>
        </section>

        <div className="space-y-3">
          {starred.map((msg) => (
            <div
              key={msg.id}
              className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs glass-button-secondary transition-all space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#1b1b1d]">
                  {msg.sender}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#687280]">
                    {msg.date} {msg.time}
                  </span>
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                </div>
              </div>
              <p className="text-xs text-[#45474a] leading-relaxed glass-surface p-3 rounded-xl border border-white/40">
                {msg.content}
              </p>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onNavigate("chat_list")}
                  className="glass-button-secondary flex items-center gap-1.5 text-xs font-bold text-[#7e5356] hover:underline cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>เปิดดูในห้องแชท</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
