import fs from 'fs';

const code = `
import React from 'react';
import {  
  User, ShieldCheck, Bell, HardDrive, HelpCircle, LogOut, Trash2, 
  Phone, Smartphone, Globe, ChevronRight, Lock, Phone as PhoneIcon, Mail, FileText, Language as GlobeIcon
} from 'lucide-react';
import { Language, ScreenId, UserProfile } from '../types';
import { getTranslation } from '../locales/i18n';

interface AccountScreenProps {
  activeLanguage: Language;
  currentUser: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  activeLanguage,
  currentUser,
  onNavigate,
  onOpenLanguageModal,
  onLogout
}) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] antialiased min-h-screen pb-32 font-th-body" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(126, 83, 86, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(69, 71, 75, 0.05), transparent 25%)', backgroundAttachment: 'fixed' }}>
      
      {/* TopAppBar */}
      <header className="bg-[#fcf8fb]/60 backdrop-blur-[40px] sticky top-0 border-b border-white/20 shadow-sm flex justify-between items-center px-5 h-16 w-full z-40">
        <button className="text-[#504444] hover:opacity-80 active:scale-95 transition-all duration-200">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="font-th-heading text-[20px] font-semibold tracking-tight text-[#1b1b1d]">TIRAK CHAT</h1>
        <button className="text-[#504444] hover:opacity-80 active:scale-95 transition-all duration-200">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-5 pt-6 flex flex-col gap-6">
        {/* Profile Header */}
        <section className="glass-card rounded-[1rem] p-6 flex items-center gap-4 relative overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#633c3f]/10 rounded-full blur-2xl"></div>
          
          <div className="relative w-20 h-20 shrink-0">
            <img 
              className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm" 
              alt={currentUser.displayName} 
              src={currentUser.photoURL || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(currentUser.displayName)}&background=random\`} 
            />
            <button onClick={() => onNavigate('profile_setup')} className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#633c3f] hover:bg-[#e4e2e4] transition-colors active:scale-95">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="font-th-heading text-[24px] font-semibold text-[#1b1b1d] mb-1">{currentUser.displayName}</h2>
            <p className="font-th-body text-[14px] text-[#504444]">{currentUser.phone}</p>
            <p className="font-th-body text-[14px] text-[#633c3f] mt-1">@{currentUser.username}</p>
          </div>
        </section>

        {/* Account Settings */}
        <section className="flex flex-col gap-2">
          <h3 className="font-label-caps text-[12px] font-semibold text-[#504444] uppercase px-2 tracking-wide">บัญชี</h3>
          <div className="glass-card rounded-[1rem] overflow-hidden flex flex-col" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
            
            <button className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">phone_iphone</span>
                <span className="font-th-body text-[17px]">เปลี่ยนหมายเลขโทรศัพท์</span>
              </div>
              <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
            </button>
            
            <button className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">mail</span>
                <span className="font-th-body text-[17px]">ที่อยู่อีเมล</span>
              </div>
              <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
            </button>
            
            <button className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">description</span>
                <span className="font-th-body text-[17px]">ขอข้อมูลบัญชี</span>
              </div>
              <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
            </button>

            <button onClick={() => onNavigate('settings_privacy')} className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">shield_lock</span>
                <span className="font-th-body text-[17px]">{getTranslation(activeLanguage, 'privacySecurity')}</span>
              </div>
              <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
            </button>
            
            <button onClick={() => {
              if (confirm('Are you sure you want to permanently delete your account?')) {
                onLogout();
              }
            }} className="flex items-center justify-between p-4 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#ba1a1a]">
                <span className="material-symbols-outlined">delete</span>
                <span className="font-th-body text-[17px]">ลบบัญชี</span>
              </div>
              <span className="material-symbols-outlined text-[#ba1a1a]/70">chevron_right</span>
            </button>

          </div>
        </section>

        {/* Settings Category */}
        <section className="flex flex-col gap-2">
          <h3 className="font-label-caps text-[12px] font-semibold text-[#504444] uppercase px-2 tracking-wide">ตั้งค่าอื่นๆ</h3>
          <div className="glass-card rounded-[1rem] overflow-hidden flex flex-col" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)' }}>
            
            <button onClick={onOpenLanguageModal} className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">language</span>
                <span className="font-th-body text-[17px]">ภาษา</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-th-body text-[14px] text-[#504444]">{activeLanguage === 'th' ? 'ไทย' : 'English'}</span>
                <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
              </div>
            </button>
            
            <button className="flex items-center justify-between p-4 border-b border-white/40 hover:bg-white/60 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 text-[#1b1b1d]">
                <span className="material-symbols-outlined text-[#633c3f]">help</span>
                <span className="font-th-body text-[17px]">ความช่วยเหลือ</span>
              </div>
              <span className="material-symbols-outlined text-[#504444]">chevron_right</span>
            </button>
            
            <button onClick={onLogout} className="flex items-center justify-center p-4 hover:bg-white/60 active:scale-[0.98] transition-all">
              <span className="font-th-body text-[17px] text-[#ba1a1a] font-medium">ออกจากระบบ</span>
            </button>
            
          </div>
        </section>
      </main>
    </div>
  );
};
`
fs.writeFileSync('src/screens/AccountScreen.tsx', code);
console.log('AccountScreen updated');
