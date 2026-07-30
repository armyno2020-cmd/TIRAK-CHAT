import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Language, ScreenId } from "../types";
import { FirebaseService } from "../services/firebaseService";

import { triggerHaptic } from "../utils/haptics";

interface OTPVerificationScreenProps {
  activeLanguage: Language;
  phoneNumber: string;
  countryCode: string;
  onNavigate: (screen: ScreenId) => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  phoneNumber,
  countryCode,
  onNavigate,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Simulate auto-filling OTP after a few seconds as requested by the user
  // "This will not be a traditional SMS, but rather a code that is automatically entered into the designated field."
  useEffect(() => {
    const autoFillTimer = setTimeout(() => {
      setOtp(["1", "2", "3", "4", "5", "6"]);
    }, 2000);
    return () => clearTimeout(autoFillTimer);
  }, []);

  useEffect(() => {
    if (otp.join("").length === 6) {
      setTimeout(() => {
        handleVerify();
      }, 500);
    }
  }, [otp]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      try {
        const confirmationResult = (window as any).confirmationResult;
        if (confirmationResult) {
          const userProfile = await FirebaseService.verifyOtp(confirmationResult, code);
          triggerHaptic("success");
          onNavigate("profile_setup");
        } else {
          // Fallback if no confirmation result (for mock/dev)
          triggerHaptic("success");
          onNavigate("profile_setup");
        }
      } catch (err: any) {
        alert("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่ (Error: " + err.message + ")");
      }
    }
  };

  const maskedPhone = phoneNumber
    ? `${countryCode} ${phoneNumber.slice(0, 3)}***${phoneNumber.slice(-4)}`
    : "+66 81***5678";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-5 overflow-hidden text-[#1b1b1d] font-[Prompt]"
      style={{
        backgroundColor: "#fcf8fb",
        background:
          "radial-gradient(circle at 15% 50%, rgba(240, 185, 188, 0.15), transparent 50%), radial-gradient(circle at 85% 30%, rgba(198, 198, 203, 0.2), transparent 50%)",
      }}
    >
      {/* Ambient background element for depth */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#ffdadb]/20 blur-[100px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#e0dfe4]/40 blur-[120px]"></div>
      </div>

      <main className="w-full max-w-[420px] relative z-10">
        <div className="glass-surface border border-white/60 rounded-[28px] p-8 md:p-10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

          <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate && onNavigate("account")}
                className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
                ยืนยันรหัส OTP
              </span>
            </div>
          </header>

          <form
            onSubmit={handleVerify}
            className="relative z-10 flex flex-col gap-6 items-center"
          >
            {/* App Logo */}
            <div className="w-18 h-18 rounded-2xl glass-surface border border-white/80 shadow-md flex items-center justify-center p-2 bg-white/70">
              <img
                src="/tirak_logo.png"
                alt="TIRAK CHAT"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  autoFocus={index === 0}
                  className="w-12 h-14 md:w-14 md:h-16 rounded-xl text-center font-[Prompt] text-2xl font-semibold text-[#1b1b1d] outline-none transition-all duration-200"
                  style={{
                    background: "rgba(234, 231, 234, 0.4)",
                    boxShadow:
                      "inset 0 2px 4px rgba(0,0,0,0.02), 0 1px 0 rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    backdropFilter: "blur(10px)",
                  }}
                  onFocus={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.6)";
                    e.target.style.borderColor = "#7e5356";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(126, 83, 86, 0.1), inset 0 2px 4px rgba(0,0,0,0.02)";
                  }}
                  onBlur={(e) => {
                    e.target.style.background = "rgba(234, 231, 234, 0.4)";
                    e.target.style.borderColor = "rgba(255,255,255,0.5)";
                    e.target.style.boxShadow =
                      "inset 0 2px 4px rgba(0,0,0,0.02), 0 1px 0 rgba(255,255,255,0.8)";
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="font-[Prompt] text-[13px] text-[#45474a]">
                ไม่ได้รับรหัส?
              </span>
              <button
                className="glass-button-secondary font-[Prompt] text-[13px] text-[#7e5356] font-semibold hover:text-[#633c3f] transition-colors flex items-center gap-1 group"
                type="button"
                onClick={() => setCountdown(59)}
                disabled={countdown > 0}
              >
                <span>ส่งรหัสอีกครั้ง</span>
                {countdown > 0 && (
                  <span className="text-[#7e5356]/70 font-normal group-hover:text-[#7e5356] transition-colors">
                    ({countdown.toString().padStart(2, "0")}:59)
                  </span>
                )}
              </button>
            </div>

            <button
              className="glass-button-secondary mt-4 w-full h-14 rounded-full bg-gradient-to-r from-[#7e5356] to-[#9a6a6e] text-white font-[Prompt] text-[14px] font-semibold tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(126,83,86,0.2)] hover:shadow-[0_12px_24px_rgba(126,83,86,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group disabled:opacity-50"
              type="submit"
              disabled={otp.join("").length < 6}
            >
              <span className="relative z-10">ยืนยันการตรวจสอบ</span>
              <div className="absolute inset-0 glass-surface translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full pointer-events-none"></div>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
