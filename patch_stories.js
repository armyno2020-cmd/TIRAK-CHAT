import fs from 'fs';

const code = `
import React, { useState, useEffect } from 'react';
import { Plus, Eye, X, Send, Heart, CircleDot, MoreHorizontal } from 'lucide-react';
import { Language, ScreenId, StoryItem } from '../types';
import { getTranslation } from '../locales/i18n';

interface StoriesScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  activeLanguage,
  onNavigate
}) => {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [progress, setProgress] = useState(0);

  // Auto close story simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeStory) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setActiveStory(null);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds total
    }
    return () => clearInterval(timer);
  }, [activeStory]);

  const handleAddStory = () => {
    const newStory: StoryItem = {
      id: 'story_' + Date.now(),
      authorUid: 'user_me_001',
      authorName: 'Newfound_User',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApQVXc5Moqz21S2jQws6i-F5MlmrzfDGibo4Uc05eSYMCumUmFuEa0VHCRsiN2oW0rYr2hTBQhjrawnY29XoLDjCo-8DKxgGMd746TmNgUyiANuhPMSNkM0nxLqg0zLPy0BV4wM2ZLDR_wa13kisQiSL_IGBN6RwKObaO652a1-ZVZBLQi1RsrA5fEO4BVqwprr8n5vAS0_U2rwPCo-MdONUznUQjgSJxqjnuKkZiULCoFZwzooPnGMBcSI_bOTVHpyh1eZEbFc68',
      mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWAMPBrZJsQC-iauJRi_o7ShYzRSnvMdytg6ZihBd1QbEb_G3BUXNPXjeaxniQk1yPNtjjOZIeHv-ZhOj6a6On98-R7uXN1cnx_pB10L4rACPYeVOz67pfsIuR6Gv2GGIY-e2L7HaEwLlGrM5iRZZ0mTVEEQ5MtB_R3rN3saaGcCFmB8Kh5saeljI_PErmmTLuSvdww80JHbqjl_dszTWjgz-RIoil1r5AZmJXoKoVS7EeVgJ429v6vj_4o9lT1v1a1RhE0wbU-So',
      mediaType: 'image',
      textCaption: '',
      createdAt: Date.now()
    };
    setActiveStory(newStory);
  };

  return (
    <div className="bg-[#1b1b1d] text-white overflow-hidden h-screen w-full font-th-body">
      
      {/* If no active story, we show the viewer but let's just make the whole screen the viewer as per HTML */}
      {!activeStory ? (
        <div className="h-full flex items-center justify-center bg-[#fcf8fb] flex-col gap-4 relative">
          {/* Top AppBar */}
          <header className="fixed top-4 left-4 right-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-[30px] border border-[#1b1b1d]/10 shadow-sm flex justify-between items-center w-[calc(100%-32px)] px-6 py-2 z-50 mx-auto">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#633c3f] cursor-pointer hover:opacity-80" onClick={() => onNavigate('chat_list')}>arrow_back_ios_new</span>
              <h1 className="font-th-heading text-[20px] font-bold text-[#1b1b1d] tracking-tighter">สตอรี่</h1>
            </div>
          </header>
          
          <button onClick={handleAddStory} className="px-6 py-3 rounded-full bg-[#7e5356] text-white font-bold shadow-lg active:scale-95 transition-transform">
            ดูสตอรี่ (View Story)
          </button>
        </div>
      ) : (
        <main className="relative h-screen w-full bg-black overflow-hidden flex flex-col animate-fade-in">
          {/* Background Asset */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Story" src={activeStory.mediaUrl} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          </div>
          
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 px-4 py-3">
            <div className="h-0.5 flex-grow bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-75 ease-linear" style={{ width: '100%' }}></div>
            </div>
            <div className="h-0.5 flex-grow bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-75 ease-linear" style={{ width: \`\${progress}%\` }}></div>
            </div>
            <div className="h-0.5 flex-grow bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-75 ease-linear" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          {/* Top AppBar */}
          <header className="absolute top-8 left-4 right-4 z-50 flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#ffdadb] p-0.5 overflow-hidden">
                <img className="w-full h-full object-cover rounded-full" alt="User" src={activeStory.authorAvatar} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-th-heading text-[16px] font-semibold leading-tight">{activeStory.authorName}</span>
                <span className="text-white/70 font-label-caps text-[12px] uppercase">2 ชั่วโมงที่แล้ว</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white/80 hover:text-white transition-opacity active:scale-95">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
              <button onClick={() => setActiveStory(null)} className="text-white/80 hover:text-white transition-opacity active:scale-95">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>
          
          {/* Navigation Hitbox */}
          <div className="absolute inset-0 z-10 flex">
            <div className="w-1/4 h-full" onClick={() => setProgress(0)}></div>
            <div className="w-3/4 h-full" onClick={() => setActiveStory(null)}></div>
          </div>
          
          {/* Interactive Content Layer */}
          <div className="relative z-20 mt-auto px-5 pb-10 w-full pointer-events-none">
            
            {/* Animated Reaction Chips */}
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pointer-events-auto">
              <button className="bg-[#fcf8fb]/40 backdrop-blur-[30px] border border-white/30 text-white px-4 py-2 rounded-full font-label-caps text-[12px] flex items-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span>ชอบมาก</span>
              </button>
              <button className="bg-[#fcf8fb]/40 backdrop-blur-[30px] border border-white/30 text-white px-4 py-2 rounded-full font-label-caps text-[12px] flex items-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[18px]">mood</span>
                <span>ฮ่าๆ</span>
              </button>
              <button className="bg-[#fcf8fb]/40 backdrop-blur-[30px] border border-white/30 text-white px-4 py-2 rounded-full font-label-caps text-[12px] flex items-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[18px]">celebration</span>
                <span>ยินดีด้วย!</span>
              </button>
            </div>
            
            {/* Reply Input Field */}
            <div className="flex items-center gap-4 pointer-events-auto">
              <div className="flex-grow relative">
                <input 
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3.5 text-white placeholder:text-white/50 focus:ring-2 focus:ring-[#ffdadb] outline-none font-th-body text-[17px]" 
                  placeholder="ส่งข้อความตอบกลับ..." 
                  type="text" 
                />
              </div>
              <button className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white active:scale-95 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white active:scale-95 transition-transform">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            
          </div>
          
          {/* Bottom Safe Area Indicator */}
          <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
        </main>
      )}
    </div>
  );
};
`
fs.writeFileSync('src/screens/StoriesScreen.tsx', code);
console.log('StoriesScreen updated');
