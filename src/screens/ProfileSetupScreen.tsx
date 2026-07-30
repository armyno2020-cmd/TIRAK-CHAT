// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  HelpCircle,
  Camera,
  Edit2,
  CheckCircle2,
  ArrowRight,
  User,
  Image as ImageIcon,
} from "lucide-react";
import { ScreenId } from "../types";
import { FirebaseService } from "../services/firebaseService";

export const ProfileSetupScreen: React.FC<any> = (props) => {
  const {
    onNavigate,
    activeLanguage,
    currentUser,
    onUpdateUser,
  } = props || {};

  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [bio, setBio] = useState(currentUser?.bio || currentUser?.statusMessage || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [customPhotoInput, setCustomPhotoInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.displayName) setDisplayName(currentUser.displayName);
      if (currentUser.username) setUsername(currentUser.username);
      if (currentUser.bio || currentUser.statusMessage) setBio(currentUser.bio || currentUser.statusMessage);
      if (currentUser.photoURL) setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const presetAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      ...currentUser,
      uid: currentUser?.uid,
      displayName: displayName.trim() || currentUser?.displayName || "ผู้ใช้งาน TIRAK",
      username: username.trim() || currentUser?.username || "user",
      bio: bio.trim(),
      statusMessage: bio.trim(),
      photoURL: photoURL || currentUser?.photoURL || presetAvatars[0],
    };

    try {
      if (onUpdateUser) {
        await onUpdateUser(updatedData);
      } else {
        await FirebaseService.saveUserProfile(updatedData);
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onNavigate) {
          onNavigate("settings_account");
        }
      }, 1200);
    } catch (err) {
      console.error("Profile update failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-y-auto">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface shadow-2xs flex items-center gap-3 w-full shrink-0 border-b border-white/60">
        <button
          onClick={() => onNavigate && onNavigate("settings_account")}
          className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
          ตั้งค่าโปรไฟล์
        </span>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h1 className="font-th-heading text-2xl font-bold">แก้ไขโปรไฟล์ของคุณ</h1>
            <p className="text-xs text-[#687280] max-w-xs mx-auto leading-relaxed">
              อัปเดตข้อมูลส่วนตัว ชื่อผู้ใช้ และรูปโปรไฟล์
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => setShowAvatarOptions(!showAvatarOptions)}
              className="relative group cursor-pointer"
            >
              <div className="relative p-1.5 rounded-full glass-surface shadow-xs w-28 h-28 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden glass-surface relative flex items-center justify-center border border-white/80">
                  <img
                    className="rounded-full shadow-sm w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    alt="Profile"
                    src={
                      photoURL ||
                      currentUser?.photoURL ||
                      presetAvatars[0]
                    }
                  />
                  <div className="absolute inset-0 bg-[#1b1b1d]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 glass-button-primary p-2 rounded-full shadow-md border-2 border-white">
                <Edit2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Avatar Picker Dropdown */}
            {showAvatarOptions && (
              <div className="glass-surface p-4 rounded-2xl w-full max-w-sm space-y-3 border border-white/60 shadow-md">
                <p className="text-xs font-bold text-[#45474a] text-center">เลือกรูปโปรไฟล์สำเร็จรูป</p>
                <div className="flex justify-center gap-2">
                  {presetAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPhotoURL(url);
                        setShowAvatarOptions(false);
                      }}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        photoURL === url ? "border-[#7e5356] scale-110 shadow-sm" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/40 space-y-2">
                  <p className="text-[11px] font-bold text-[#45474a]">อัปโหลดจากเครื่องของคุณ:</p>
                  <label className="w-full glass-button-primary py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs cursor-pointer shadow-xs font-bold">
                    <ImageIcon className="w-4 h-4" />
                    <span>เลือกรูปภาพจากเครื่อง</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setPhotoURL(event.target.result as string);
                              setShowAvatarOptions(false);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <p className="text-[11px] text-[#687280] pt-1">หรือระบุ URL รูปภาพ:</p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customPhotoInput}
                      onChange={(e) => setCustomPhotoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl glass-input text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customPhotoInput.trim()) {
                          setPhotoURL(customPhotoInput.trim());
                          setCustomPhotoInput("");
                          setShowAvatarOptions(false);
                        }
                      }}
                      className="glass-button-primary px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      ตกลง
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 glass-surface p-6 md:p-8 rounded-3xl border border-white/80 shadow-xs"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#45474a] ml-1">
                  ชื่อแสดงผล (Display Name)
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full px-4 py-3.5 rounded-[16px] glass-input text-[15px] font-bold text-[#1b1b1d]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#45474a] ml-1">
                  ชื่อผู้ใช้ (Username)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-sm text-[#7e5356] font-bold">
                    @
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="username"
                    className="w-full pl-10 pr-4 py-3.5 rounded-[16px] glass-input text-[15px] text-[#1b1b1d]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[#45474a] ml-1">
                  สถานะ / คำแนะนำตัว (Bio)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="เขียนสถานะหรือบอกเล่าเรื่องราวของคุณ..."
                  className="w-full px-4 py-3.5 rounded-[16px] glass-input text-[15px] resize-none text-[#1b1b1d]"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full font-medium text-[15px] flex items-center justify-center gap-2 cursor-pointer glass-button-primary transition-all active:scale-98 shadow-sm"
              >
                {isSubmitting ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> บันทึกโปรไฟล์เรียบร้อยแล้ว
                  </>
                ) : (
                  <>
                    บันทึกข้อมูล <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center font-th-body text-[12px] text-[#687280] px-4">
            ข้อมูลโปรไฟล์ที่คุณบันทึกจะถูกซิงก์ไปยัง Firestore อย่างปลอดภัยและเข้ารหัสตามมาตรฐาน Tirak Chat
          </p>
        </div>
      </main>
    </div>
  );
};

