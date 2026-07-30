import React, { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { GroupCallLayout } from "./GroupCallLayout";

interface CallScreenProps {
  activeLanguage: Language;
  peerName: string;
  peerAvatar: string;
  callType: "voice" | "video";
  callId: string;
  currentUser: any;
  onNavigate: (screen: ScreenId) => void;
  onEndCall: () => void;
}

export const CallScreen: React.FC<CallScreenProps> = ({
  activeLanguage,
  peerName,
  peerAvatar,
  callType,
  callId,
  currentUser,
  onNavigate,
  onEndCall,
}) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: callId,
            participantName: currentUser.displayName,
            participantId: currentUser.uid,
          }),
        });
        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    if (callId && currentUser) {
      fetchToken();
    }
  }, [callId, currentUser]);

  const serverUrl =
    (import.meta as any).env.VITE_LIVEKIT_URL ||
    "wss://tirak-chat-p7g1iml3.livekit.cloud";

  if (!token) {
    return (
      <div className="fixed inset-0 z-50 liquid-bg text-[#1b1b1d] min-h-screen overflow-hidden flex flex-col font-th-body">
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
            {/* Animated Ring (Outgoing Audio Feedback) */}
            <div className="absolute inset-0 rounded-full border-[2px] border-[#7e5356]/40 ringing-wave glass-surface backdrop-blur-md"></div>
            <div
              className="absolute inset-0 rounded-full border-[1px] border-[#7e5356]/30 ringing-wave glass-surface backdrop-blur-md"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-[1px] border-[#7e5356]/20 ringing-wave glass-surface backdrop-blur-md"
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
            <h1 className="font-th-heading text-3xl font-bold text-[#1b1b1d] tracking-tight">
              {peerName}
            </h1>
            <p className="font-th-body text-[12px] font-semibold text-[#5d5e63] tracking-[0.2em] uppercase call-pulse">
              กำลังเชื่อมต่อ...
            </p>
          </div>

          {/* Connection Quality Indication */}
          <div className="mt-8 px-4 py-2 rounded-full glass-surface backdrop-blur-md border border-white/20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            <span className="text-xs font-medium text-[#45474a]">
              การเชื่อมต่อมีความปลอดภัย
            </span>
          </div>
        </main>

        {/* Interaction Hub (Liquid Controls) */}
        <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-lg px-5 z-50">
          <div className="glass-surface backdrop-blur-md border border-white/20 rounded-[40px] px-8 py-8 flex flex-col gap-10">
            {/* Control Row */}
            <div className="flex justify-between items-center px-2">
              <button className="glass-button-secondary group flex flex-col items-center gap-2 transition-all">
                <div className="w-14 h-14 rounded-full flex items-center justify-center glass-surface border border-white/20 group-active:scale-90 transition-all glass-button-secondary">
                  <span
                    className="material-symbols-outlined text-[#1b1b1d]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    mic_off
                  </span>
                </div>
                <span className="font-th-body text-[10px] font-semibold text-[#45474a]">
                  ปิดไมค์
                </span>
              </button>
              <button className="glass-button-secondary group flex flex-col items-center gap-2 transition-all">
                <div className="w-14 h-14 rounded-full flex items-center justify-center glass-surface border border-white/20 group-active:scale-90 transition-all glass-button-secondary">
                  <span
                    className="material-symbols-outlined text-[#1b1b1d]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    volume_up
                  </span>
                </div>
                <span className="font-th-body text-[10px] font-semibold text-[#45474a]">
                  ลำโพง
                </span>
              </button>
              <button className="glass-button-secondary group flex flex-col items-center gap-2 transition-all">
                <div className="w-14 h-14 rounded-full flex items-center justify-center glass-surface border border-white/20 group-active:scale-90 transition-all glass-button-secondary">
                  <span
                    className="material-symbols-outlined text-[#1b1b1d]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    videocam
                  </span>
                </div>
                <span className="font-th-body text-[10px] font-semibold text-[#45474a]">
                  วิดีโอ
                </span>
              </button>
            </div>
            {/* End Call (Primary Action) */}
            <div className="flex justify-center">
              <button
                className="glass-button-secondary w-20 h-20 rounded-full bg-[#ba1a1a] flex items-center justify-center shadow-[0_12px_24px_rgba(186,26,26,0.3)] active:scale-90 transition-all group overflow-hidden relative"
                onClick={onEndCall}
              >
                <div className="absolute inset-0 glass-surface opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span
                  className="material-symbols-outlined text-white text-3xl"
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
  }

  return (
    <LiveKitRoom
      video={callType === "video"}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{
        height: "100dvh",
        width: "100vw",
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "#1b1b1d",
      }}
      onDisconnected={onEndCall}
    >
      <RoomAudioRenderer />
      <GroupCallLayout onEndCall={onEndCall} peerName={peerName} />
    </LiveKitRoom>
  );
};
