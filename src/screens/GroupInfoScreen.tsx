import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Crown,
  UserPlus,
  Phone,
  Video,
  LogOut,
  Share2,
  Shield,
} from "lucide-react";
import { ChatRoom, Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface GroupInfoScreenProps {
  activeLanguage: Language;
  chatRoom: ChatRoom;
  onNavigate: (screen: ScreenId) => void;
  onStartCall: (type: "voice" | "video") => void;
}

export const GroupInfoScreen: React.FC<GroupInfoScreenProps> = ({
  activeLanguage,
  chatRoom,
  onNavigate,
  onStartCall,
}) => {
  const membersList: any[] = [];

  return (
    <div className="min-h-screen bg-transparent liquid-bg flex flex-col justify-between p-4 md:p-8 relative overflow-hidden font-th-body">
      {/* Background Atmospheric Element */}
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#ffefef]/60 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] -left-[5%] w-[350px] h-[350px] rounded-full bg-[#f2f2f7]/60 blur-[100px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_detail")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ข้อมูลกลุ่ม
          </span>
        </div>
      </header>

      {/* Main Card Canvas */}
      <main className="max-w-5xl mx-auto w-full my-auto py-12 flex justify-center z-10">
        <div
          className="glass-surface w-full max-w-md rounded-3xl p-8 md:p-10 flex flex-col shadow-lg border border-white/80 floating-element"
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        >
          {/* Group Card Header */}
          <div className="text-center flex flex-col items-center mb-6">
            <img
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-lg mb-4"
              src={chatRoom.avatarUrl}
              alt={chatRoom.name}
            />
            <h3 className="font-th-heading text-2xl font-extrabold text-[#1b1b1d]">
              {chatRoom.name}
            </h3>
            <p className="font-th-body text-xs text-[#687280] mt-2 max-w-xs">
              {chatRoom.description || "Secure E2EE Community Channel"}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <button
                onClick={() => onStartCall("voice")}
                className="glass-button-secondary flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl glass-button-primary text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Voice</span>
              </button>
              <button
                onClick={() => onStartCall("video")}
                className="glass-button-secondary flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl glass-surface text-[#1b1b1d] text-xs font-bold border border-white/80 shadow-sm active:scale-95 transition-all glass-button-secondary"
              >
                <Video className="w-4 h-4 text-[#7e5356]" />
                <span>Video</span>
              </button>
              <button
                onClick={() => alert("Invite link copied to clipboard")}
                className="glass-button-secondary p-2.5 rounded-2xl glass-surface text-[#333333] glass-button-secondary active:scale-95 border border-white/80 shadow-sm"
                title="Share Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Member Section */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-[#1b1b1d] font-th-heading">
                {membersList.length}{" "}
                {getTranslation(activeLanguage, "members") || "สมาชิก"}
              </span>
              <button className="glass-button-secondary text-xs font-bold text-[#7e5356] flex items-center space-x-1 hover:underline">
                <UserPlus className="w-4 h-4" />
                <span>เพิ่มสมาชิก</span>
              </button>
            </div>

            <div className="glass-surface rounded-3xl border border-[#c6c6ca]/50 p-2 divide-y divide-[#c6c6ca]/30 max-h-48 overflow-y-auto custom-scrollbar text-left">
              {membersList.length === 0 ? (
                <p className="text-sm text-center text-[#45474a] py-4">
                  ไม่พบสมาชิก
                </p>
              ) : (
                membersList.map((m) => {
                  const isOwner = m.uid === chatRoom.ownerId;
                  const isAdmin = chatRoom.adminIds?.includes(m.uid);
                  return (
                    <div
                      key={m.uid}
                      className="p-3 flex items-center justify-between glass-button-secondary transition-colors rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-10 h-10 rounded-2xl object-cover ring-2 ring-white"
                          src={m.photoURL}
                          alt={m.displayName}
                        />
                        <div>
                          <p className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                            {m.displayName}
                          </p>
                          <p className="text-[10px] text-[#76777b]">
                            @{m.username}
                          </p>
                        </div>
                      </div>
                      {isOwner ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                          <Crown className="w-3 h-3 mr-0.5" /> Owner
                        </span>
                      ) : isAdmin ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold glass-button-primary/10 text-[#7e5356] border border-[#7e5356]/20">
                          <Shield className="w-3 h-3 mr-0.5" /> Admin
                        </span>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Leave Group Danger Zone */}
          <button
            onClick={() => {
              alert("You have left the group.");
              onNavigate("chat_list");
            }}
            className="w-full py-4 rounded-full glass-surface text-rose-600 font-th-heading font-bold text-base border border-rose-200/50 flex items-center justify-center space-x-2 glass-button-secondary transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากการสนทนากลุ่ม</span>
          </button>
        </div>
      </main>

      {/* Footer Space for Balance */}
      <footer className="w-full max-w-5xl mx-auto pt-6 opacity-0 pointer-events-none">
        <div className="h-6"></div>
      </footer>
    </div>
  );
};
