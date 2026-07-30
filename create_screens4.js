import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'MyQRCodeScreen.tsx': `import React from 'react';
import { ArrowLeft, Share2, Download, ScanLine, QrCode } from 'lucide-react';
import { ScreenId } from '../types';

export const MyQRCodeScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,#fcf8fb_0%,#f0edef_100%)] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_account')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="active:scale-95 duration-200">
            <ScanLine className="text-[#5d5e63] w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-32 pb-32 px-5 md:px-16 max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] border border-white/40 p-10 rounded-[40px] shadow-2xl shadow-[#7e5356]/10 flex flex-col items-center w-full max-w-md">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARVP3y0c3hE54R97Xgz0lUXDKsDVuO9r1JUig3L6AfW0z_rdP55d-ROMKi2dAUn3kS2yCpnGSRiI5Ji9gzRIzVIAFk9eMEJB50AlM35ZL-r7xmBolkj-NGpKlgiyWAED_a2GTLHCOPyQoqyVoaHcAWqRrFNADbZuUopxizl-tpxRGaJu9Nj3wkforMVdna8V6eMXO3tk9SfFqkLWvh2vnWuT2DaUHfqEZzwA3Du1wZA24JHQjmoDF7mUQGNE1Loye-6Jox-NK5fLk" />
          </div>
          <h2 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-1">สมชาย ใจดี</h2>
          <p className="text-[#45474a] font-th-body text-[14px] mb-8">@somchai_jd</p>
          
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#1b1b1d]/5 mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7e5356]/5 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <QrCode className="w-48 h-48 text-[#1b1b1d]" strokeWidth={1} />
          </div>

          <div className="flex w-full gap-4">
            <button className="flex-1 bg-[#f0edef] hover:bg-[#e4e2e4] text-[#45474a] py-3 rounded-full flex justify-center items-center gap-2 font-semibold text-[14px] transition-colors active:scale-95">
              <Share2 className="w-4 h-4" /> แชร์
            </button>
            <button className="flex-1 bg-[#7e5356] hover:bg-[#633c3f] text-white py-3 rounded-full flex justify-center items-center gap-2 font-semibold text-[14px] transition-colors active:scale-95">
              <Download className="w-4 h-4" /> บันทึก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
`,
  'TwoStepVerificationScreen.tsx': `import React from 'react';
import { ArrowLeft, ShieldCheck, Key, Smartphone, AlertCircle } from 'lucide-react';
import { ScreenId } from '../types';

export const TwoStepVerificationScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
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
          <div className="w-24 h-24 bg-[#ffefef] rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck className="w-12 h-12 text-[#7e5356]" />
          </div>
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d] mb-2">การยืนยันแบบสองขั้นตอน</h2>
          <p className="text-[#45474a] font-th-body text-[17px] max-w-lg">
            เพิ่มความปลอดภัยอีกระดับให้กับบัญชีของคุณ ด้วยการกำหนดให้ป้อนรหัส PIN เมื่อลงทะเบียนหมายเลขโทรศัพท์ของคุณกับ NEWFOUND อีกครั้ง
          </p>
        </section>

        <div className="space-y-4">
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-6 rounded-[24px] flex items-start gap-4">
            <Key className="w-6 h-6 text-[#5d5e63] mt-1" />
            <div>
              <h3 className="font-th-heading text-[17px] font-bold mb-1">รหัส PIN 6 หลัก</h3>
              <p className="text-[#45474a] text-[14px]">คุณจะต้องสร้างรหัส PIN 6 หลักที่คุณจำได้ง่าย ห้ามแชร์รหัสนี้กับผู้อื่น</p>
            </div>
          </div>
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/10 p-6 rounded-[24px] flex items-start gap-4">
            <Smartphone className="w-6 h-6 text-[#5d5e63] mt-1" />
            <div>
              <h3 className="font-th-heading text-[17px] font-bold mb-1">ยืนยันการเข้าสู่ระบบ</h3>
              <p className="text-[#45474a] text-[14px]">เมื่อเข้าสู่ระบบบนอุปกรณ์ใหม่ คุณจะต้องใส่รหัสผ่าน OTP และรหัส PIN ของคุณ</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <button className="w-full bg-[#7e5356] text-white py-4 rounded-full font-th-body text-[17px] font-bold shadow-lg shadow-[#7e5356]/20 hover:brightness-110 transition-all active:scale-95">
            เปิดใช้งาน
          </button>
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 bg-[#f2f2f7] rounded-2xl">
          <AlertCircle className="w-5 h-5 text-[#5d5e63] shrink-0" />
          <p className="text-[#45474a] text-[12px] leading-relaxed">
            หากคุณลืมรหัส PIN คุณสามารถรีเซ็ตได้ผ่านอีเมลที่คุณให้ไว้ แต่ต้องรออย่างน้อย 7 วันเพื่อความปลอดภัย
          </p>
        </div>
      </main>
    </div>
  );
};
`,
  'AccountScreen.tsx': `import React from 'react';
import { ArrowLeft, User, Shield, Lock, Smartphone, Database, HelpCircle, LogOut } from 'lucide-react';
import { ScreenId } from '../types';

export const AccountScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('chat_list')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-4xl mx-auto min-h-screen">
        <section className="mb-8">
          <h2 className="font-th-heading text-[34px] font-bold text-[#1b1b1d]">บัญชีและการตั้งค่า</h2>
          <p className="text-[#45474a] font-th-body text-[14px]">จัดการโปรไฟล์ ความเป็นส่วนตัว และความปลอดภัยของคุณ</p>
        </section>

        <div className="space-y-2">
          <div onClick={() => onNavigate('profile_setup')} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">โปรไฟล์</h3>
                <p className="text-[#45474a] text-[14px]">รูปภาพ ชื่อ และคำอธิบาย</p>
              </div>
            </div>
          </div>
          
          <div onClick={() => onNavigate('permissions')} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">ความเป็นส่วนตัว</h3>
                <p className="text-[#45474a] text-[14px]">สิทธิ์การเข้าถึงและข้อมูล</p>
              </div>
            </div>
          </div>

          <div onClick={() => onNavigate('two_step_verification')} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e3e2e7] flex items-center justify-center text-[#1a1b1f]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">ความปลอดภัย</h3>
                <p className="text-[#45474a] text-[14px]">การยืนยันแบบสองขั้นตอน</p>
              </div>
            </div>
          </div>

          <div onClick={() => onNavigate('data_usage')} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">การใช้งานข้อมูล (Premium)</h3>
                <p className="text-[#45474a] text-[14px]">เครือข่ายและพื้นที่เก็บข้อมูล</p>
              </div>
            </div>
          </div>

          <div onClick={() => onNavigate('report_feedback')} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-[#1b1b1d]/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[17px]">รายงานและข้อเสนอแนะ</h3>
                <p className="text-[#45474a] text-[14px]">ติดต่อทีมสนับสนุน</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full flex items-center justify-center gap-2 py-4 text-[#ba1a1a] font-bold text-[17px] hover:bg-[#ffdad6]/50 rounded-full transition-colors active:scale-95">
            <LogOut className="w-5 h-5" /> ออกจากระบบ
          </button>
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
