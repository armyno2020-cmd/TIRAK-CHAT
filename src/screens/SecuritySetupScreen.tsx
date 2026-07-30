import React, { useState, useEffect } from "react";
import { ArrowLeft, Shield, Delete } from "lucide-react";
import { ScreenId } from "../types";

interface SecuritySetupScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onComplete: (pin: string) => void;
}

export const SecuritySetupScreen: React.FC<SecuritySetupScreenProps> = ({
  onNavigate,
  onComplete,
}) => {
  const [pin, setPin] = useState("");

  const handleInput = (val: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + val);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => onComplete(pin), 300);
    }
  }, [pin, onComplete]);

  return (
    <div className="bg-transparent text-[#1b1b1d] min-h-screen flex flex-col items-center justify-center p-5 md:p-16 font-th-body overflow-hidden relative">
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            ความปลอดภัย
          </span>
        </div>
      </header>

      <main className="w-full max-w-md flex flex-col items-center mt-20 mb-32 z-10">
        <div className="text-center mb-10">
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-2">
            Secure Access
          </h2>
          <p className="font-th-body text-[17px] text-[#45474a] max-w-xs mx-auto">
            Create a personal PIN to encrypt your secure vault.
          </p>
        </div>

        <section className="glass-surface border border-white/40 w-full rounded-[32px] p-8 mb-6 flex flex-col items-center shadow-lg">
          <div className="flex gap-4 mb-10">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${i < pin.length ? "glass-button-primary border-[#7e5356] scale-110" : "border-[#c6c6ca]"}`}
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-y-4 gap-x-8 w-full max-w-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                className="glass-button-secondary h-16 flex items-center justify-center font-th-heading text-2xl font-bold text-[#1b1b1d] rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all"
                key={num}
                onClick={() => handleInput(num.toString())}
              >
                {num}
              </button>
            ))}
            <div className="h-16"></div>
            <button
              className="glass-button-secondary h-16 flex items-center justify-center font-th-heading text-2xl font-bold text-[#1b1b1d] rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all"
              onClick={() => handleInput("0")}
            >
              0
            </button>
            <button
              className="glass-button-secondary h-16 flex items-center justify-center rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all"
              onClick={handleDelete}
            >
              <Delete className="text-[#45474a] w-6 h-6" />
            </button>
          </div>
        </section>

        <div className="mt-10 w-full flex flex-col gap-4">
          <button
            className="glass-button-secondary w-full h-14 bg-gradient-to-r from-[#7e5356] to-[#f0b9bc] text-white font-th-heading font-bold text-[17px] rounded-full shadow-lg active:scale-95 transition-all"
            onClick={() => onComplete(pin)}
          >
            Continue
          </button>
          <button
            className="glass-button-secondary w-full h-14 glass-surface border border-white/40 text-[#1b1b1d] font-th-body text-[17px] rounded-full active:scale-95 transition-all"
            onClick={() => onNavigate("settings_account")}
          >
            Skip for now
          </button>
        </div>
      </main>

      <footer className="fixed bottom-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f6f3f5]/80 backdrop-blur-md rounded-full border border-[#c6c6ca]/10">
          <Shield className="w-3 h-3 text-[#5d5e63]" />
          <span className="font-th-body text-[10px] font-bold text-[#45474a] uppercase tracking-[0.2em]">
            End-to-End Encrypted
          </span>
        </div>
      </footer>
    </div>
  );
};
