import React, { useState, useEffect } from "react";
import { ArrowLeft, X, Eye, ShieldAlert, Download, Share2 } from "lucide-react";

interface MediaViewerModalProps {
  isOpen: boolean;
  mediaUrl: string;
  onClose: () => void;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({
  isOpen,
  mediaUrl,
  onClose,
}) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (!isOpen) return;
    setTimer(10);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-fade-in text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-2 px-2">
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5 mr-1" />
            <span>View Once Media ({timer}s)</span>
          </div>
          <span className="text-[10px] text-[#c6c6ca] flex items-center">
            <ShieldAlert className="w-3 h-3 mr-1 text-amber-400" />
            Screenshot Protected
          </span>
        </div>

        <button
          className="p-2 rounded-full glass-surface glass-button-secondary active:scale-95 text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image */}
      <div className="my-auto max-w-sm mx-auto flex items-center justify-center p-2">
        <img
          className="max-h-[70vh] rounded-3xl object-contain shadow-2xl ring-1 ring-white/10"
          src={mediaUrl}
          alt="View once asset"
        />
      </div>

      {/* Footer Info */}
      <div className="text-center pb-4">
        <p className="text-xs text-[#c6c6ca] font-th-body">
          This media will vanish permanently once the timer expires.
        </p>
      </div>
    </div>
  );
};
