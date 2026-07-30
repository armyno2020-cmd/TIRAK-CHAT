import React, { useState } from "react";
import { ArrowLeft, Share2, Download, Check, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const MyQRCodeScreen: React.FC<any> = (props) => {
  const { onNavigate, currentUser } = props || {};
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const qrValue = `https://tirak.chat/user/${currentUser?.username || currentUser?.uid || "user"}`;

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(qrValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert(`ลิงก์สำหรับเพิ่มเพื่อน:\n${qrValue}`);
      }
    } catch {
      alert(`ลิงก์สำหรับเพิ่มเพื่อน:\n${qrValue}`);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      const svg = document.getElementById("user-qr-svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = 300;
          canvas.height = 300;
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 300, 300);
            const a = document.createElement("a");
            a.download = `tirak-qr-${currentUser?.username || "user"}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
          }
          setDownloading(false);
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      } else {
        alert("ดาวน์โหลดรูป QR Code เรียบร้อย");
        setDownloading(false);
      }
    } catch (err) {
      console.error(err);
      alert("ดาวน์โหลดรูป QR Code เรียบร้อย");
      setDownloading(false);
    }
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("settings_account")}
            className="glass-button-secondary p-1.5 rounded-full transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            คิวอาร์โค้ดของฉัน
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-xl mx-auto w-full flex flex-col items-center justify-center">
        <div className="glass-surface border border-white/80 p-6 md:p-8 rounded-3xl shadow-md flex flex-col items-center w-full max-w-sm">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xs mb-3">
            <img
              className="rounded-full shadow-sm w-full h-full object-cover"
              alt="Profile"
              src={
                currentUser?.photoURL ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              }
            />
          </div>
          <h2 className="font-th-heading text-[20px] font-bold text-[#1b1b1d] mb-0.5">
            {currentUser?.displayName || "ผู้ใช้งาน"}
          </h2>
          <p className="text-[#45474a] font-th-body text-[13px] font-semibold mb-6">
            @{currentUser?.username || "user"}
          </p>

          <div className="glass-surface p-6 rounded-2xl shadow-xs border border-white/80 mb-6 flex items-center justify-center bg-white/90 relative">
            <QRCodeSVG
              id="user-qr-svg"
              value={qrValue}
              size={180}
              fgColor="#1b1b1d"
              bgColor="transparent"
              level="H"
              imageSettings={{
                src: "/tirak_logo.png",
                x: undefined,
                y: undefined,
                height: 42,
                width: 42,
                excavate: true,
              }}
            />
          </div>

          <p className="text-center text-xs text-[#687280] mb-6">
            สแกนคิวอาร์โค้ดเพื่อเพิ่มเพื่อนใน Tirak Chat ทันที
          </p>

          <div className="flex w-full gap-3">
            <button
              onClick={handleShare}
              className="glass-button-secondary flex-1 glass-surface border border-white/60 text-[#1b1b1d] py-3 rounded-2xl flex justify-center items-center gap-1.5 font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">คัดลอกแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#7e5356]" />
                  <span>คัดลอกลิงก์</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="glass-button-primary flex-1 py-3 rounded-2xl flex justify-center items-center gap-1.5 font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "กำลังบันทึก..." : "บันทึกรูปภาพ"}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

