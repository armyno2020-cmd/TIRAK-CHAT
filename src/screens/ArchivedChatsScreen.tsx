import React from "react";
import { ArrowLeft, Archive, Search } from "lucide-react";

export const ArchivedChatsScreen: React.FC<any> = (props) => {
  const { onNavigate, chats = [] } = props || {};
  const archivedChats = chats.filter((c: any) => c.isArchived);

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate && onNavigate("chat_list")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          แชทที่เก็บถาวร
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        <div className="space-y-3">
          {archivedChats.length === 0 ? (
            <div className="text-center py-16 glass-surface backdrop-blur-md rounded-2xl border border-white/80 p-6">
              <Archive className="w-10 h-10 mx-auto mb-2 text-[#7e5356] opacity-50" />
              <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                ไม่มีแชทที่เก็บถาวร
              </p>
              <p className="text-xs text-[#687280] mt-1">
                แชทที่คุณย้ายเข้าจดหมายเหตุจะแสดงผลในหน้านี้
              </p>
            </div>
          ) : (
            archivedChats.map((c: any) => (
              <div
                key={c.id}
                className="glass-surface border border-white/80 rounded-2xl p-3 flex items-center gap-3 transition-all glass-button-secondary cursor-pointer shadow-2xs"
                onClick={() => onNavigate("chat_list")}
              >
                <img
                  className="w-11 h-11 rounded-full object-cover border border-white shrink-0"
                  src={
                    c.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  }
                  alt="Avatar"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#687280] truncate">
                    {c.lastMessage || "ไม่มีข้อความ"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
