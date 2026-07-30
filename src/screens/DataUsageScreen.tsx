import React from "react";
import { ArrowLeft, Database, Download, Upload } from "lucide-react";

export const DataUsageScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate && onNavigate("settings_account")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          การใช้ข้อมูลและพื้นที่
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs flex flex-col items-center text-center">
            <Upload className="w-6 h-6 text-[#7e5356] mb-2" />
            <span className="text-xs text-[#687280]">ส่งออกแล้ว</span>
            <span className="font-th-heading text-lg font-bold text-[#1b1b1d] mt-0.5">
              2.4 GB
            </span>
          </div>
          <div className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs flex flex-col items-center text-center">
            <Download className="w-6 h-6 text-[#7e5356] mb-2" />
            <span className="text-xs text-[#687280]">รับแล้ว</span>
            <span className="font-th-heading text-lg font-bold text-[#1b1b1d] mt-0.5">
              14.8 GB
            </span>
          </div>
        </div>

        <div className="glass-surface border border-white/80 p-5 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-white/40 pb-3">
            <Database className="w-5 h-5 text-[#7e5356]" />
            <h3 className="font-th-heading text-sm font-bold text-[#1b1b1d]">
              รายละเอียดการใช้พื้นที่จัดเก็บ
            </h3>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-[#1b1b1d]">
                  วิดีโอและรูปภาพคุณภาพสูง
                </span>
                <span className="text-[#7e5356] font-bold">12 GB</span>
              </div>
              <div className="w-full glass-surface h-2 rounded-full overflow-hidden">
                <div className="glass-button-primary w-[75%] h-full rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-[#1b1b1d]">
                  เอกสารและไฟล์สื่อ
                </span>
                <span className="text-[#45474a] font-bold">4 GB</span>
              </div>
              <div className="w-full glass-surface h-2 rounded-full overflow-hidden">
                <div className="bg-[#5d5e63] w-[25%] h-full rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-[#1b1b1d]">ข้อความเสียง</span>
                <span className="text-[#45474a] font-bold">1.2 GB</span>
              </div>
              <div className="w-full glass-surface h-2 rounded-full overflow-hidden">
                <div className="bg-[#1b1b1d]/40 w-[10%] h-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
