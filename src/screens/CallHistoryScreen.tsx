// @ts-nocheck
import React, { useState } from "react";
import {
  Phone,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { ScreenId } from "../types";

export const CallHistoryScreen: React.FC<any> = (props) => {
  const { onNavigate, activeLanguage, currentUser } = props || {};
  const [activeTab, setActiveTab] = useState<"all" | "missed">("all");
  const [calls, setCalls] = useState<any[]>([]);

  return (
    <div className="font-th-body text-[#1b1b1d] h-full w-full overflow-hidden flex flex-col bg-transparent relative">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            ประวัติการโทร
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between glass-surface p-1.5 rounded-2xl border border-white/80 shadow-2xs w-fit">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-1.5 rounded-xl font-th-body text-[13px] font-semibold transition-all cursor-pointer ${activeTab === "all" ? "glass-button-primary shadow-xs" : "text-[#45474a]/80 glass-button-secondary"}`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setActiveTab("missed")}
            className={`px-5 py-1.5 rounded-xl font-th-body text-[13px] font-semibold transition-all cursor-pointer ${activeTab === "missed" ? "glass-button-primary shadow-xs" : "text-[#45474a]/80 glass-button-secondary"}`}
          >
            ไม่ได้รับ
          </button>
        </div>

        <div className="space-y-3">
          {calls.length === 0 ? (
            <div className="text-center py-16 glass-surface backdrop-blur-md rounded-3xl border border-white/60 p-6 shadow-2xs">
              <Phone className="w-12 h-12 mx-auto mb-3 text-[#c6c6cb]" />
              <p className="font-th-heading text-[16px] font-bold text-[#1b1b1d]">
                ยังไม่มีประวัติการโทร
              </p>
              <p className="text-[13px] text-[#76777b] mt-1">
                การโทรแบบเข้ารหัสความปลอดภัย E2EE จะแสดงประวัติที่นี่
              </p>
            </div>
          ) : (
            calls.map((item, i) => (
              <div
                key={item.id || `call-${i}`}
                className="glass-surface border border-white/80 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs glass-button-secondary transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e0dfe4] shrink-0 border border-white">
                    <img
                      className="rounded-[20px] shadow-sm w-full h-full object-cover"
                      alt="Avatar"
                      src={
                        item.peerAvatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-th-heading text-[15px] font-bold text-[#1b1b1d]">
                      {item.peerName}
                    </h3>
                    <p className="text-th-body text-[13px] text-[#45474a]/70">
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
