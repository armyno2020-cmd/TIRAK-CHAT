// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  X,
  Send,
  Heart,
  CircleDot,
  MoreHorizontal,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { Language, ScreenId, StoryItem } from "../types";
import { FirebaseService } from "../services/firebaseService";

interface StoriesScreenProps {
  activeLanguage?: Language;
  onNavigate: (screen: ScreenId) => void;
  currentUser?: any;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  activeLanguage,
  onNavigate,
  currentUser,
}) => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = FirebaseService.subscribeToStories((fetched) => {
      setStories(fetched);
    });
    return () => unsub();
  }, []);

  // Auto close story simulation
  useEffect(() => {
    let timer: any;
    if (activeStory) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setActiveStory(null);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds total
    }
    return () => clearInterval(timer);
  }, [activeStory]);

  const handleCreateStoryClick = () => {
    if (onNavigate) {
      onNavigate("create_story");
    }
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] overflow-hidden h-full w-full font-th-body flex flex-col relative">
      {!activeStory ? (
        <div className="h-full flex flex-col bg-transparent relative w-full overflow-y-auto">
          {/* Top AppBar */}
          <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
                สตอรี่ (Stories)
              </span>
            </div>
            <button
              className="px-3.5 py-1.5 rounded-xl glass-button-primary text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              onClick={handleCreateStoryClick}
            >
              <Plus className="w-4 h-4" />
              <span>สร้างสตอรี่</span>
            </button>
          </header>

          <main className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-6">
            {/* Create Story Banner */}
            <div
              onClick={handleCreateStoryClick}
              className="glass-surface p-4 rounded-3xl border border-white/80 shadow-xs flex items-center gap-4 cursor-pointer hover:border-[#7e5356]/40 transition-all group"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                    alt="Current user"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#7e5356] text-white rounded-full p-1 border-2 border-white">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-th-heading font-bold text-sm text-[#1b1b1d]">
                  สร้างสตอรี่ของคุณ
                </h3>
                <p className="text-xs text-[#687280]">
                  แบ่งปันช่วงเวลาประทับใจกับเพื่อนๆ บน TIRAK
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#7e5356]/10 text-[#7e5356] text-xs font-bold">
                โพสต์เลย
              </div>
            </div>

            {/* Stories Grid / List */}
            {stories.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center glass-surface rounded-3xl border border-white/60">
                <div className="w-16 h-16 rounded-full glass-surface shadow-xs border border-white/80 flex items-center justify-center mb-4">
                  <CircleDot className="w-8 h-8 text-[#c6c6cb]" />
                </div>
                <h2 className="font-th-heading text-[16px] font-bold text-[#1b1b1d] mb-1">
                  ยังไม่มีสตอรี่ล่าสุด
                </h2>
                <p className="text-[#6d6e72] text-[12px] mb-4 max-w-xs leading-relaxed">
                  เมื่อคุณหรือเพื่อนๆ โพสต์สตอรี่ เรื่องราวจะปรากฏขึ้นที่นี่ 24 ชม.
                </p>
                <button
                  className="px-5 py-2 rounded-2xl glass-button-primary text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  onClick={handleCreateStoryClick}
                >
                  <Plus className="w-4 h-4" />
                  <span>แบ่งปันสตอรี่แรกของคุณ</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-[#45474a] uppercase tracking-wider px-1">
                  สตอรี่ล่าสุด ({stories.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => setActiveStory(story)}
                      className="relative h-48 rounded-2xl overflow-hidden shadow-xs border border-white/60 cursor-pointer group hover:scale-[1.02] transition-transform"
                      style={{
                        backgroundColor: story.bgGradient || "#7e5356",
                      }}
                    >
                      {story.mediaUrl ? (
                        story.mediaType === "video" ? (
                          <video
                            src={story.mediaUrl}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={story.mediaUrl}
                            alt="story thumbnail"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )
                      ) : (
                        <div className="w-full h-full p-4 flex items-center justify-center text-center">
                          <p className="text-white text-xs font-bold line-clamp-4">
                            {story.textCaption || "สตอรี่ข้อความ"}
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                        <img
                          src={story.authorAvatar}
                          alt={story.authorName}
                          className="w-7 h-7 rounded-full border border-white object-cover shadow-sm"
                        />
                        <span className="text-[11px] font-bold text-white drop-shadow-sm truncate max-w-[90px]">
                          {story.authorName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        <main className="relative h-screen w-full bg-black overflow-hidden flex flex-col animate-fade-in">
          {/* Background Asset */}
          <div className="absolute inset-0 z-0">
            {activeStory.mediaUrl ? (
              activeStory.mediaType === "video" ? (
                <video
                  src={activeStory.mediaUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  alt="Story"
                  src={activeStory.mediaUrl}
                />
              )
            ) : (
              <div
                className="w-full h-full flex items-center justify-center p-8 text-center"
                style={{ backgroundColor: activeStory.bgGradient || "#7e5356" }}
              >
                <p className="text-white text-2xl font-bold font-th-heading leading-relaxed">
                  {activeStory.textCaption}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          </div>

          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 px-4 py-3">
            <div className="h-1 flex-grow bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Top AppBar */}
          <header className="absolute top-6 left-4 right-4 z-50 flex justify-between items-center px-2 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white p-0.5 overflow-hidden shadow-md">
                <img
                  className="w-full h-full object-cover rounded-full"
                  alt="User"
                  src={activeStory.authorAvatar}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-th-heading text-[15px] font-bold leading-tight drop-shadow-md">
                  {activeStory.authorName}
                </span>
                <span className="text-white/80 font-th-body text-[11px] drop-shadow-sm">
                  สตอรี่ล่าสุด
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveStory(null)}
              className="p-2 rounded-full bg-black/40 text-white/90 hover:text-white backdrop-blur-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Navigation Hitbox */}
          <div className="absolute inset-0 z-10 flex">
            <div className="w-1/3 h-full cursor-pointer" onClick={() => setProgress(0)}></div>
            <div
              className="w-2/3 h-full cursor-pointer"
              onClick={() => setActiveStory(null)}
            ></div>
          </div>

          {/* Caption text overlay if image story has caption */}
          {activeStory.mediaUrl && activeStory.textCaption && (
            <div className="absolute bottom-24 left-4 right-4 z-20 bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white text-center text-sm font-bold">
              {activeStory.textCaption}
            </div>
          )}
        </main>
      )}
    </div>
  );
};
