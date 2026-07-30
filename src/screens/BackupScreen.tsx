import React, { useState } from "react";
import {
  ArrowLeft,
  HardDrive,
  Cloud,
  Download,
  CheckCircle,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface BackupScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const BackupScreen: React.FC<BackupScreenProps> = ({
  activeLanguage,
  onNavigate,
}) => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState<string>("Today at 02:30 AM");

  const handleRunBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setLastBackup("Just now");
    }, 1500);
  };

  const handleExportJSON = () => {
    const backupData = {
      app: "NEWFOUND",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      encrypted: true,
      data: "E2EE-ENCRYPTED-PAYLOAD-V1",
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tirak-chat-encrypted-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col bg-transparent font-th-body text-[#1b1b1d] relative">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex items-center gap-3 w-full shrink-0">
        <button
          onClick={() => onNavigate("settings_account")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-th-heading text-[18px] font-bold text-[#7e5356] tracking-tight">
          {getTranslation(activeLanguage, "storageBackup")}
        </h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full space-y-4">
        {/* Cloud & Local Backup Card */}
        <div className="glass-surface p-5 rounded-2xl border border-white/80 shadow-2xs space-y-4 glass-surface">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl glass-button-primary/10 text-[#7e5356] flex items-center justify-center shrink-0">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-th-heading text-base font-bold text-[#1b1b1d]">
                  พื้นที่สำรองข้อมูลบนคลาวด์เข้ารหัส
                </h3>
                <p className="text-xs text-[#687280]">
                  สำรองข้อมูลล่าสุด:{" "}
                  <span className="font-bold text-[#1b1b1d]">{lastBackup}</span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
              <Lock className="w-3.5 h-3.5 mr-1" /> AES-256
            </span>
          </div>

          <button
            className="w-full py-3 rounded-xl glass-button-primary font-th-heading font-bold text-sm flex items-center justify-center space-x-2 active:scale-98 transition-all cursor-pointer shadow-2xs"
            onClick={handleRunBackup}
            disabled={isBackingUp}
          >
            <RefreshCw
              className={`w-4 h-4 ${isBackingUp ? "animate-spin" : ""}`}
            />
            <span>
              {isBackingUp
                ? "กำลังเข้ารหัสและสำรองข้อมูล..."
                : getTranslation(activeLanguage, "backupNow")}
            </span>
          </button>
        </div>

        {/* Export Options */}
        <div className="glass-surface p-5 rounded-2xl border border-white/80 shadow-2xs space-y-3 glass-surface">
          <h4 className="font-th-heading text-sm font-bold text-[#1b1b1d]">
            การจัดการไฟล์ในเครื่อง
          </h4>

          <button
            className="glass-button-secondary w-full py-2.5 rounded-xl glass-surface text-[#1b1b1d] font-th-heading font-bold text-xs border border-white/40 flex items-center justify-center space-x-2 active:scale-98 transition-all cursor-pointer"
            onClick={handleExportJSON}
          >
            <Download className="w-4 h-4 text-[#7e5356]" />
            <span>{getTranslation(activeLanguage, "exportHistory")}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
