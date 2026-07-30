import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

// Define the screens to be created/updated based on the provided HTML structures
const screens = {
  'SecuritySetupScreen.tsx': `import React, { useState, useEffect } from 'react';
import { Shield, Backspace } from 'lucide-react';
import { ScreenId } from '../types';

interface SecuritySetupScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onComplete: (pin: string) => void;
}

export const SecuritySetupScreen: React.FC<SecuritySetupScreenProps> = ({ onNavigate, onComplete }) => {
  const [pin, setPin] = useState('');

  const handleInput = (val: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + val);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => onComplete(pin), 300);
    }
  }, [pin, onComplete]);

  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen flex flex-col items-center justify-center p-5 md:p-16 font-th-body overflow-hidden relative">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#5d5e63] text-2xl">shield_lock</span>
          <h1 className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#e0dfe4] flex items-center justify-center overflow-hidden border border-[#c6c6ca]/20" onClick={() => onNavigate('settings_account')}>
          <img className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=User" />
        </div>
      </header>

      <main className="w-full max-w-md flex flex-col items-center mt-20 mb-32 z-10">
        <div className="text-center mb-10">
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-2">Secure Access</h2>
          <p className="font-th-body text-[17px] text-[#45474a] max-w-xs mx-auto">Create a personal PIN to encrypt your secure vault.</p>
        </div>

        <section className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 w-full rounded-[32px] p-8 mb-6 flex flex-col items-center shadow-lg">
          <div className="flex gap-4 mb-10">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={\`w-4 h-4 rounded-full border-2 transition-all duration-200 \${i < pin.length ? 'bg-[#7e5356] border-[#7e5356] scale-110' : 'border-[#c6c6ca]'}\`}></div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-y-4 gap-x-8 w-full max-w-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} className="h-16 flex items-center justify-center font-th-heading text-2xl font-bold text-[#1b1b1d] rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all" onClick={() => handleInput(num.toString())}>{num}</button>
            ))}
            <div className="h-16"></div>
            <button className="h-16 flex items-center justify-center font-th-heading text-2xl font-bold text-[#1b1b1d] rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all" onClick={() => handleInput('0')}>0</button>
            <button className="h-16 flex items-center justify-center rounded-full active:scale-95 active:bg-[#5d5e63]/5 transition-all" onClick={handleDelete}>
              <Backspace className="text-[#45474a] w-6 h-6" />
            </button>
          </div>
        </section>

        <div className="mt-10 w-full flex flex-col gap-4">
          <button className="w-full h-14 bg-gradient-to-r from-[#7e5356] to-[#f0b9bc] text-white font-th-heading font-bold text-[17px] rounded-full shadow-lg active:scale-95 transition-all" onClick={() => onComplete(pin)}>
            Continue
          </button>
          <button className="w-full h-14 bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 text-[#1b1b1d] font-th-body text-[17px] rounded-full active:scale-95 transition-all" onClick={() => onNavigate('settings_account')}>
            Skip for now
          </button>
        </div>
      </main>

      <footer className="fixed bottom-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f6f3f5]/80 backdrop-blur-md rounded-full border border-[#c6c6ca]/10">
          <Shield className="w-3 h-3 text-[#5d5e63]" />
          <span className="font-th-body text-[10px] font-bold text-[#45474a] uppercase tracking-[0.2em]">End-to-End Encrypted</span>
        </div>
      </footer>
    </div>
  );
};
`,
  'PermissionsScreen.tsx': `import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Contact2, Bell, ArrowLeft } from 'lucide-react';
import { ScreenId } from '../types';

export const PermissionsScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [permissions, setPermissions] = useState({ camera: true, photos: false, contacts: true, notifications: false });

  const toggle = (key: keyof typeof permissions) => setPermissions(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body overflow-x-hidden">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63] active:scale-95 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</span>
        </div>
      </header>

      <main className="pt-32 pb-40 px-5 md:px-16 max-w-4xl mx-auto">
        <section className="mb-12 text-center md:text-left">
          <h1 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-4">Personal Control.</h1>
          <p className="text-[#45474a] font-th-body text-[17px] max-w-2xl">
            Configure how <span className="font-semibold text-[#7e5356]">Newfound</span> interacts with your device.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 'camera', icon: <Camera />, title: 'Camera', desc: 'Required for secure document verification and profile identification.', label: 'SECURE ACCESS' },
            { id: 'photos', icon: <ImageIcon />, title: 'Photos', desc: 'Allows you to upload existing identification and customize your professional presence.', label: 'LIMITED READ' },
            { id: 'contacts', icon: <Contact2 />, title: 'Contacts', desc: 'Sync your network to identify trusted collaborators and professional connections.', label: 'NETWORK SYNC' },
            { id: 'notifications', icon: <Bell />, title: 'Notifications', desc: 'Critical alerts regarding account security, transaction status, and important updates.', label: 'REAL-TIME' },
          ].map(p => (
            <div key={p.id} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[24px] border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group hover:scale-[1.01] hover:shadow-xl transition-all duration-500">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] mb-6">{p.icon}</div>
                <h3 className="font-th-heading text-2xl font-bold text-[#1b1b1d] mb-2">{p.title}</h3>
                <p className="text-[#45474a] text-[14px] leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-th-body text-[12px] font-bold text-[#45474a]/40 uppercase tracking-widest">{p.label}</span>
                <button onClick={() => toggle(p.id as any)} className={\`relative w-14 h-8 rounded-full transition-colors duration-300 \${permissions[p.id as keyof typeof permissions] ? 'bg-[#7e5356]' : 'bg-[#e4e2e4]'}\`}>
                  <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 \${permissions[p.id as keyof typeof permissions] ? 'translate-x-6' : ''}\`}></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
`
};

for (const [filename, content] of Object.entries(screens)) {
  fs.writeFileSync(path.join(screensDir, filename), content);
  console.log('Created/Updated', filename);
}
