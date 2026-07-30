// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  X,
  Type,
  Video,
  FlipHorizontal,
  Wand2,
  Download,
  ChevronRight,
  Mic,
  MicOff,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { ScreenId } from "../types";
import { FirebaseService } from "../services/firebaseService";

interface CreateStoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  currentUser?: any;
}

export const CreateStoryScreen: React.FC<CreateStoryScreenProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [mode, setMode] = useState<"camera" | "text" | "upload">("camera");
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(59);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [textContent, setTextContent] = useState("");
  const [colorBg, setColorBg] = useState("#7e5356");
  const [filterActive, setFilterActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (mode === "camera" && !recordedVideo && !uploadedMedia) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode, recordedVideo, uploadedMedia]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const handleStartRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    chunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setRecordedVideo(evt.target.result as string);
        }
      };
      reader.readAsDataURL(blob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setTimeLeft(59);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          recorder.stop();
          setIsRecording(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith("video/");
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setUploadedMedia({
            url: evt.target.result as string,
            type: isVid ? "video" : "image",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareStory = async () => {
    setIsSharing(true);
    const storyId = "story_" + Date.now();
    let mediaUrl = "";
    let mediaType: "image" | "video" | "text" = "image";

    if (mode === "text") {
      mediaType = "text";
      mediaUrl = "";
    } else if (uploadedMedia) {
      mediaUrl = uploadedMedia.url;
      mediaType = uploadedMedia.type;
    } else if (recordedVideo) {
      mediaUrl = recordedVideo;
      mediaType = "video";
    }

    const storyData = {
      id: storyId,
      authorUid: currentUser?.uid || currentUser?.id || "user_me",
      authorName: currentUser?.displayName || "ผู้ใช้งาน TIRAK",
      authorAvatar: currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      mediaUrl,
      mediaType,
      textCaption: textContent,
      bgGradient: colorBg,
      createdAt: Date.now(),
      viewsCount: 1,
    };

    try {
      await FirebaseService.saveStory(storyData);
    } catch (e) {
      console.warn("Failed to save story to firestore:", e);
    }

    setIsSharing(false);
    onNavigate("stories_feed");
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <div className="bg-[#1b1b1d] text-white h-screen w-full font-th-body relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <button
          onClick={() => onNavigate("chat_list")}
          className="glass-button-secondary w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>
        {mode === "camera" && !recordedVideo && (
          <div className="flex gap-4">
            <button
              onClick={toggleFilter}
              className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md active:scale-95 ${filterActive ? "text-[#f0b9bc]" : ""}`}
            >
              <Wand2 className="w-6 h-6" />
            </button>
            <button className="glass-button-secondary w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md active:scale-95">
              <FlipHorizontal className="w-6 h-6" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 relative rounded-b-3xl overflow-hidden shadow-xl shadow-black/50">
        {mode === "text" ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-colors duration-500"
            style={{ backgroundColor: colorBg }}
          >
            <textarea
              className="bg-transparent w-full px-8 text-center text-4xl font-th-heading font-bold outline-none placeholder:text-white/60 resize-none"
              placeholder="แตะเพื่อพิมพ์..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              autoFocus
              rows={5}
            />
            {/* Color Pickers */}
            <div className="absolute bottom-24 flex gap-4 bg-black/20 p-3 rounded-full backdrop-blur-xl border border-white/10">
              {["#7e5356", "#5d5e63", "#1b1b1d", "#93000a", "#000000"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setColorBg(c)}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${colorBg === c ? "border-white scale-110" : "border-transparent opacity-80"}`}
                    style={{ backgroundColor: c }}
                  />
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {uploadedMedia ? (
              uploadedMedia.type === "video" ? (
                <video
                  src={uploadedMedia.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={uploadedMedia.url}
                  alt="uploaded story"
                  className="w-full h-full object-cover"
                />
              )
            ) : recordedVideo ? (
              <video
                src={recordedVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
              />
            ) : (
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${filterActive ? "contrast-125 saturate-150 brightness-110 sepia-[.2]" : ""}`}
                autoPlay
                playsInline
                muted
              />
            )}

            {/* IG-like Recording UI overlay */}
            {!recordedVideo && !uploadedMedia && isRecording && (
              <div className="absolute top-16 right-4 bg-[#ba1a1a]/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-label-caps flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 rounded-full glass-surface"></div>
                {timeLeft}s
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="h-32 bg-black w-full flex items-center justify-center relative px-6 shrink-0">
        {!recordedVideo && !uploadedMedia ? (
          <>
            {/* Mode Selector */}
            <div className="absolute top-0 left-0 right-0 -translate-y-full pb-4 flex justify-center items-center gap-6 font-th-body font-semibold text-sm">
              <button
                onClick={() => setMode("text")}
                className={`drop-shadow-md cursor-pointer ${mode === "text" ? "text-white font-bold" : "text-white/50"}`}
              >
                ข้อความ
              </button>
              <button
                onClick={() => setMode("camera")}
                className={`drop-shadow-md cursor-pointer ${mode === "camera" ? "text-white font-bold" : "text-white/50"}`}
              >
                กล้อง
              </button>
              <label className="drop-shadow-md cursor-pointer text-white/70 hover:text-white flex items-center gap-1">
                <ImageIcon className="w-4 h-4 text-amber-300" />
                <span>คลังภาพ</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {mode === "camera" && (
              <div className="flex items-center justify-center gap-12 w-full">
                <div className="w-10 h-10"></div>

                {/* Record Button */}
                <div
                  className={`w-20 h-20 rounded-full border-[4px] border-white/50 flex items-center justify-center transition-all cursor-pointer ${isRecording ? "scale-110 border-[#ba1a1a]/50" : "active:scale-95"}`}
                  onClick={
                    isRecording ? handleStopRecording : handleStartRecording
                  }
                >
                  <div
                    className={`rounded-full transition-all glass-surface ${isRecording ? "w-8 h-8 rounded-xl bg-[#ba1a1a]" : "w-[68px] h-[68px]"}`}
                  ></div>
                </div>

                {/* Effects / Filter Button */}
                <div
                  onClick={toggleFilter}
                  className="w-10 h-10 rounded-full glass-surface flex items-center justify-center active:scale-95 backdrop-blur-md border border-white/20 cursor-pointer"
                >
                  <Wand2 className={`w-5 h-5 ${filterActive ? "text-amber-300" : "text-white/80"}`} />
                </div>
              </div>
            )}

            {mode === "text" && (
              <div className="w-full flex justify-end">
                <button
                  onClick={handleShareStory}
                  disabled={isSharing || !textContent.trim()}
                  className="w-12 h-12 rounded-full bg-[#7e5356] hover:bg-[#8f6265] flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <ChevronRight className="w-7 h-7 text-white" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Post Recording or Upload Options */
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => {
                setRecordedVideo(null);
                setUploadedMedia(null);
              }}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <X className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-th-body">ทิ้ง</span>
            </button>

            <button
              onClick={handleShareStory}
              disabled={isSharing}
              className="flex items-center gap-3 bg-[#7e5356] hover:bg-[#8f6265] text-white px-6 py-3 rounded-full font-th-body font-bold shadow-lg shadow-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isSharing ? "กำลังแชร์..." : "แชร์สตอรี่"}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
