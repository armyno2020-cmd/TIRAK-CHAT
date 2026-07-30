import fs from 'fs';

const content = `import React, { useState, useEffect } from 'react';
import { Shield, Flashlight, Image as ImageIcon, ArrowLeft, Camera } from 'lucide-react';
import { ScreenId } from '../types';

export const QRScannerScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [flashOn, setFlashOn] = useState(false);

  return (
    <div className="bg-[#1b1b1d] min-h-screen text-white font-th-body flex flex-col relative overflow-hidden">
      {/* Mock Camera Background */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="w-full h-full opacity-30 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b")' }}></div>
      </div>

      <header className="absolute top-8 left-4 right-4 z-50 flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-white hover:opacity-80 active:scale-95 transition-all"><ArrowLeft className="w-6 h-6" /></button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setFlashOn(!flashOn)} className={\`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all \${flashOn ? 'bg-[#7e5356] text-white' : 'bg-black/40 backdrop-blur-md text-white'}\`}>
            <Flashlight className="w-5 h-5" />
          </button>
          <button className="text-white hover:opacity-80 active:scale-95 transition-all"><span className="material-symbols-outlined">more_horiz</span></button>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center z-10 w-full relative">
        <div className="text-center mb-8 absolute top-32">
          <h1 className="font-th-heading text-2xl font-bold mb-2 tracking-tight text-white shadow-sm">สแกนรหัส QR</h1>
          <p className="text-white/70 text-[14px]">จัดคิวอาร์โค้ดให้อยู่ในกรอบเพื่อสแกนอัตโนมัติ</p>
        </div>

        <div className="relative w-72 h-72">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#7e5356] rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#7e5356] rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#7e5356] rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#7e5356] rounded-br-2xl"></div>
          
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-xl flex items-center justify-center border border-white/10"></div>
          
          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#7e5356] shadow-[0_0_10px_#7e5356] transition-all duration-1000 ease-in-out"></div>
        </div>
        
        <button className="absolute bottom-32 w-16 h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-95 transition-all hover:bg-black/60 shadow-lg">
          <ImageIcon className="w-6 h-6 text-white" />
        </button>
      </main>
      
      <footer className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <Shield className="w-3 h-3 text-[#f0b9bc]" />
          <span className="font-th-body text-[10px] font-bold text-white/90 uppercase tracking-[0.2em]">Secure Scanner</span>
        </div>
      </footer>
    </div>
  );
};
`
fs.writeFileSync('src/screens/QRScannerScreen.tsx', content);
console.log("Updated QRScannerScreen");
