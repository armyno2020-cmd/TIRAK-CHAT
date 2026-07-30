import React, { useState } from "react";
import { ArrowLeft, Search, MessageCircle, Users } from "lucide-react";
import { FirebaseService } from "../services/firebaseService";

export const GlobalSearchScreen: React.FC<any> = (props) => {
  const { onNavigate, chats = [], messagesMap = {} } = props || {};
  const [query, setQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState<any[]>([]);

  const handleSearch = async (term: string) => {
    setQuery(term);
    if (!term.trim()) {
      setFoundUsers([]);
      return;
    }
    const allUsers = await FirebaseService.getAllUsers();
    const matched = allUsers.filter(
      (u) =>
        u.displayName?.toLowerCase().includes(term.toLowerCase()) ||
        u.username?.toLowerCase().includes(term.toLowerCase()),
    );
    setFoundUsers(matched);
  };

  const matchedChats = chats.filter((c: any) =>
    c.name?.toLowerCase().includes(query.toLowerCase()),
  );

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
          ค้นหาในระบบ
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4">
        <section>
          <div className="relative flex items-center glass-surface border border-white/40 rounded-xl px-3.5 py-2.5 shadow-2xs focus-within:ring-2 focus-within:ring-[#7e5356]/20">
            <Search className="text-[#7e5356] w-4 h-4 mr-2.5 shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ค้นหาข้อความ, รายชื่อ หรือผู้ใช้..."
              className="w-full bg-transparent border-none font-th-body text-[14px] text-[#1b1b1d] placeholder:text-[#45474a]/50 outline-none"
            />
          </div>
        </section>

        {query.trim() === "" ? (
          <div className="text-center py-16 text-[#76777b]">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#7e5356]" />
            <p className="font-th-heading text-sm font-bold text-[#1b1b1d]">
              พิมพ์คำค้นหาเพื่อเริ่มค้นหา
            </p>
            <p className="text-xs text-[#76777b] mt-1">
              สามารถค้นหาชื่อเพื่อน รายชื่อห้องแชท หรือผู้ใช้งานในระบบ
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-th-heading text-xs font-bold text-[#7e5356] uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <Users className="w-3.5 h-3.5" /> ผู้ใช้งานที่พบ (
                {foundUsers.length})
              </h3>
              {foundUsers.length === 0 ? (
                <p className="text-xs text-[#76777b] italic px-1">
                  ไม่พบผู้ใช้งานที่ตรงกับคำค้นหา
                </p>
              ) : (
                <div className="space-y-2">
                  {foundUsers.map((u, idx) => (
                    <div
                      key={u.uid || u.id || `user-${idx}`}
                      className="glass-surface p-3 rounded-2xl border border-white/80 shadow-2xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border border-white"
                          src={
                            u.photoURL ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                          }
                          alt="Avatar"
                        />
                        <div>
                          <p className="font-bold text-sm text-[#1b1b1d]">
                            {u.displayName}
                          </p>
                          <p className="text-xs text-[#76777b]">
                            @{u.username || "user"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate("add_friend")}
                        className="glass-button-secondary px-3 py-1.5 rounded-xl glass-button-primary font-bold text-xs  transition-colors cursor-pointer shadow-2xs"
                      >
                        เพิ่มเพื่อน
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-th-heading text-xs font-bold text-[#7e5356] uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
                <MessageCircle className="w-3.5 h-3.5" /> ห้องแชทที่พบ (
                {matchedChats.length})
              </h3>
              {matchedChats.length === 0 ? (
                <p className="text-xs text-[#76777b] italic px-1">
                  ไม่พบห้องแชทที่ตรงกับคำค้นหา
                </p>
              ) : (
                <div className="space-y-2">
                  {matchedChats.map((c: any) => (
                    <div
                      key={c.id}
                      className="glass-surface p-3 rounded-2xl border border-white/80 shadow-2xs flex items-center gap-3 cursor-pointer glass-button-secondary transition-all"
                      onClick={() => onNavigate("chat_list")}
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover border border-white"
                        src={
                          c.avatarUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                        }
                        alt="Avatar"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-[#1b1b1d]">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#76777b] line-clamp-1">
                          {c.lastMessage || "ไม่มีข้อความ"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
