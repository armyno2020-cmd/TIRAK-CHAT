// @ts-nocheck
import React, { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Camera,
  Image,
  Users,
  Bell,
  MessageCircle,
  Phone,
  Settings,
} from "lucide-react";
import { ScreenId } from "../types";

export const PermissionsScreen: React.FC<any> = (props) => {
  const {
    onNavigate,
    activeLanguage,
    currentUser,
    chatRoom,
    chats,
    messages,
    peerName,
  } = props || {};
  const [perms, setPerms] = useState({
    camera: false,
    photos: true,
    contacts: false,
    notifications: true,
  });

  const toggle = (key: keyof typeof perms) =>
    setPerms({ ...perms, [key]: !perms[key] });

  return (
    <div className="bg-transparent text-[#1b1b1d] min-h-screen font-th-body overflow-x-hidden">
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            สิทธิ์การเข้าถึง
          </span>
        </div>
      </header>

      <main className="pt-32 pb-40 px-5 md:px-16 max-w-4xl mx-auto">
        <section className="mb-12 text-center md:text-left">
          <h1 className="font-th-heading text-[34px] md:text-[48px] font-bold text-[#1b1b1d] mb-4">
            Personal Control.
          </h1>
          <p className="text-[#45474a] font-th-body text-[17px] max-w-2xl mx-auto md:mx-0">
            Configure how{" "}
            <span className="font-semibold text-[#7e5356]">Newfound</span>{" "}
            interacts with your device. We prioritize your privacy through
            transparent access and crystalline data management.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-surface border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] mb-6">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">
                Camera
              </h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">
                Required for secure document verification and profile
                identification. We only access the camera during active capture
                sessions.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">
                Secure Access
              </span>
              <button
                onClick={() => toggle("camera")}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${perms.camera ? "glass-button-primary" : "bg-[#e4e2e4]"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full glass-surface shadow-sm transition-transform duration-300 ${perms.camera ? "translate-x-6" : ""}`}
                ></div>
              </button>
            </div>
          </div>

          <div className="glass-surface border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63] mb-6">
                <Image className="w-6 h-6" />
              </div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">
                Photos
              </h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">
                Allows you to upload existing identification and customize your
                professional presence. Newfound does not scan your private
                library.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">
                Limited Read
              </span>
              <button
                onClick={() => toggle("photos")}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${perms.photos ? "glass-button-primary" : "bg-[#e4e2e4]"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full glass-surface shadow-sm transition-transform duration-300 ${perms.photos ? "translate-x-6" : ""}`}
                ></div>
              </button>
            </div>
          </div>

          <div className="glass-surface border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#e0dfe4] flex items-center justify-center text-[#5d5e63] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">
                Contacts
              </h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">
                Sync your network to identify trusted collaborators and
                professional connections within the ecosystem. We never send
                unsolicited invites.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">
                Network Sync
              </span>
              <button
                onClick={() => toggle("contacts")}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${perms.contacts ? "glass-button-primary" : "bg-[#e4e2e4]"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full glass-surface shadow-sm transition-transform duration-300 ${perms.contacts ? "translate-x-6" : ""}`}
                ></div>
              </button>
            </div>
          </div>

          <div className="glass-surface border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">
                Notifications
              </h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">
                Critical alerts regarding account security, transaction status,
                and important community updates. Managed through silent delivery
                options.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">
                Real-time
              </span>
              <button
                onClick={() => toggle("notifications")}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${perms.notifications ? "glass-button-primary" : "bg-[#e4e2e4]"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full glass-surface shadow-sm transition-transform duration-300 ${perms.notifications ? "translate-x-6" : ""}`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16 p-12 rounded-[40px] bg-[#5d5e63] text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 glass-button-primary/20 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10 flex-1">
            <h2 className="font-th-heading text-[28px] font-bold mb-4">
              Privacy by Architecture
            </h2>
            <p className="text-white/80 text-[17px] leading-relaxed mb-6">
              Our "Liquid Glass" design isn't just aesthetic. It represents our
              commitment to total transparency. Your data remains encrypted
              on-device unless explicitly permitted for processing.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("contact_sync")}
                className="glass-button-secondary glass-surface text-[#5d5e63] px-8 py-3 rounded-full font-semibold  transition-colors active:scale-95"
              >
                Next Step
              </button>
            </div>
          </div>
          <div className="w-full md:w-64 h-64 rounded-[32px] overflow-hidden shadow-2xl relative z-10">
            <img
              className="rounded-[20px] shadow-sm w-full h-full object-cover"
              alt="Glass"
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600"
            />
          </div>
        </section>
      </main>

      <nav className="fixed bottom-6 left-0 right-0 w-max mx-auto z-50 flex items-center gap-6 px-8 py-3 glass-surface border border-white/10 shadow-lg rounded-full">
        <button
          onClick={() => onNavigate("chat_list")}
          className="glass-button-secondary text-[#45474a]/60 p-3 hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate("create_group")}
          className="glass-button-secondary text-[#45474a]/60 p-3 hover:scale-110 transition-transform"
        >
          <Users className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate("call_history")}
          className="glass-button-secondary text-[#45474a]/60 p-3 hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate("settings_account")}
          className="glass-button-secondary bg-[#ffefef] text-[#7e5356] p-3 rounded-full hover:scale-110 transition-transform"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
};
