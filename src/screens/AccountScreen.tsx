import React from "react";
import {
  ArrowLeft,
  User,
  Shield,
  Lock,
  Smartphone,
  Database,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { ScreenId } from "../types";

export const AccountScreen: React.FC<any> = (props) => {
  const { onNavigate, activeLanguage, currentUser, onLogout } = props || {};
  return (
    <div className="bg-transparent h-full w-full overflow-y-auto flex flex-col font-th-body text-[#1b1b1d] relative">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            บัญชีและการตั้งค่า
          </span>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-6">
        <section className="mb-2">
          <div className="flex items-center gap-4 p-4 rounded-3xl glass-surface border border-white/80 shadow-xs mb-4">
            <img
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs"
              src={
                currentUser?.photoURL ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              }
              alt="Avatar"
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-th-heading text-xl font-bold text-[#1b1b1d] truncate">
                {currentUser?.displayName || "ผู้ใช้งาน TIRAK"}
              </h2>
              <p className="text-[#45474a] font-th-body text-xs mt-0.5">
                @{currentUser?.username || "user"} •{" "}
                {currentUser?.phoneNumber || "ยืนยันตัวตนแล้ว"}
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          <div
            onClick={() => onNavigate("profile_setup")}
            className="glass-surface p-4 rounded-2xl flex items-center justify-between cursor-pointer glass-button-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7]/80 border border-white/50 flex items-center justify-center text-[#5d5e63] shadow-inner">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">โปรไฟล์</h3>
                <p className="text-[#45474a] text-[14px]">
                  รูปภาพ ชื่อ และคำอธิบาย
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate("permissions")}
            className="glass-surface p-4 rounded-2xl flex items-center justify-between cursor-pointer glass-button-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ffefef]/80 border border-white/50 flex items-center justify-center text-[#7e5356] shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">ความเป็นส่วนตัว</h3>
                <p className="text-[#45474a] text-[14px]">
                  สิทธิ์การเข้าถึงและข้อมูล
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate("two_step_verification")}
            className="glass-surface p-4 rounded-2xl flex items-center justify-between cursor-pointer glass-button-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e3e2e7]/80 border border-white/50 flex items-center justify-center text-[#1a1b1f] shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">ความปลอดภัย</h3>
                <p className="text-[#45474a] text-[14px]">
                  การยืนยันแบบสองขั้นตอน
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate("data_usage")}
            className="glass-surface p-4 rounded-2xl flex items-center justify-between cursor-pointer glass-button-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7]/80 border border-white/50 flex items-center justify-center text-[#5d5e63] shadow-inner">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">
                  การใช้งานข้อมูล (Premium)
                </h3>
                <p className="text-[#45474a] text-[14px]">
                  เครือข่ายและพื้นที่เก็บข้อมูล
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate("report_feedback")}
            className="glass-surface p-4 rounded-2xl flex items-center justify-between cursor-pointer glass-button-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7]/80 border border-white/50 flex items-center justify-center text-[#5d5e63] shadow-inner">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">รายงานและข้อเสนอแนะ</h3>
                <p className="text-[#45474a] text-[14px]">ติดต่อทีมสนับสนุน</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pb-10">
          <button
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else if (onNavigate) {
                onNavigate("welcome");
              }
            }}
            className="glass-button-secondary w-full flex items-center justify-center gap-2 py-4 text-[#ba1a1a] font-bold text-[17px] rounded-full transition-colors active:scale-95 cursor-pointer glass-surface"
          >
            <LogOut className="w-5 h-5" /> ออกจากระบบ
          </button>
        </div>
      </main>
    </div>
  );
};
