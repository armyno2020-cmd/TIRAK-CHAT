// @ts-nocheck
import React, { useState } from "react";
import {
  Shield,
  Flashlight,
  Image as ImageIcon,
  ArrowLeft,
  UserPlus,
  Check,
  QrCode,
  Sparkles,
} from "lucide-react";

export const QRScannerScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  const [flashOn, setFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUser, setScannedUser] = useState<any>(null);
  const [friendAdded, setFriendAdded] = useState(false);

  const simulateScan = (usernameOverride?: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedUser({
        displayName: usernameOverride ? `ผู้ใช้ @${usernameOverride}` : "น้องส้ม สุภาพร",
        username: usernameOverride || "som_orange",
        photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        status: "พร้อมคุยเรื่องความรักและมิตรภาพ 💕",
      });
    }, 1200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateScan("somchai_jaidee");
    }
  };

  return (
    <div className="bg-[#fcf8fb] h-full w-full text-[#1b1b1d] font-th-body flex flex-col relative overflow-hidden">
      {/* System Liquid Formalist Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcf8fb] via-[#f0edef] to-[#ffefef] z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffefef]/60 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e0dfe4]/50 rounded-full filter blur-3xl pointer-events-none"></div>
      </div>

      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("add_friend")}
            className="p-1.5 rounded-full transition-colors text-[#1b1b1d] cursor-pointer bg-white/40 hover:bg-white/60 border border-white/60"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            สแกนคิวอาร์โค้ด
          </span>
        </div>
        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`p-2 rounded-full cursor-pointer transition-colors ${
            flashOn ? "bg-amber-400 text-black shadow-lg shadow-amber-400/50" : "bg-white/40 text-[#1b1b1d] hover:bg-white/60 border border-white/60"
          }`}
        >
          <Flashlight className="w-4 h-4" />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center z-10 w-full relative p-4">
        <div className="text-center mb-4">
          <h1 className="font-th-heading text-lg font-bold mb-1 tracking-tight text-[#1b1b1d]">
            สแกนคิวอาร์โค้ดเพิ่มเพื่อน
          </h1>
          <p className="text-[#45474a] text-xs">
            จัดคิวอาร์โค้ดให้อยู่ในกรอบ หรือกดทดสอบสแกน
          </p>
        </div>

        <div className="relative w-64 h-64 my-2 flex items-center justify-center">
          {/* Scanner Corner Accents in System Theme (#7e5356) */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#7e5356] rounded-tl-2xl shadow-sm"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#7e5356] rounded-tr-2xl shadow-sm"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#7e5356] rounded-bl-2xl shadow-sm"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#7e5356] rounded-br-2xl shadow-sm"></div>

          <div className="absolute inset-0 bg-[#303032]/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border border-white/20 p-4 shadow-inner overflow-hidden">
            {/* Animated Laser Scanning Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffefef] to-transparent shadow-[0_0_12px_#7e5356] animate-pulse"></div>

            {isScanning ? (
              <div className="flex flex-col items-center gap-2">
                <span className="animate-spin w-8 h-8 border-2 border-[#ffefef] border-t-transparent rounded-full"></span>
                <p className="text-xs text-white font-bold">กำลังสแกนคิวอาร์โค้ด...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/90">
                <QrCode className="w-16 h-16 text-[#ffefef]" />
                <p className="text-[11px] font-bold">กล้องพร้อมใช้งาน</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => simulateScan()}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-2xl bg-[#7e5356] hover:bg-[#8f6265] text-white flex items-center gap-2 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>ทดสอบสแกน QR Code</span>
          </button>

          <label className="px-5 py-2.5 rounded-2xl glass-surface hover:bg-white/80 border border-white/80 flex items-center gap-2 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-xs text-[#1b1b1d]">
            <ImageIcon className="w-4 h-4 text-[#7e5356]" />
            <span>เลือกรูปจากคลัง</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </main>

      {/* Scanned Result Modal */}
      {scannedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fcf8fb] text-[#1b1b1d] rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/80 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md mb-3">
              <img
                src={scannedUser.photoURL}
                alt={scannedUser.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-th-heading text-lg font-bold text-[#1b1b1d]">
              {scannedUser.displayName}
            </h3>
            <p className="text-xs text-[#7e5356] font-bold mb-2">
              @{scannedUser.username}
            </p>
            <p className="text-xs text-[#45474a] bg-[#f0edef] p-3 rounded-2xl w-full mb-6">
              "{scannedUser.status}"
            </p>

            <div className="flex w-full gap-2">
              <button
                onClick={() => {
                  setScannedUser(null);
                  setFriendAdded(false);
                }}
                className="flex-1 py-3 rounded-full border border-[#c6c6ca] text-[#45474a] font-bold text-xs hover:bg-[#f0edef] transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>

              <button
                onClick={() => {
                  setFriendAdded(true);
                  setTimeout(() => {
                    setScannedUser(null);
                    setFriendAdded(false);
                    if (onNavigate) onNavigate("chat_list");
                  }, 1200);
                }}
                className="flex-1 py-3 rounded-full bg-[#5d5e63] text-white font-bold text-xs hover:bg-[#45474b] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {friendAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>เพิ่มเพื่อนแล้ว</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>เพิ่มเป็นเพื่อน</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-3 flex justify-center w-full shrink-0 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 glass-surface rounded-full border border-white/80 shadow-2xs">
          <Shield className="w-3.5 h-3.5 text-[#7e5356]" />
          <span className="font-th-body text-[11px] text-[#45474a] font-medium">
            การสแกนความปลอดภัยสูงผ่าน E2EE
          </span>
        </div>
      </footer>
    </div>
  );
};
