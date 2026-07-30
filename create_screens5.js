import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'DataUsageScreen.tsx': `import React from 'react';
import { ArrowLeft, Database, Download, Upload, Server, Network } from 'lucide-react';
import { ScreenId } from '../types';

export const DataUsageScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-4xl mx-auto min-h-screen">
        <section className="mb-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#7e5356] to-[#b88a8d] rounded-[32px] flex items-center justify-center mb-6 shadow-xl shadow-[#7e5356]/20">
            <Database className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-1">การใช้งานข้อมูล</h2>
          <span className="bg-[#ffefef] text-[#7e5356] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest border border-[#7e5356]/20">Premium</span>
        </section>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-6 rounded-[32px] flex flex-col items-center text-center">
            <Upload className="w-8 h-8 text-[#5d5e63] mb-4" />
            <span className="text-[#45474a] text-[14px] mb-1">ส่งออกแล้ว</span>
            <span className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">2.4 GB</span>
          </div>
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-6 rounded-[32px] flex flex-col items-center text-center">
            <Download className="w-8 h-8 text-[#5d5e63] mb-4" />
            <span className="text-[#45474a] text-[14px] mb-1">รับแล้ว</span>
            <span className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">14.8 GB</span>
          </div>
        </div>

        <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-8 rounded-[32px] space-y-6">
          <h3 className="font-th-heading text-[20px] font-bold text-[#1b1b1d]">รายละเอียดการใช้พื้นที่</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-semibold text-[#1b1b1d]">วิดีโอและรูปภาพคุณภาพสูง</span>
                <span className="text-[#7e5356] font-bold">12 GB</span>
              </div>
              <div className="w-full bg-[#f2f2f7] h-3 rounded-full overflow-hidden">
                <div className="bg-[#7e5356] w-[75%] h-full rounded-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-semibold text-[#1b1b1d]">เอกสารและไฟล์</span>
                <span className="text-[#5d5e63] font-bold">4 GB</span>
              </div>
              <div className="w-full bg-[#f2f2f7] h-3 rounded-full overflow-hidden">
                <div className="bg-[#5d5e63] w-[25%] h-full rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-semibold text-[#1b1b1d]">ข้อความเสียง</span>
                <span className="text-[#5d5e63] font-bold">1.2 GB</span>
              </div>
              <div className="w-full bg-[#f2f2f7] h-3 rounded-full overflow-hidden">
                <div className="bg-[#1b1b1d] w-[10%] h-full rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
`,
  'ReportFeedbackScreen.tsx': `import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { ScreenId } from '../types';

export const ReportFeedbackScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('bug');

  return (
    <div className="bg-[#fcf8fb] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-3xl mx-auto min-h-screen">
        <section className="mb-10 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#7e5356] to-[#b88a8d] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[#7e5356]/20">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-1">รายงานและข้อเสนอแนะ</h2>
          <span className="bg-[#ffefef] text-[#7e5356] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-widest border border-[#7e5356]/20">Premium Support</span>
        </section>

        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setType('bug')} className={\`p-6 rounded-[24px] border transition-all flex flex-col items-center text-center \${type === 'bug' ? 'border-[#ba1a1a] bg-[#ffdad6]/20 shadow-md shadow-[#ba1a1a]/5' : 'border-[#1b1b1d]/10 bg-white/50 hover:bg-white'}\`}>
                <AlertTriangle className={\`w-8 h-8 mb-4 \${type === 'bug' ? 'text-[#ba1a1a]' : 'text-[#5d5e63]'}\`} />
                <span className={\`font-bold \${type === 'bug' ? 'text-[#93000a]' : 'text-[#45474a]'}\`}>รายงานปัญหา</span>
              </button>
              <button type="button" onClick={() => setType('feature')} className={\`p-6 rounded-[24px] border transition-all flex flex-col items-center text-center \${type === 'feature' ? 'border-[#7e5356] bg-[#ffefef]/50 shadow-md shadow-[#7e5356]/5' : 'border-[#1b1b1d]/10 bg-white/50 hover:bg-white'}\`}>
                <Lightbulb className={\`w-8 h-8 mb-4 \${type === 'feature' ? 'text-[#7e5356]' : 'text-[#5d5e63]'}\`} />
                <span className={\`font-bold \${type === 'feature' ? 'text-[#7e5356]' : 'text-[#45474a]'}\`}>เสนอแนะฟีเจอร์</span>
              </button>
            </div>

            <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-8 rounded-[32px]">
              <label className="block font-bold text-[#1b1b1d] mb-2">อธิบายรายละเอียด</label>
              <textarea 
                required 
                rows={6} 
                className="w-full bg-[#f2f2f7]/50 border-none rounded-2xl p-4 text-[17px] focus:ring-2 focus:ring-[#7e5356]/20 outline-none resize-none placeholder:text-[#45474a]/40"
                placeholder={type === 'bug' ? "อธิบายปัญหาที่คุณพบและขั้นตอนในการทำให้เกิดปัญหานั้น..." : "อธิบายฟีเจอร์ที่คุณอยากให้เราพัฒนาเพิ่ม..."}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-[#1b1b1d] text-white py-4 rounded-full font-bold text-[17px] hover:bg-[#303032] transition-colors active:scale-95 shadow-lg shadow-black/10">
              ส่งข้อความถึงทีมผู้พัฒนา
            </button>
          </form>
        ) : (
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-12 rounded-[40px] flex flex-col items-center text-center shadow-xl shadow-[#7e5356]/5">
            <div className="w-20 h-20 bg-[#ffefef] text-[#7e5356] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-th-heading text-[28px] font-bold text-[#1b1b1d] mb-4">ขอบคุณสำหรับข้อเสนอแนะ!</h3>
            <p className="text-[#45474a] text-[17px] max-w-md">
              เราได้รับข้อความของคุณแล้ว ทีมงาน Premium Support จะรีบตรวจสอบและนำไปปรับปรุงระบบให้ดียิ่งขึ้น
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-8 text-[#7e5356] font-bold hover:underline">ส่งรายงานใหม่</button>
          </div>
        )}
      </main>
    </div>
  );
};
`,
  'StarredMessagesScreen.tsx': `import React from 'react';
import { ArrowLeft, Star, Search, Clock, MessageCircle } from 'lucide-react';
import { ScreenId } from '../types';

export const StarredMessagesScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const starred = [
    { id: 1, sender: "วิศรุต กิตติคุณ", content: "รหัสปลดล็อคห้องประชุมบ่ายนี้คือ 4892 นะครับ ห้ามลืม", time: "10:30 น.", date: "วันนี้" },
    { id: 2, sender: "Group: Design System", content: "ผมอัปเดตไฟล์ Liquid Glass Components.fig แล้ว เข้าไปดูได้เลย", time: "เมื่อวานนี้", date: "27 ก.ค." },
    { id: 3, sender: "Maya Smith", content: "Please review the updated legal contract in the Vault before tomorrow.", time: "14:20 น.", date: "25 ก.ค." }
  ];

  return (
    <div className="bg-[#fcf8fb] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-4xl mx-auto min-h-screen">
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#ffefef] rounded-[20px] flex items-center justify-center shadow-inner">
              <Star className="w-8 h-8 text-[#7e5356] fill-current" />
            </div>
            <div>
              <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-1">ข้อความที่ติดดาว</h2>
              <div className="flex items-center gap-2">
                <span className="text-[#45474a] font-th-body text-[14px]">ข้อความสำคัญที่คุณบันทึกไว้</span>
                <span className="bg-[#7e5356] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Premium</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-[#76777b] w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="ค้นหาในข้อความที่ติดดาว..." 
            className="w-full bg-[#f6f3f5]/50 border-none rounded-2xl pl-12 py-4 focus:ring-2 focus:ring-[#7e5356]/20 placeholder:text-[#76777b]/60 text-[17px] outline-none"
          />
        </div>

        <div className="space-y-4">
          {starred.map(msg => (
            <div key={msg.id} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-6 rounded-[32px] group hover:bg-white/50 transition-all cursor-pointer shadow-sm hover:shadow-md hover:shadow-[#7e5356]/5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[17px] text-[#1b1b1d]">{msg.sender}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#45474a]/60">{msg.date} {msg.time}</span>
                  <Star className="w-5 h-5 text-[#7e5356] fill-current" />
                </div>
              </div>
              <p className="text-[#45474a] leading-relaxed bg-[#f2f2f7]/50 p-4 rounded-[20px] border border-[#1b1b1d]/5">{msg.content}</p>
              
              <div className="mt-4 flex items-center gap-4 text-[#5d5e63] border-t border-[#1b1b1d]/5 pt-4">
                <button className="flex items-center gap-2 text-[14px] font-semibold hover:text-[#7e5356] transition-colors"><MessageCircle className="w-4 h-4" /> กระโดดไปที่แชท</button>
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
  console.log('Created', filename);
}
