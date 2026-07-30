import React from "react";
import { CallSession } from "../services/firebaseService";

interface IncomingCallModalProps {
  call: CallSession | null;
  onAccept: () => void;
  onReject: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  call,
  onAccept,
  onReject,
}) => {
  if (!call) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent text-[#1b1b1d] overflow-hidden flex flex-col font-th-body pointer-events-auto">
      {/* Immersive Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf8fb]/30 to-[#f6f3f5]/80"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex flex-col items-center justify-between h-full py-20 px-5">
        {/* Top Branding Section */}
        <header className="w-full flex flex-col items-center space-y-2 opacity-80">
          <h1 className="font-th-heading text-xl tracking-widest text-[#5d5e63] uppercase">
            <span
              style={{
                color: "rgb(27, 27, 29)",
                fontFamily: 'Prompt, Kanit, "Plus Jakarta Sans", sans-serif',
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                textTransform: "none",
                backgroundColor: "rgba(255, 255, 255, 0.45)",
              }}
            >
              Tirak Chat
            </span>
          </h1>
          <div className="flex items-center space-x-2 text-[#45474a]">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="font-th-body text-[12px] font-semibold tracking-wider">
              End-to-end Encrypted
            </span>
          </div>
        </header>

        {/* Contact Focus Section */}
        <section className="flex flex-col items-center justify-center space-y-8 w-full max-w-sm">
          {/* Contact Image with Liquid Glass Border and Audio Waves */}
          <div className="relative p-2 rounded-full float-animation">
            {/* Audio Feedback Waves */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
              <div className="w-full h-full relative">
                <div className="ring-wave ring-wave-1"></div>
                <div className="ring-wave ring-wave-2"></div>
                <div className="ring-wave ring-wave-3"></div>
              </div>
            </div>

            <div className="absolute inset-0 glass-surface blur-2xl rounded-full pulse-animation"></div>

            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-white/40 to-white/10 ring-1 ring-white/30 overflow-hidden shadow-[0_0_40px_rgba(126,83,86,0.15)] backdrop-blur-md">
              <img
                className="w-full h-full object-cover rounded-full"
                alt={call.callerName}
                src={call.callerAvatar}
              />
            </div>
          </div>

          {/* Contact Text Information */}
          <div className="text-center space-y-3">
            <h2 className="font-th-heading text-3xl font-bold text-[#1b1b1d] tracking-tight">
              {call.callerName}
            </h2>
            <div className="flex items-center justify-center space-y-1 flex-col">
              <p className="font-th-heading text-xl text-[#7e5356] opacity-80 pulse-animation">
                {call.type === "video"
                  ? "สายเรียกเข้าวิดีโอ..."
                  : "สายเรียกเข้า..."}
              </p>
              <p className="font-th-body text-[12px] font-semibold tracking-[0.2em] text-[#5d5e63] pt-2">
                <span
                  style={{
                    color: "rgb(27, 27, 29)",
                    fontFamily:
                      'Prompt, Kanit, "Plus Jakarta Sans", sans-serif',
                    fontSize: "20px",
                    letterSpacing: "-0.5px",
                    textAlign: "start",
                    backgroundColor: "rgba(255, 255, 255, 0.45)",
                  }}
                >
                  Tirak Chat
                </span>
                &nbsp;CALL
              </p>
            </div>
          </div>
        </section>

        {/* Interaction Layer (Action Buttons) */}
        <section className="w-full max-w-md px-4 flex justify-between items-end pb-10">
          {/* Decline Button Container */}
          <div className="flex flex-col items-center space-y-4">
            <button
              className="glass-button-secondary group relative w-20 h-20 flex items-center justify-center rounded-full liquid-glass bg-[#FF3B30]/10 border border-[#FF3B30]/30 active:scale-90 transition-all duration-300"
              onClick={onReject}
            >
              <div className="absolute inset-0 bg-[#FF3B30]/5 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span
                className="material-symbols-outlined text-[#FF3B30] text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call_end
              </span>
            </button>
            <span className="font-th-body text-[12px] font-semibold text-[#45474a]">
              ปฏิเสธ
            </span>
          </div>

          {/* Message Quick Action (Floating Middle) */}
          <div className="flex flex-col items-center space-y-4 mb-4">
            <button className="glass-button-secondary w-12 h-12 flex items-center justify-center rounded-full bg-[#eae7ea]/60 backdrop-blur-md text-[#45474a] transition-colors active:scale-95">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                chat_bubble
              </span>
            </button>
            <span className="font-th-body text-[10px] uppercase tracking-wider text-[#45474a]/60">
              ข้อความ
            </span>
          </div>

          {/* Accept Button Container */}
          <div className="flex flex-col items-center space-y-4">
            <button
              className="glass-button-secondary group relative w-20 h-20 flex items-center justify-center rounded-full liquid-glass bg-[#34C759]/10 border border-[#34C759]/30 active:scale-90 transition-all duration-300"
              onClick={onAccept}
            >
              <div className="absolute inset-0 bg-[#34C759]/10 rounded-full scale-125 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-[#34C759]/5 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span
                className="material-symbols-outlined text-[#34C759] text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
              <div
                className="absolute inset-0 rounded-full bg-[#34C759]/20 ring-2 ring-[#34C759]/30"
                style={{
                  animation:
                    "ripple-out 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              ></div>
            </button>
            <span className="font-th-body text-[12px] font-semibold text-[#45474a]">
              รับสาย
            </span>
          </div>
        </section>
      </main>

      {/* Subtle Ambient Audio/Haptic Overlay (Visual) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7e5356]/20 to-transparent opacity-50 pulse-animation"></div>
    </div>
  );
};
