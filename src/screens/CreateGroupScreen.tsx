// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ArrowLeft, X, Search, Check, Users } from "lucide-react";
import { ScreenId, UserProfile } from "../types";
import { FirebaseService } from "../services/firebaseService";

export const CreateGroupScreen: React.FC<any> = (props) => {
  const {
    onNavigate,
    activeLanguage,
    currentUser,
    chatRoom,
    chats,
    messages,
    peerName,
  } = props || {};
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = FirebaseService.subscribeToFriends(currentUser.uid, (friends) => {
      setContacts(friends || []);
    });
    return () => unsub();
  }, [currentUser?.uid]);

  const toggleSelect = (uid: string) => {
    if (selectedIds.includes(uid)) {
      setSelectedIds(selectedIds.filter((i) => i !== uid));
    } else {
      setSelectedIds([...selectedIds, uid]);
    }
  };

  const handleCreateGroup = async () => {
    if (selectedIds.length === 0) return;
    const name = groupName.trim() || "กลุ่มสนทนาใหม่";
    const memberUids = Array.from(new Set([currentUser?.uid, ...selectedIds].filter(Boolean)));
    const groupId = "group_" + Date.now();
    const newGroupRoom = {
      id: groupId,
      type: "group" as const,
      name: name,
      members: memberUids,
      unreadCount: 0,
      lastMessage: `${currentUser?.displayName || "คุณ"} ได้สร้างกลุ่มสนทนา`,
      lastMessageAt: Date.now(),
      avatarUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200",
    };

    await FirebaseService.createChatRoom(newGroupRoom);
    if (onNavigate) onNavigate("chat_list");
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.username?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            สร้างกลุ่มสนทนาใหม่
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4 pb-24">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#7e5356] mb-1">
              ชื่อกลุ่มสนทนา
            </label>
            <input
              type="text"
              placeholder="เช่น กลุ่มเพื่อนสนิท, ทีมงาน..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full glass-surface border border-white/40 rounded-xl py-2.5 px-3.5 font-bold text-[15px] focus:ring-2 focus:ring-[#7e5356]/20 outline-none shadow-2xs"
            />
          </div>
          <div className="relative">
            <Search className="text-[#45474a]/60 w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ค้นหารายชื่อเพื่อดึงเข้ากลุ่ม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-surface border border-white/40 rounded-xl py-2.5 pl-10 pr-3.5 text-xs focus:ring-2 focus:ring-[#7e5356]/20 placeholder:text-[#45474a]/50 outline-none shadow-2xs"
            />
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
            {selectedIds.map((uid) => {
              const u = contacts.find((c) => c.uid === uid);
              return (
                <div
                  key={uid}
                  className="inline-flex items-center gap-1.5 glass-button-primary/10 px-3 py-1.5 rounded-xl border border-[#7e5356]/20 shrink-0"
                >
                  <img
                    className="w-5 h-5 rounded-full object-cover"
                    src={
                      u?.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    }
                    alt="Avatar"
                  />
                  <span className="font-th-body text-[12px] font-bold text-[#7e5356]">
                    {u?.displayName || "User"}
                  </span>
                  <X
                    className="w-3.5 h-3.5 text-[#7e5356]/70 cursor-pointer hover:text-[#7e5356]"
                    onClick={() => toggleSelect(uid)}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-2">
          <p className="font-th-body text-[12px] font-bold text-[#45474a]/70 px-1 uppercase tracking-wider">
            เลือกสมาชิก ({filteredContacts.length})
          </p>

          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 glass-surface backdrop-blur-md rounded-2xl border border-white/80 p-4">
              <Users className="w-10 h-10 mx-auto mb-2 text-[#c6c6cb]" />
              <p className="text-xs text-[#687280]">
                ยังไม่มีผู้ใช้อื่นในระบบ สามารถชวนเพื่อนผ่านไอดีได้
              </p>
            </div>
          ) : (
            filteredContacts.map((c) => (
              <div
                key={c.uid}
                onClick={() => toggleSelect(c.uid)}
                className={`group flex items-center justify-between p-3 rounded-2xl glass-surface border ${selectedIds.includes(c.uid) ? "border-[#7e5356] bg-[#ffefef]/40" : "border-white/80"} cursor-pointer glass-button-secondary transition-all shadow-2xs`}
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-11 h-11 rounded-full object-cover border border-white"
                    src={
                      c.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    }
                    alt={c.displayName}
                  />
                  <div>
                    <p className="font-th-heading text-[15px] font-bold text-[#1b1b1d]">
                      {c.displayName}
                    </p>
                    <p className="font-th-body text-[12px] text-[#45474a]/70">
                      @{c.username || "user"}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedIds.includes(c.uid) ? "glass-button-primary border-[#7e5356]" : "border-[#c6c6ca] bg-transparent"}`}
                >
                  {selectedIds.includes(c.uid) && (
                    <Check className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Floating Bottom Bar */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
        <div className="flex items-center justify-between w-full max-w-lg glass-surface backdrop-blur-[30px] px-5 py-3 rounded-2xl border border-white shadow-md pointer-events-auto">
          <div className="flex flex-col">
            <span className="font-th-body text-[10px] font-bold text-[#45474a]/70 uppercase">
              เลือกสมาชิกแล้ว
            </span>
            <span className="font-bold text-[#7e5356] text-sm">
              {selectedIds.length} รายชื่อ
            </span>
          </div>
          <button
            className="glass-button-primary disabled:opacity-40 px-6 py-2 rounded-xl text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
            disabled={selectedIds.length === 0}
            onClick={handleCreateGroup}
          >
            ยืนยันสร้างกลุ่ม
          </button>
        </div>
      </div>
    </div>
  );
};
