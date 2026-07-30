import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'StarredMessagesScreen.tsx': `import React from 'react';
import { ArrowLeft, Star, Search, Filter } from 'lucide-react';
import { ScreenId } from '../types';

export const StarredMessagesScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body flex flex-col relative overflow-hidden">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63] active:scale-95 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</span>
        </div>
      </header>
      
      <main className="pt-32 pb-24 px-5 max-w-2xl mx-auto w-full flex-1 flex flex-col items-center">
        <div className="w-full mb-8">
          <h1 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-4 text-center">Starred Messages</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-sm mt-10">
          <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-[#e4e2e4] flex items-center justify-center mb-6">
            <Star className="w-10 h-10 text-[#c6c6ca]" />
          </div>
          <h2 className="font-th-heading text-[20px] font-bold text-[#1b1b1d] mb-2">No Starred Messages</h2>
          <p className="text-[#6d6e72] text-[14px] leading-relaxed">
            Tap and hold on any message in a chat to star it, so you can easily find it later.
          </p>
        </div>
      </main>
    </div>
  );
};
`,
  'LinkedDevicesScreen.tsx': `import React from 'react';
import { ArrowLeft, Monitor, Smartphone, Plus } from 'lucide-react';
import { ScreenId } from '../types';

export const LinkedDevicesScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63] active:scale-95 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</span>
        </div>
      </header>

      <main className="pt-28 pb-24 px-5 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-4">Linked Devices</h1>
          <p className="text-[#45474a] text-[17px]">Use Newfound on Web, Desktop, and other devices.</p>
        </div>

        <div className="flex justify-center mb-10">
          <button className="bg-[#7e5356] text-white px-8 py-3 rounded-full font-th-body text-[17px] font-bold shadow-lg shadow-[#7e5356]/20 active:scale-95 transition-transform flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Link a Device
          </button>
        </div>

        <section className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-white/40">
            <h2 className="font-th-heading text-[17px] font-bold text-[#1b1b1d]">Current Device</h2>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#7e5356] border border-white/40 shadow-sm">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-th-heading text-[17px] font-bold text-[#1b1b1d]">iPhone 15 Pro</p>
                <p className="font-th-body text-[14px] text-[#45474a]">Newfound for iOS • Active now</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
`,
  'ReportFeedbackScreen.tsx': `import React from 'react';
import { ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';
import { ScreenId } from '../types';

export const ReportFeedbackScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63] active:scale-95 transition-transform"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl font-bold tracking-tighter text-[#1b1b1d]">NEWFOUND</span>
        </div>
      </header>

      <main className="pt-28 pb-24 px-5 max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-4">Report & Feedback</h1>
          <p className="text-[#45474a] text-[17px]">Help us improve Newfound.</p>
        </div>

        <section className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 rounded-[32px] p-6 shadow-sm mb-6">
          <textarea 
            className="w-full h-32 bg-transparent border-none outline-none font-th-body text-[17px] text-[#1b1b1d] placeholder-[#c6c6ca] resize-none" 
            placeholder="Please describe the issue or share your ideas..."
          ></textarea>
        </section>
        
        <button className="w-full bg-[#7e5356] text-white h-14 rounded-full font-th-body text-[17px] font-bold shadow-lg shadow-[#7e5356]/20 active:scale-95 transition-transform">
          Submit
        </button>
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
