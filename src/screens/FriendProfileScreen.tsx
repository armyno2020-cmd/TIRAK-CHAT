import React from "react";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Video,
  ShieldCheck,
  Lock,
  Mail,
  Smartphone,
  MapPin,
  FileText,
  Link as LinkIcon,
  Ban,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { ScreenId } from "../types";

export const FriendProfileScreen: React.FC<any> = (props) => {
  const {
    onNavigate,
    activeLanguage,
    currentUser,
    chatRoom,
    chats,
    messages,
    peerName,
  } = props || {};
  return (
    <div className="bg-gradient-to-br from-[#fcf8fb] to-[#f0edef] text-[#1b1b1d] font-th-body min-h-screen overflow-x-hidden">
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            โปรไฟล์เพื่อน
          </span>
        </div>
      </header>

      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto space-y-6">
        <section className="glass-surface border border-white/40 rounded-[40px] p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/50 shadow-xl overflow-hidden mb-6">
              <img
                className="rounded-[20px] shadow-sm w-full h-full object-cover"
                alt="Friend"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              />
            </div>
            <h1 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-1 truncate px-4">
              {peerName || "เมธา สุขสันต์"}
            </h1>
            <p className="font-th-body text-[14px] text-[#45474a]/70 mb-6">
              @user_friend
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate("chat_detail")}
                className="glass-button-secondary w-14 h-14 rounded-full glass-surface border border-white/30 flex items-center justify-center text-[#5d5e63] /30 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
              </button>
              <button
                onClick={() => onNavigate && onNavigate("call_screen")}
                className="glass-button-secondary w-14 h-14 rounded-full bg-gradient-to-br from-[#7e5356] to-[#f0b9bc] flex items-center justify-center text-white shadow-lg shadow-[#7e5356]/20 active:scale-95 transition-all cursor-pointer"
              >
                <Phone className="w-6 h-6 fill-current" />
              </button>
              <button
                onClick={() => onNavigate && onNavigate("call_screen")}
                className="glass-button-secondary w-14 h-14 rounded-full glass-surface border border-white/30 flex items-center justify-center text-[#5d5e63] /30 active:scale-95 transition-all cursor-pointer"
              >
                <Video className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </section>

        <div className="glass-surface border border-white/30 rounded-[32px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-body text-[12px] font-semibold text-[#5d5e63] tracking-wider">
                สถานะความปลอดภัย
              </p>
              <p className="font-th-body text-[14px] text-[#45474a]">
                เข้ารหัสแบบ End-to-End
              </p>
            </div>
          </div>
          <Lock className="text-[#7e5356] w-6 h-6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-surface border border-white/30 rounded-[32px] p-6 space-y-4">
            <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 uppercase tracking-widest">
              ข้อมูลติดต่อ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-[#5d5e63] w-6 h-6" />
                <div>
                  <p className="font-th-body text-[14px] text-[#45474a]/60">
                    อีเมล
                  </p>
                  <p className="font-th-body text-[17px]">
                    metha.s@newfound.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Smartphone className="text-[#5d5e63] w-6 h-6" />
                <div>
                  <p className="font-th-body text-[14px] text-[#45474a]/60">
                    เบอร์โทรศัพท์
                  </p>
                  <p className="font-th-body text-[17px]">+66 81 234 5678</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-surface border border-white/30 rounded-[32px] p-6 flex flex-col justify-between">
            <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 uppercase tracking-widest">
              สถานที่ปัจจุบัน
            </h3>
            <div className="mt-4 h-24 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[#e0dfe4]/30 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <MapPin className="text-[#7e5356] w-6 h-6 mx-auto mb-1" />
                  <p className="font-th-body text-[14px] font-semibold">
                    กรุงเทพมหานคร, ไทย
                  </p>
                </div>
              </div>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400")',
                }}
              ></div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-th-heading text-[20px] font-semibold text-[#1b1b1d]">
              สื่อที่แชร์ร่วมกัน
            </h2>
            <button className="glass-button-secondary text-[#7e5356] font-th-body text-[12px] font-semibold">
              ดูทั้งหมด
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=300",
            ].map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden glass-surface border border-white/30 relative group"
              >
                <img
                  className="rounded-[20px] shadow-sm w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  alt="Shared Media"
                  src={img}
                />
                {i === 2 && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-surface border border-white/30 rounded-[32px] overflow-hidden">
          <button className="w-full px-6 py-5 flex items-center justify-between border-b border-white/10 glass-button-secondary transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl glass-button-primary/10 flex items-center justify-center text-[#7e5356]">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-th-body text-[17px]">ไฟล์เอกสาร (12)</span>
            </div>
            <ChevronRight className="text-[#45474a]/40 w-5 h-5" />
          </button>
          <button className="w-full px-6 py-5 flex items-center justify-between glass-button-secondary transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <LinkIcon className="w-5 h-5" />
              </div>
              <span className="font-th-body text-[17px]">
                ลิงก์ที่แชร์ (45)
              </span>
            </div>
            <ChevronRight className="text-[#45474a]/40 w-5 h-5" />
          </button>
        </section>

        <button className="glass-button-secondary w-full py-4 text-[#ba1a1a] font-semibold flex items-center justify-center gap-2 /5 rounded-2xl transition-colors">
          <Ban className="w-5 h-5" />
          บล็อกรายชื่อติดต่อนี้
        </button>
      </main>
    </div>
  );
};
