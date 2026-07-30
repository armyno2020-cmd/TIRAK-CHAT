import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Mic, RotateCcw } from "lucide-react";

interface AudioPlayerMessageProps {
  isMe: boolean;
  content: string;
  mediaUrl?: string;
  createdAt: number;
}

export const AudioPlayerMessage: React.FC<AudioPlayerMessageProps> = ({
  isMe,
  content,
  createdAt,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const totalDuration = 12; // 12 seconds voice note default

  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Start playback
    setIsPlaying(true);
    if (playbackTime >= totalDuration) {
      setPlaybackTime(0);
    }

    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        startMockTimer();
        return;
      }

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, now);
      masterGain.connect(ctx.destination);

      // Acoustic Voice Harmonizers
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc2.type = "triangle";

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);

      // Modulate voice frequencies for human-like speech cadence
      const remainingSec = (totalDuration - playbackTime) / playbackSpeed;
      const step = 0.3;
      for (let t = 0; t < remainingSec; t += step) {
        const baseFreq =
          260 +
          Math.sin((t + playbackTime) * 4) * 80 +
          (Math.random() * 20 - 10);
        osc1.frequency.setValueAtTime(baseFreq, now + t);
        osc2.frequency.setValueAtTime(baseFreq * 1.5, now + t);
      }

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + remainingSec);
      osc2.stop(now + remainingSec);

      const intervalMs = 200 / playbackSpeed;
      const interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const next = prev + 0.2 * playbackSpeed;
          if (next >= totalDuration) {
            clearInterval(interval);
            try {
              ctx.close();
            } catch (e) {}
            setIsPlaying(false);
            return totalDuration;
          }
          return next;
        });
      }, intervalMs);

      cleanupRef.current = () => {
        clearInterval(interval);
        try {
          osc1.stop();
          osc2.stop();
          ctx.close();
        } catch (e) {}
      };
    } catch (err) {
      console.warn("Audio Context playback error:", err);
      startMockTimer();
    }
  };

  const startMockTimer = () => {
    const interval = setInterval(() => {
      setPlaybackTime((prev) => {
        if (prev >= totalDuration) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.5 * playbackSpeed;
      });
    }, 500);

    cleanupRef.current = () => clearInterval(interval);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playbackSpeed === 1) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  // Static bars representing audio waveform frequencies
  const waveformHeights = [
    30, 45, 80, 60, 100, 75, 40, 90, 65, 85, 50, 95, 70, 40, 85, 60, 90, 45, 70,
    35,
  ];

  const currentPercent = (playbackTime / totalDuration) * 100;

  return (
    <div
      className={`flex flex-col space-y-1.5 p-1 w-64 ${isMe ? "text-white" : "text-[#1b1b1d]"}`}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-[10px] opacity-90 font-bold px-1">
        <div className="flex items-center space-x-1">
          <Mic
            className={`w-3 h-3 ${isMe ? "text-rose-200" : "text-[#7e5356]"}`}
          />
          <span className="font-th-heading">โน้ตเสียง (Voice Note)</span>
        </div>
        <button
          onClick={cycleSpeed}
          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all ${
            isMe
              ? "glass-surface glass-button-secondary text-white"
              : "bg-black/10 hover:bg-black/15 text-[#7e5356]"
          }`}
        >
          {playbackSpeed}x
        </button>
      </div>

      {/* Main Play / Waveform Controller Card */}
      <div className="flex items-center space-x-2.5 bg-black/10 p-2.5 rounded-2xl backdrop-blur-md">
        <button
          onClick={handleTogglePlay}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-90 shadow-md ${
            isMe ? "glass-surface text-[#7e5356] " : "glass-button-primary "
          }`}
          title={isPlaying ? "Pause Audio" : "Play Audio"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Waveform Bars */}
        <div className="flex-1 flex items-center space-x-0.5 h-8 px-1">
          {waveformHeights.map((height, i) => {
            const barPercent = (i / waveformHeights.length) * 100;
            const isPlayed = barPercent <= currentPercent;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${height}%`,
                  backgroundColor: isPlayed
                    ? isMe
                      ? "#ffffff"
                      : "#7e5356"
                    : isMe
                      ? "rgba(255, 255, 255, 0.35)"
                      : "rgba(0, 0, 0, 0.2)",
                  transform:
                    isPlaying && isPlayed ? "scaleY(1.15)" : "scaleY(1)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Duration and Status */}
      <div className="flex items-center justify-between text-[10px] font-mono opacity-80 px-1">
        <span>
          0:{playbackTime.toFixed(0).padStart(2, "0")} / 0:{totalDuration}
        </span>
        <div className="flex items-center space-x-1">
          <Volume2 className="w-3 h-3" />
          <span className="text-[9px] font-sans font-bold">
            Signal E2EE Audio
          </span>
        </div>
      </div>
    </div>
  );
};
