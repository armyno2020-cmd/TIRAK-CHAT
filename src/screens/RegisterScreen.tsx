import React, { useState } from "react";
import { ArrowLeft, X, Shield } from "lucide-react";
import { Language, ScreenId, UserProfile } from "../types";
import { FirebaseService } from "../services/firebaseService";

interface RegisterScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
  onSavePhoneAndUsername: (
    phone: string,
    code: string,
    user: string,
    fullName: string,
  ) => void;
  onGoogleSignIn?: () => void;
  onExistingUserFound?: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onSavePhoneAndUsername,
  onGoogleSignIn,
  onExistingUserFound,
}) => {
  const [countryCode, setCountryCode] = useState("+66");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsChecking(true);

    try {
      const formattedPhone = `${countryCode}${phoneNumber.replace(/\\D/g, "")}`;
      const existingUser =
        await FirebaseService.findUserByPhone(formattedPhone);

      if (existingUser && onExistingUserFound) {
        setTimeout(() => {
          onExistingUserFound(existingUser);
        }, 1000);
        return;
      }
    } catch (err) {
      console.warn("Duplicate check warning:", err);
    }

    setIsChecking(false);
    // Mock user creation for phone
    const mockUsername = `user_${phoneNumber.substring(0, 4)}`;
    const mockName = `User ${phoneNumber.substring(0, 4)}`;
    onSavePhoneAndUsername(phoneNumber, countryCode, mockUsername, mockName);
    onNavigate("otp_verification");
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-th-body">
      {/* Header */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface shadow-xs flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl border border-white/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("welcome")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ลงทะเบียน
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 w-full max-w-[440px] mx-auto pt-28">
        <div className="w-full glass-surface rounded-3xl p-8 flex flex-col items-center shadow-xs border border-white/80 relative">
          <div id="recaptcha-container"></div>
          {/* Shield Icon */}
          <div className="w-16 h-16 rounded-full glass-surface border border-white/60 shadow-inner flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-[#7e5356]" strokeWidth={2.5} />
          </div>

          <div className="text-center mb-8">
            <h1 className="font-th-heading text-3xl font-bold text-[#7e5356] mb-3">
              ลงทะเบียน
            </h1>
            <p className="font-th-body text-[15px] text-[#45474a]">
              เริ่มต้นการเดินทางที่ปลอดภัยไปกับเรา
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="text-left w-full">
              <label className="block text-xs font-bold text-[#45474a] font-th-heading mb-2 ml-1 uppercase tracking-wider">
                เบอร์โทรศัพท์
              </label>
              <div className="flex glass-input rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#7e5356]/30 focus-within:border-[#7e5356] transition-all">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="py-4 px-4 bg-transparent text-[15px] font-bold text-[#7e5356] border-r border-white/20 focus:outline-none cursor-pointer"
                >
                  <option value="+66">+66</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="XX-XXX-XXXX"
                  className="flex-1 px-4 py-4 bg-transparent text-[15px] font-th-body text-[#1b1b1d] focus:outline-none placeholder:text-[#c6c6ca]"
                />
              </div>
            </div>

            <button
              className="w-full py-4 rounded-full glass-button-primary font-th-body font-bold text-[15px] transition-all disabled:opacity-50"
              type="submit"
              disabled={isChecking || !phoneNumber}
            >
              {isChecking ? "กำลังโหลด..." : "ลงทะเบียนด้วยเบอร์โทรศัพท์"}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/40"></div>
              </div>
              <div className="relative flex justify-center text-[13px]">
                <span className="px-4 glass-surface rounded-full text-[#76777b] font-th-heading font-semibold">
                  หรือ
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            {onGoogleSignIn && (
              <button
                className="w-full py-3.5 px-4 rounded-full glass-button-secondary text-[#1b1b1d] font-th-body font-medium text-[15px] flex items-center justify-center gap-3 transition-all"
                type="button"
                onClick={onGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>ลงทะเบียนด้วย Gmail</span>
              </button>
            )}
          </form>

          {/* Terms Text */}
          <div className="mt-8 text-center">
            <p className="text-[12px] leading-relaxed text-[#76777b] font-[Prompt]">
              การกดปุ่มลงทะเบียนแสดงว่าคุณยอมรับ{" "}
              <span className="font-semibold underline decoration-[#c6c6ca] underline-offset-2">
                ข้อกำหนดและเงื่อนไขการใช้งาน
              </span>{" "}
              รวมถึง{" "}
              <span className="font-semibold underline decoration-[#c6c6ca] underline-offset-2">
                นโยบายความเป็นส่วนตัว
              </span>{" "}
              ของระบบ NEWFOUND อย่างเป็นทางการ
            </p>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="mt-8 mb-6 flex flex-col items-center">
          <p className="font-[Prompt] text-[10px] tracking-[0.2em] font-bold text-[#76777b]/80 uppercase">
            Secured by Newfound Protocol
          </p>
          <div className="w-16 h-[3px] bg-[#dcd9dc] rounded-full mt-4"></div>
        </div>
      </main>
    </div>
  );
};
