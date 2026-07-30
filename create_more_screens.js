import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'MyQRCodeScreen.tsx': `import React from 'react';
import { Shield, Share, Download, Info, ArrowLeft } from 'lucide-react';
import { ScreenId } from '../types';

export const MyQRCodeScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-br from-[#fcf8fb] to-[#e2e2e7] min-h-screen text-[#1b1b1d] flex flex-col font-th-body">
      <header className="fixed top-4 left-4 right-4 rounded-full border border-white/20 bg-[#f6f3f5]/40 backdrop-blur-[30px] shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63]"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl text-[#7e5356] tracking-tighter">NEWFOUND</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32">
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
          <div className="mb-8 text-center">
            <h1 className="font-th-heading text-2xl font-bold mb-2">รหัส QR ของฉัน</h1>
            <p className="text-[#45474a]/70 text-[14px]">สแกนเพื่อเพิ่มเพื่อนหรือแชร์โปรไฟล์ของคุณ</p>
          </div>

          <div className="p-0.5 bg-gradient-to-br from-white/80 to-white/20 rounded-[32px] shadow-2xl relative group">
            <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[30px] p-8 rounded-[30px] flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="w-64 h-64 bg-white rounded-2xl p-4 relative shadow-inner">
                <div className="w-full h-full relative" style={{ backgroundImage: 'radial-gradient(#1b1b1d 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
                  <div className="absolute top-0 left-0 w-16 h-16 border-[6px] border-[#1b1b1d] rounded-sm"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-[6px] border-[#1b1b1d] rounded-sm"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-[6px] border-[#1b1b1d] rounded-sm"></div>
                  <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-xl p-1 shadow-md flex items-center justify-center">
                    <img className="w-full h-full object-cover rounded-lg" src="https://ui-avatars.com/api/?name=User" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <span className="font-th-heading text-2xl font-bold">@newfound_user</span>
                <span className="font-th-body text-[12px] text-[#7e5356] mt-1 uppercase tracking-widest font-bold">Premium Member</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-10 grid grid-cols-2 gap-4">
            <button className="bg-gradient-to-br from-[#f0b9bc] to-[#7e5356] text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              <Share className="w-5 h-5" />
              <span className="font-th-body text-[12px]">แชร์โปรไฟล์</span>
            </button>
            <button className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[30px] border border-white/40 text-[#1b1b1d] font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all">
              <Download className="w-5 h-5" />
              <span className="font-th-body text-[12px]">บันทึกรูปภาพ</span>
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[#45474a]/60">
            <Info className="w-4 h-4" />
            <p className="text-[14px] italic">รหัสนี้จะมีการเปลี่ยนแปลงเพื่อความปลอดภัย</p>
          </div>
        </div>
      </main>
    </div>
  );
};
`,
  'DataUsageScreen.tsx': `import React from 'react';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Info, Shield, HardDrive, MessageSquare, Phone } from 'lucide-react';
import { ScreenId } from '../types';

export const DataUsageScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body">
      <nav className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="text-[#5d5e63]"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-th-heading text-xl text-[#5d5e63]">NEWFOUND</span>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-5 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="font-th-heading text-2xl font-bold">เครือข่ายและการใช้งานข้อมูล</h1>
          <p className="text-[#45474a] text-sm mt-1">ตรวจสอบการรับส่งข้อมูลและความปลอดภัยของบัญชีคุณ</p>
        </header>

        <section className="bg-[rgba(255,255,255,0.4)] backdrop-blur-[10px] border border-white/30 rounded-3xl p-8 mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="font-th-heading text-lg font-bold">สถิติการใช้งานรวม</h2>
              <span className="text-[#7e5356] text-[12px] bg-[#ffefef] px-3 py-1 rounded-full font-bold">อัปเดตเมื่อ 2 นาทีที่แล้ว</span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-th-heading text-[#5d5e63] font-bold">42.8 GB</div>
              <p className="text-[#45474a] text-[12px]">ใช้ไปในเดือนนี้</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/30 rounded-2xl border border-white/50">
              <ArrowUpRight className="text-[#5d5e63] w-5 h-5" />
              <div>
                <p className="text-[#45474a] text-[10px] font-bold uppercase">ส่งข้อมูล (Sent)</p>
                <p className="font-th-heading text-[17px] font-bold">4.2 GB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/30 rounded-2xl border border-white/50">
              <ArrowDownRight className="text-[#7e5356] w-5 h-5" />
              <div>
                <p className="text-[#45474a] text-[10px] font-bold uppercase">รับข้อมูล (Received)</p>
                <p className="font-th-heading text-[17px] font-bold">38.6 GB</p>
              </div>
            </div>
          </div>
        </section>
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
