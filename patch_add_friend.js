import fs from 'fs';

const code = `
import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Search, UserPlus, CheckCircle2, QrCode } from 'lucide-react';
import { Language, ScreenId } from '../types';
import { getTranslation } from '../locales/i18n';
import { FirebaseService } from '../services/firebaseService';

interface AddFriendScreenProps {
  activeLanguage: Language;
  currentUser: any;
  onNavigate: (screen: ScreenId) => void;
}

export const AddFriendScreen: React.FC<AddFriendScreenProps> = ({
  activeLanguage,
  currentUser,
  onNavigate
}) => {
  const [friendCode, setFriendCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendCode.trim()) return;
    setLoading(true);
    setResult(null);

    const success = await FirebaseService.addFriend(currentUser.uid, friendCode.trim());
    if (success) {
      setResult('success');
      setTimeout(() => {
        onNavigate('chat_list');
      }, 2000);
    } else {
      setResult('error');
    }
    setLoading(false);
  };

  return (
    <div className="text-[#1b1b1d] font-th-body" style={{ background: 'linear-gradient(135deg, #fcf8fb 0%, #f0edef 100%)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Top AppBar */}
      <header className="fixed top-4 left-4 right-4 rounded-full bg-[#fcf8fb]/80 backdrop-blur-[30px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] flex justify-between items-center w-[calc(100%-32px)] px-6 py-2 z-50 mx-auto">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#633c3f] cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onNavigate('chat_list')}>arrow_back_ios_new</span>
          <h1 className="font-th-heading text-[20px] font-bold text-[#7e5356] tracking-tighter">เพิ่มเพื่อน</h1>
        </div>
        <div onClick={() => onNavigate('account')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 ring-1 ring-[#7e5356]/20 cursor-pointer">
          <img 
            className="w-full h-full object-cover" 
            alt="Profile" 
            src={currentUser?.photoURL || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(currentUser?.displayName || 'U')}&background=random\`} 
          />
        </div>
      </header>

      <main className="pt-28 pb-32 px-5 max-w-2xl mx-auto">
        
        {/* Search Induction Section */}
        <section className="mb-10">
          <form onSubmit={handleAddFriend} className="p-2 rounded-2xl flex items-center gap-3 group focus-within:ring-2 ring-[#7e5356]/30 transition-all duration-300" style={{ background: 'rgba(252, 248, 251, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.6)' }}>
            <span className="material-symbols-outlined pl-3 text-[#504444]">search</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 font-th-body text-[17px] placeholder:text-[#504444]/50 outline-none" 
              placeholder="ค้นหาด้วยเบอร์โทร / Username" 
              type="text" 
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading || !friendCode.trim()}
              className="text-white px-6 py-2 rounded-xl font-label-caps text-[12px] font-bold hover:opacity-90 transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #f0b9bc 0%, #7e5356 100%)' }}
            >
              {loading ? '...' : 'ค้นหา'}
            </button>
          </form>
          {result === 'success' && <p className="text-emerald-600 mt-2 text-sm text-center">เพิ่มเพื่อนสำเร็จ!</p>}
          {result === 'error' && <p className="text-rose-600 mt-2 text-sm text-center">ไม่พบเพื่อนรหัสนี้</p>}
        </section>

        {/* Quick Actions Bento */}
        <section className="grid grid-cols-2 gap-4 mb-10">
          <div onClick={() => onNavigate('qr_scanner')} className="p-6 rounded-[32px] flex flex-col items-center justify-center text-center gap-3 cursor-pointer group" style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
            <div className="w-16 h-16 rounded-full bg-[#5d5e62] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#e4e2e4] text-[32px]">qr_code_scanner</span>
            </div>
            <div>
              <p className="font-th-heading text-[16px] font-semibold text-[#1b1b1d]">สแกน QR Code</p>
              <p className="font-th-body text-[12px] text-[#504444]/70">สแกนเพื่อเพิ่มทันที</p>
            </div>
          </div>
          
          <div onClick={() => onNavigate('my_qrcode')} className="p-6 rounded-[32px] flex flex-col items-center justify-center text-center gap-3 cursor-pointer group" style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
            <div className="w-16 h-16 rounded-full bg-[#7e5356] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-[32px]">qr_code</span>
            </div>
            <div>
              <p className="font-th-heading text-[16px] font-semibold text-[#1b1b1d]">QR ของฉัน</p>
              <p className="font-th-body text-[12px] text-[#504444]/70">แสดงคิวอาร์โค้ด</p>
            </div>
          </div>
        </section>

        {/* Suggested Friends */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="font-th-heading text-[20px] font-bold text-[#1b1b1d]">เพื่อนแนะนำ</h2>
          </div>
          
          <div className="space-y-4">
            {/* Dummy Friend 1 */}
            <div className="p-4 rounded-3xl flex items-center justify-between" style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/30">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd5ciMpA7mnGaARHa4PNPCi0Z89uhb7OAVUl9DQonuC6-EB72WPHegNlExYjRcsEH9w9-ZXUTIbcsxZ5UmKGXsXVOfgaTUK6prmsKpz4Hu8BVFqdUwHxNJCw4rh0lxZ2XQcMK55ARlW5F5x8RfLoh_SKbSpYFH9DsyklYSbcLPg5yRnS_AUf6pvrvUJ2opw3ITjFktuj_BdzlHMhE_droCd1-tqBMn-mAYboClgfxW3_H0cNXM7kFLw0Tm8T5LnQozuWJ3OXE3tqk" alt="User" />
                </div>
                <div>
                  <p className="font-th-heading text-[16px] font-semibold text-[#1b1b1d]">เมธา สุขสันต์</p>
                  <p className="font-th-body text-[12px] text-[#504444]/60">เพื่อนของคุณร่วมกัน 5 คน</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#7e5356]/30 text-[#7e5356] flex items-center justify-center hover:bg-[#7e5356] hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            
            {/* Dummy Friend 2 */}
            <div className="p-4 rounded-3xl flex items-center justify-between" style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/30">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR8qYgQGuh4q5-4_eASV5aOHp-w5lxOi03fk779ay1W_pNcspBuoTsigPbljCX5R_7B46Xn4ZWYpsLJvQWu3dZZVkx0Lsoh4Hilvc01BoS-hDpYRlFHxj4RhRIkysQdGTz67rSgrDW9MUtj7oxIL4OsBryaGptjZ85A1qX-fNfHTWRTLACM5hIXgK7rlVmqSucgCknHkqxkAcW9daep_DAq-kmCYP_Voi8MuNghpzgYb9VaSqViOEjWbOOlxJHOBiNm1brklgS44k" alt="User" />
                </div>
                <div>
                  <p className="font-th-heading text-[16px] font-semibold text-[#1b1b1d]">รินรดา วิเศษกุล</p>
                  <p className="font-th-body text-[12px] text-[#504444]/60">จากรายชื่อผู้ติดต่อของคุณ</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#7e5356]/30 text-[#7e5356] flex items-center justify-center hover:bg-[#7e5356] hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-0 w-full z-50 flex justify-center items-center px-6">
        <div className="flex justify-around items-center w-full max-w-md bg-[#fcf8fb]/80 backdrop-blur-[30px] border border-white/20 rounded-full px-4 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
          <button onClick={() => onNavigate('chat_list')} className="flex flex-col items-center justify-center text-[#504444]/60 hover:text-[#7e5356] transition-colors px-6 py-2">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-label-caps text-[12px] font-semibold mt-1">แชท</span>
          </button>
          <button onClick={() => onNavigate('security_setup')} className="flex flex-col items-center justify-center bg-[#f0b9bc]/20 text-[#7e5356] rounded-full px-6 py-2 active:scale-90 duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="font-label-caps text-[12px] font-semibold mt-1">ความปลอดภัย</span>
          </button>
          <button onClick={() => onNavigate('settings_account')} className="flex flex-col items-center justify-center text-[#504444]/60 hover:text-[#7e5356] transition-colors px-6 py-2">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps text-[12px] font-semibold mt-1">การตั้งค่า</span>
          </button>
        </div>
      </nav>

    </div>
  );
};
`
fs.writeFileSync('src/screens/AddFriendScreen.tsx', code);
console.log('AddFriendScreen updated');
