import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import {
  useTracks,
  useLocalParticipant,
  ParticipantTile,
  useDataChannel,
  useRoomContext,
  useParticipants,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";
import { Track } from "livekit-client";

const RingingTone = () => {
  const participants = useParticipants();
  // If there's only 1 participant (the local user), play ringing tone
  if (participants.length <= 1) {
    return (
      <audio
        src="https://actions.google.com/sounds/v1/alarms/phone_ringing.ogg"
        autoPlay
        loop
        hidden
      />
    );
  }
  return null;
};

export const GroupCallLayout = ({
  onEndCall,
  peerName,
  onNavigate,
}: {
  onEndCall: () => void;
  peerName: string;
  onNavigate?: (screen: any) => void;
}) => {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();

  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");

  const [duration, setDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const { send } = useDataChannel("chat", (msg) => {
    if (msg.payload) {
      const text = new TextDecoder().decode(msg.payload);
      try {
        const data = JSON.parse(text);
        setMessages((prev) => [
          ...prev,
          {
            sender: msg.from?.name || msg.from?.identity || "ผู้เข้าร่วม",
            text: data.text,
            image: data.image,
            isSelf: false,
          },
        ]);
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          {
            sender: msg.from?.name || msg.from?.identity || "ผู้เข้าร่วม",
            text,
            isSelf: false,
          },
        ]);
      }
    }
  });

  const sendMessage = (text: string = chatInput, image?: string) => {
    if (!text.trim() && !image) return;

    const payload = JSON.stringify({ text, image });
    const data = new TextEncoder().encode(payload);

    send(data, { reliable: true });
    setMessages((prev) => [
      ...prev,
      {
        sender: localParticipant?.name || "คุณ",
        text,
        image,
        isSelf: true,
      },
    ]);
    setChatInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      sendMessage("", base64String);
    };
    reader.readAsDataURL(file);
  };

  const toggleMic = async () => {
    if (isMuted) {
      await room.localParticipant.setMicrophoneEnabled(true);
      setIsMuted(false);
    } else {
      await room.localParticipant.setMicrophoneEnabled(false);
      setIsMuted(true);
    }
  };

  const toggleVideo = async () => {
    if (isVideoOff) {
      await room.localParticipant.setCameraEnabled(true);
      setIsVideoOff(false);
    } else {
      await room.localParticipant.setCameraEnabled(false);
      setIsVideoOff(true);
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      await room.localParticipant.setScreenShareEnabled(false);
      setIsScreenSharing(false);
    } else {
      await room.localParticipant.setScreenShareEnabled(true);
      setIsScreenSharing(true);
    }
  };

  const handleEndCall = () => {
    room.disconnect();
    onEndCall();
  };

  return (
    <>
      <RingingTone />
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 bg-transparent"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(99, 60, 63, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(69, 71, 75, 0.05) 0%, transparent 50%)",
        }}
      ></div>
      <div className="w-full h-screen relative overflow-hidden bg-transparent flex flex-col font-th-body">
        {/* TopAppBar */}
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

        {/* Video Grid Area */}
        <div className="flex-1 mt-16 p-4 overflow-y-auto pb-24 relative">
          <div
            className={`grid h-full gap-3 ${isScreenSharing ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}
          >
            {tracks.map((track, idx) => {
              const isMain =
                isScreenSharing && track.source === Track.Source.ScreenShare;
              const isScreenShare = track.source === Track.Source.ScreenShare;
              return (
                <div
                  key={`${track.participant.identity}-${idx}`}
                  className={`relative overflow-hidden rounded-2xl bg-[#dcd9dc] flex items-center justify-center ${isMain ? "col-span-2 row-span-1 md:col-span-1 md:row-span-2" : ""}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <ParticipantTile
                    trackRef={track}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-2xl"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <span className="font-th-body text-sm text-white drop-shadow-sm">
                        {track.participant.name || "ผู้เข้าร่วม"}{" "}
                        {track.participant.isLocal ? "(คุณ)" : ""}{" "}
                        {isScreenShare ? "(กำลังแชร์หน้าจอ)" : ""}
                      </span>
                    </div>
                  </div>
                  {!track.participant.isMicrophoneEnabled && (
                    <div className="absolute top-3 right-3 bg-[#ba1a1a]/90 backdrop-blur-sm p-1.5 rounded-full">
                      <span
                        className="material-symbols-outlined text-[16px] text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        mic_off
                      </span>
                    </div>
                  )}
                  {/* Audio Feedback Pulse for local */}
                  {track.participant.isLocal && !isMuted && (
                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full animate-pulse-ring z-10 pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Group Chat Overlay */}
        {showChat && (
          <div className="absolute bottom-[104px] left-4 right-4 z-40 glass-surface border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(99,60,63,0.1)] p-4 max-h-[300px] flex flex-col chat-overlay-enter">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#e4e2e4]">
              <h3 className="font-th-heading text-[16px] font-semibold text-[#633c3f]">
                แชทกลุ่ม
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="glass-button-secondary text-[#504444] hover:text-[#633c3f]"
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  close
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="font-th-body text-[11px] font-semibold text-[#504444] ml-2">
                    {msg.sender}
                  </span>
                  <div
                    className={`px-3 py-2 rounded-2xl rounded-tl-sm w-fit max-w-[85%] ${msg.isSelf ? "bg-[#633c3f] text-[#ffcccf] self-end" : "bg-[#eae7ea] text-[#1b1b1d]"}`}
                  >
                    {msg.image && (
                      <img
                        className="rounded-lg mb-2 max-w-full h-auto"
                        src={msg.image}
                        alt="attachment"
                      />
                    )}
                    {msg.text && (
                      <p className="font-th-body text-sm">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="mt-3 relative flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="glass-button-secondary text-[#504444] hover:text-[#633c3f] p-2 glass-surface rounded-full"
              >
                <span className="material-symbols-outlined text-[20px]">
                  image
                </span>
              </button>
              <div className="relative flex-1">
                <input
                  className="w-full glass-surface rounded-full py-2.5 pl-4 pr-10 text-sm border-none focus:ring-1 focus:ring-[#633c3f] text-[#1b1b1d] placeholder:text-[#504444]"
                  placeholder="พิมพ์ข้อความ..."
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={() => sendMessage(chatInput)}
                  className="glass-button-secondary absolute right-2 top-1/2 -translate-y-1/2 text-[#633c3f] p-1"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50">
          <div
            className="rounded-[2rem] p-4 flex justify-between items-center glass-surface/60 backdrop-blur-md shadow-[0_8px_32px_rgba(99,60,63,0.15)]"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Mute Mic */}
            <button
              className="glass-button-secondary flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-300 group"
              onClick={toggleMic}
            >
              <div
                className={`w-12 h-12 rounded-full border border-white/60 flex items-center justify-center shadow-sm transition-colors ${isMuted ? "glass-surface" : "glass-surface group-glass-button-secondary"}`}
              >
                <span
                  className="material-symbols-outlined text-[#504444]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {isMuted ? "mic_off" : "mic"}
                </span>
              </div>
              <span className="font-th-body text-[10px] font-semibold text-[#504444]">
                ปิดไมค์
              </span>
            </button>

            {/* Toggle Camera */}
            <button
              className="glass-button-secondary flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-300 group"
              onClick={toggleVideo}
            >
              <div
                className={`w-12 h-12 rounded-full border border-white/60 flex items-center justify-center shadow-sm transition-colors ${isVideoOff ? "glass-surface" : "glass-surface group-glass-button-secondary"}`}
              >
                <span
                  className="material-symbols-outlined text-[#504444]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {isVideoOff ? "videocam_off" : "videocam"}
                </span>
              </div>
              <span className="font-th-body text-[10px] font-semibold text-[#504444]">
                เปิดกล้อง
              </span>
            </button>

            {/* Group Chat Toggle */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="glass-button-secondary flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-full border border-white/60 flex items-center justify-center shadow-sm transition-colors ${showChat ? "bg-[#ffcccf] text-[#633c3f]" : "glass-button-primary"}`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  chat
                </span>
              </div>
              <span className="font-th-body text-[10px] font-semibold text-[#633c3f]">
                แชท
              </span>
            </button>

            {/* End Call */}
            <button
              className="glass-button-secondary flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-300 hover:opacity-90"
              onClick={handleEndCall}
            >
              <div className="w-14 h-14 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-[0_0_20px_rgba(186,26,26,0.3)] border-2 border-white/20">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  call_end
                </span>
              </div>
              <span className="font-th-body text-[10px] font-bold text-[#ba1a1a]">
                วางสาย
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
