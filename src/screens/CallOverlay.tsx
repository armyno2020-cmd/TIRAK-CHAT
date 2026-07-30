import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";

export const CallOverlay = ({
  peerName,
  peerAvatar,
  onEndCall,
  callType,
  onNavigate,
}: {
  peerName: string;
  peerAvatar: string;
  onEndCall: () => void;
  callType: "voice" | "video";
  onNavigate?: (screen: any) => void;
}) => {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "voice");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const toggleMic = () => {
    if (localParticipant) {
      if (isMuted) {
        localParticipant.setMicrophoneEnabled(true);
        setIsMuted(false);
      } else {
        localParticipant.setMicrophoneEnabled(false);
        setIsMuted(true);
      }
    }
  };

  const toggleVideo = () => {
    if (localParticipant) {
      if (isVideoOff) {
        localParticipant.setCameraEnabled(true);
        setIsVideoOff(false);
      } else {
        localParticipant.setCameraEnabled(false);
        setIsVideoOff(true);
      }
    }
  };

  const handleEndCall = () => {
    room?.disconnect();
    onEndCall();
  };

  return (
    <div className="absolute inset-0 z-10 liquid-bg text-[#1b1b1d] overflow-hidden flex flex-col font-th-body pointer-events-auto">
      {/* Background Video if Video is ON */}
      {!isVideoOff && callType === "video" ? (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none"></div>
      ) : null}

      {/* Header / Brand */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            NEWFOUND
          </span>
        </div>
      </header>

      {/* Call Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-5 pt-32 pb-48">
        {/* Profile Picture Section */}
        <div className="relative mb-8 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-full border-[2px] border-[#7e5356]/40 ringing-wave glass-surface"></div>
          <div
            className="absolute inset-0 rounded-full border-[1px] border-[#7e5356]/30 ringing-wave glass-surface"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border-[1px] border-[#7e5356]/20 ringing-wave glass-surface"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Main Avatar Card */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl float-animation z-10">
            <img
              className="rounded-[20px] shadow-sm w-full h-full object-cover"
              alt={peerName}
              src={peerAvatar}
            />
          </div>
        </div>

        {/* Identity & Status */}
        <div className="text-center space-y-2">
          <h1 className="font-th-heading text-2xl font-bold text-[#1b1b1d]">
            {peerName}
          </h1>
          <p className="font-th-body text-xs font-semibold text-[#5d5e63] tracking-[0.2em] uppercase call-pulse">
            กำลังโทรออก...
          </p>
        </div>

        {/* Connection Quality Indication */}
        <div className="mt-8 px-4 py-2 rounded-full glass-surface flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          <span className="text-xs font-medium text-[#45474a]">
            การเชื่อมต่อมีความปลอดภัย
          </span>
        </div>
      </main>

      {/* Interaction Hub (Liquid Controls) */}
      <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-lg px-5 z-50">
        <div className="glass-surface rounded-[40px] px-8 py-8 flex flex-col gap-10">
          {/* Control Row */}
          <div className="flex justify-between items-center px-2">
            {/* Mute */}
            <button
              className="glass-button-secondary group flex flex-col items-center gap-2 transition-all"
              onClick={toggleMic}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/20 group-active:scale-90 transition-all ${isMuted ? "bg-[#1b1b1d] text-white" : "glass-surface text-[#1b1b1d] glass-button-secondary"}`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isMuted ? "mic_off" : "mic"}
                </span>
              </div>
              <span className="font-th-body text-[10px] text-[#45474a]">
                ปิดไมค์
              </span>
            </button>

            {/* Speaker */}
            <button
              className="glass-button-secondary group flex flex-col items-center gap-2 transition-all"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/20 group-active:scale-90 transition-all ${!isSpeakerOn ? "bg-[#1b1b1d] text-white" : "glass-surface text-[#1b1b1d] glass-button-secondary"}`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isSpeakerOn ? "volume_up" : "volume_off"}
                </span>
              </div>
              <span className="font-th-body text-[10px] text-[#45474a]">
                ลำโพง
              </span>
            </button>

            {/* Video Toggle */}
            <button
              className="glass-button-secondary group flex flex-col items-center gap-2 transition-all"
              onClick={toggleVideo}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/20 group-active:scale-90 transition-all ${!isVideoOff ? "bg-[#1b1b1d] text-white" : "glass-surface text-[#1b1b1d] glass-button-secondary"}`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isVideoOff ? "videocam_off" : "videocam"}
                </span>
              </div>
              <span className="font-th-body text-[10px] text-[#45474a]">
                วิดีโอ
              </span>
            </button>

            {/* Keypad */}
            <button className="glass-button-secondary group flex flex-col items-center gap-2 transition-all">
              <div className="w-14 h-14 rounded-full flex items-center justify-center glass-surface border border-white/20 group-active:scale-90 transition-all glass-button-secondary text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[24px]">
                  apps
                </span>
              </div>
              <span className="font-th-body text-[10px] text-[#45474a]">
                แป้นพิมพ์
              </span>
            </button>
          </div>

          {/* End Call */}
          <div className="flex justify-center">
            <button
              className="glass-button-secondary w-20 h-20 rounded-full bg-[#ba1a1a] flex items-center justify-center shadow-[0_12px_24px_rgba(186,26,26,0.3)] active:scale-90 transition-all group overflow-hidden relative"
              onClick={handleEndCall}
            >
              <div className="absolute inset-0 glass-surface opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span
                className="material-symbols-outlined text-white text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call_end
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
