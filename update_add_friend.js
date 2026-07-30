import fs from 'fs';

const content = `import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus, Shield, ScanLine, Smartphone } from 'lucide-react';
import { ScreenId } from '../types';
import { FirebaseService } from '../services/firebaseService';

interface AddFriendScreenProps {
  currentUser: any;
  onNavigate: (screen: ScreenId) => void;
}

export const AddFriendScreen: React.FC<AddFriendScreenProps> = ({ currentUser, onNavigate }) => {
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
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body flex flex-col relative overflow-hidden">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('chat_list')} className="text-[#5d5e63] active:scale-95 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</span>
        </div>
      </header>

      <main className="pt-32 pb-24 px-5 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-4">Add Friend</h1>
          <p className="text-[#45474a] font-th-body text-[17px] max-w-sm">Connect with colleagues securely via ID or QR Code.</p>
        </div>

        <section className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 rounded-[32px] p-6 shadow-sm mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffefef]/50 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <form onSubmit={handleAddFriend} className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label className="font-th-heading text-[12px] font-semibold text-[#45474a] tracking-widest uppercase ml-2">Newfound ID or Phone</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value)}
                  placeholder="@username or +66..." 
                  className="w-full h-14 bg-white/40 border border-white/60 rounded-full pl-12 pr-4 font-th-body text-[17px] focus:outline-none focus:ring-2 focus:ring-[#7e5356]/30 transition-all shadow-inner" 
                />
                <Search className="w-5 h-5 text-[#45474a]/50 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !friendCode.trim()}
              className="w-full h-14 bg-gradient-to-r from-[#7e5356] to-[#f0b9bc] text-white rounded-full font-th-heading text-[17px] font-bold shadow-lg shadow-[#7e5356]/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <UserPlus className="w-5 h-5" />
              {loading ? 'Searching...' : 'Send Request'}
            </button>
            {result === 'success' && <p className="text-[#7e5356] text-center font-bold">Friend added successfully!</p>}
            {result === 'error' && <p className="text-[#ba1a1a] text-center font-bold">Failed to add friend. Try again.</p>}
          </form>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <button onClick={() => onNavigate('qr_scanner')} className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 p-6 rounded-[24px] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/40">
            <div className="w-12 h-12 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="font-th-heading text-[14px] font-bold text-[#1b1b1d]">Scan QR Code</span>
          </button>
          
          <button onClick={() => onNavigate('contact_sync')} className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 p-6 rounded-[24px] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/40">
            <div className="w-12 h-12 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-th-heading text-[14px] font-bold text-[#1b1b1d]">Sync Contacts</span>
          </button>
        </section>
      </main>

      <footer className="mt-auto pb-8 flex justify-center w-full">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f6f3f5]/80 backdrop-blur-md rounded-full border border-[#c6c6ca]/10">
          <Shield className="w-3 h-3 text-[#5d5e63]" />
          <span className="font-th-body text-[10px] font-bold text-[#45474a] uppercase tracking-[0.2em]">Verified Secure Search</span>
        </div>
      </footer>
    </div>
  );
};
`
fs.writeFileSync('src/screens/AddFriendScreen.tsx', content);
console.log("Updated AddFriendScreen");
