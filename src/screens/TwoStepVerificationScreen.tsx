import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Key,
  Smartphone,
  AlertCircle,
} from "lucide-react";

export const TwoStepVerificationScreen: React.FC<any> = (props) => {
  const { onNavigate } = props || {};
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate && onNavigate("settings_privacy")}
          className="p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          การยืนยันแบบสองขั้นตอน
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-4">
        <section className="glass-surface p-6 rounded-2xl border border-white/80 shadow-2xs text-center flex flex-col items-center">
          <div className="w-16 h-16 glass-button-primary/10 text-[#7e5356] rounded-full flex items-center justify-center mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-th-heading text-lg font-bold text-[#1b1b1d] mb-1">
            ความปลอดภัยระดับสูงสุด
          </h2>
          <p className="text-xs text-[#687280] leading-relaxed max-w-md">
            เพิ่มความปลอดภัยอีกระดับด้วยการกำหนดรหัส PIN 6
            หลักสำหรับการลงทะเบียนบัญชีหรือย้ายเครื่องใหม่
          </p>
        </section>

        <div className="space-y-3">
          <div className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
            <Key className="w-5 h-5 text-[#7e5356] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1b1b1d]">
                รหัส PIN 6 หลัก
              </h3>
              <p className="text-xs text-[#687280] mt-0.5">
                กำหนดรหัสผ่านที่จำได้ง่ายแต่คาดเดายาก
                เพื่อป้องกันการเข้าถึงจากบุคคลอื่น
              </p>
            </div>
          </div>

          <div className="glass-surface border border-white/80 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-[#7e5356] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-[#1b1b1d]">
                ยืนยันการเข้าสู่ระบบอุปกรณ์ใหม่
              </h3>
              <p className="text-xs text-[#687280] mt-0.5">
                ระบบจะสอบถามรหัส PIN
                เมื่อมีการลงชื่อเข้าใช้อุปกรณ์เครื่องใหม่เสมอ
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsEnabled(!isEnabled);
            alert(
              isEnabled
                ? "ยกเลิกการเปิดใช้งานยืนยันแบบสองขั้นตอนเรียบร้อย"
                : "ตั้งค่ารหัส PIN เรียบร้อย",
            );
          }}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-2xs cursor-pointer ${
            isEnabled
              ? "bg-red-50 text-red-600 border border-red-200 glass-button-secondary"
              : "glass-button-primary"
          }`}
        >
          {isEnabled ? "ปิดใช้งานการยืนยันสองขั้นตอน" : "เปิดใช้งานตอนนี้"}
        </button>

        <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/60">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            หากคุณลืมรหัส PIN
            คุณสามารถใช้อีเมลเพื่อทำการกู้คืนรหัสผ่านได้โดยปลอดภัย
          </p>
        </div>
      </main>
    </div>
  );
};
