// @ts-nocheck
import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export const ReportFeedbackScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("bug");

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate && onNavigate("help")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          รายงานปัญหาและข้อเสนอแนะ
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4">
        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("bug")}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center text-center cursor-pointer shadow-2xs ${type === "bug" ? "border-[#ba1a1a] bg-[#ffdad6]/20" : "border-white/80 glass-surface glass-button-secondary"}`}
              >
                <AlertTriangle
                  className={`w-6 h-6 mb-2 ${type === "bug" ? "text-[#ba1a1a]" : "text-[#45474a]"}`}
                />
                <span
                  className={`font-bold text-xs ${type === "bug" ? "text-[#93000a]" : "text-[#45474a]"}`}
                >
                  รายงานข้อผิดพลาด (Bug)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setType("feature")}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center text-center cursor-pointer shadow-2xs ${type === "feature" ? "border-[#7e5356] bg-[#ffefef]/60" : "border-white/80 glass-surface glass-button-secondary"}`}
              >
                <Lightbulb
                  className={`w-6 h-6 mb-2 ${type === "feature" ? "text-[#7e5356]" : "text-[#45474a]"}`}
                />
                <span
                  className={`font-bold text-xs ${type === "feature" ? "text-[#7e5356]" : "text-[#45474a]"}`}
                >
                  เสนอแนะฟีเจอร์ใหม่
                </span>
              </button>
            </div>

            <div className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs space-y-2">
              <label className="block font-bold text-xs text-[#1b1b1d]">
                อธิบายรายละเอียดข้อมูล
              </label>
              <textarea
                required
                rows={5}
                className="w-full glass-surface border border-white/40 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#7e5356]/20 outline-none resize-none placeholder:text-[#c6c6ca] font-th-body"
                placeholder={
                  type === "bug"
                    ? "อธิบายปัญหาที่คุณพบและขั้นตอนที่เกิดปัญหา..."
                    : "อธิบายฟีเจอร์ที่คุณต้องการให้เราพัฒนาเพิ่มเติม..."
                }
              ></textarea>
            </div>

            <button
              className="w-full glass-button-primary py-3 rounded-xl font-bold text-xs transition-colors shadow-2xs cursor-pointer active:scale-98"
              type="submit"
            >
              ส่งข้อมูลถึงทีมพัฒนา
            </button>
          </form>
        ) : (
          <div className="glass-surface border border-white/80 p-8 rounded-2xl flex flex-col items-center text-center shadow-2xs">
            <div className="w-14 h-14 glass-button-primary/10 text-[#7e5356] rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-th-heading text-base font-bold text-[#1b1b1d] mb-1">
              ขอบคุณสำหรับข้อเสนอแนะ!
            </h3>
            <p className="text-xs text-[#687280] max-w-sm leading-relaxed">
              เราได้รับข้อมูลของคุณเรียบร้อยแล้ว
              ทีมงานจะนำไปตรวจสอบและพัฒนาแอปพลิเคชันให้ดียิ่งขึ้นต่อไป
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="glass-button-secondary mt-6 text-[#7e5356] text-xs font-bold hover:underline cursor-pointer"
            >
              ส่งรายงานใหม่อีกครั้ง
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
