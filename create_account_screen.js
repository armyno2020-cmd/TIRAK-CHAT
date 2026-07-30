import fs from 'fs';

const content = `import React from 'react';
import { User, ShieldCheck, Bell, HardDrive, HelpCircle, LogOut, Trash2, Phone, Smartphone, Globe, ChevronRight, Lock, Phone as PhoneIcon, Mail, FileText, Languages as GlobeIcon } from 'lucide-react';
import { Language, ScreenId, UserProfile } from '../types';
import { getTranslation } from '../locales/i18n';

interface AccountScreenProps {
  activeLanguage: Language;
  currentUser: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ activeLanguage, currentUser, onNavigate, onOpenLanguageModal, onLogout }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] antialiased min-h-screen pb-32 font-th-body" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(126, 83, 86, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(69, 71, 75, 0.05), transparent 25%)', backgroundAttachment: 'fixed' }}>
      <header className="bg-[#fcf8fb]/60 backdrop-blur-[40px] sticky top-0 border-b border-white/20 shadow-sm flex justify-between items-center px-5 h-16 w-full z-40">
        <button className="text-[#504444] hover:opacity-80 active:scale-95 transition-all duration-200" onClick={() => onNavigate('chat_list')}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="font-th-heading text-[20px] font-semibold tracking-tight text-[#1b1b1d]">TIRAK CHAT</h1>
        <button className="text-[#504444] hover:opacity-80 active:scale-95 transition-all duration-200">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-5 pt-6 flex flex-col gap-6">
        {/* Profile Header */}
        <section className="glass-card rounded-[32px] p-6 flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#7e5356] to-white shadow-lg">
              <div className="w-full h-full rounded-full border-2 border-[#fcf8fb] overflow-hidden bg-white">
                <img className="w-full h-full object-cover" src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=User"} alt="Profile" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#7e5356] text-white rounded-full flex items-center justify-center border-2 border-[#fcf8fb] shadow-md hover:scale-105 active:scale-95 transition-transform" onClick={() => onNavigate('my_qrcode')}>
              <span className="material-symbols-outlined text-[16px]">qr_code</span>
            </button>
          </div>
          <h2 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] leading-tight mb-1">{currentUser?.displayName || 'User'}</h2>
          <p className="font-th-body text-[14px] text-[#45474a] mb-4">@{currentUser?.username || 'user'}</p>
          <div className="flex gap-2">
            <button className="bg-[rgba(255,255,255,0.6)] backdrop-blur-md border border-white/40 px-6 py-2.5 rounded-full font-th-body text-[14px] font-semibold text-[#1b1b1d] shadow-sm active:scale-95 transition-all hover:bg-white" onClick={() => onNavigate('profile_setup')}>
              แก้ไขโปรไฟล์
            </button>
            <button className="bg-[#7e5356] text-white px-6 py-2.5 rounded-full font-th-body text-[14px] font-semibold shadow-md active:scale-95 transition-all hover:opacity-90" onClick={() => onNavigate('add_friend')}>
              เพิ่มเพื่อน
            </button>
          </div>
        </section>

        {/* Account Details */}
        <section className="space-y-2">
          <h3 className="font-th-heading text-[14px] font-bold text-[#7e5356] px-4 tracking-wide uppercase">บัญชีผู้ใช้</h3>
          <div className="glass-card rounded-[24px] overflow-hidden flex flex-col">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/40 transition-colors border-b border-white/20 active:bg-white/60" onClick={() => onNavigate('security_setup')}>
              <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-semibold text-[#1b1b1d]">ความปลอดภัย</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c6c6ca]" />
            </button>

            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/40 transition-colors active:bg-white/60" onClick={() => onNavigate('permissions')}>
              <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-semibold text-[#1b1b1d]">ความเป็นส่วนตัว</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c6c6ca]" />
            </button>
          </div>
        </section>

        {/* General Settings */}
        <section className="space-y-2">
          <h3 className="font-th-heading text-[14px] font-bold text-[#7e5356] px-4 tracking-wide uppercase">ตั้งค่าทั่วไป</h3>
          <div className="glass-card rounded-[24px] overflow-hidden flex flex-col">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/40 transition-colors border-b border-white/20 active:bg-white/60">
              <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-semibold text-[#1b1b1d]">การแจ้งเตือน</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c6c6ca]" />
            </button>

            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/40 transition-colors border-b border-white/20 active:bg-white/60" onClick={() => onNavigate('data_usage')}>
              <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <HardDrive className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-semibold text-[#1b1b1d]">ข้อมูลและพื้นที่เก็บข้อมูล</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c6c6ca]" />
            </button>

            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/40 transition-colors active:bg-white/60" onClick={onOpenLanguageModal}>
              <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <GlobeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-semibold text-[#1b1b1d]">ภาษา (Language)</p>
                <p className="font-th-body text-[12px] text-[#45474a]">{getTranslation(activeLanguage, 'currentLanguage')} - {activeLanguage.toUpperCase()}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c6c6ca]" />
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-2 mt-4">
          <div className="glass-card rounded-[24px] overflow-hidden flex flex-col border-[#ffdadb]/50">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-[#ffefef]/50 transition-colors border-b border-[#ffdadb]/30 active:bg-[#ffefef]" onClick={onLogout}>
              <div className="w-10 h-10 rounded-full bg-[#ffefef] flex items-center justify-center text-[#ba1a1a]">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-bold text-[#ba1a1a]">ออกจากระบบ</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-[#ffefef]/50 transition-colors active:bg-[#ffefef]">
              <div className="w-10 h-10 rounded-full bg-[#ffefef] flex items-center justify-center text-[#ba1a1a]">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-th-body text-[16px] font-bold text-[#ba1a1a]">ลบบัญชีผู้ใช้</p>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
`
fs.writeFileSync('src/screens/AccountScreen.tsx', content);
