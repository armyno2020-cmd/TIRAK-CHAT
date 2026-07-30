import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'ProfileSetupScreen.tsx': `import React, { useState } from 'react';
import { Shield, HelpCircle, Camera, Edit2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScreenId } from '../types';

export const ProfileSetupScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => onNavigate('permissions'), 1500);
    }, 2000);
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_right,#fcf8fb,#f0edef)] text-[#1b1b1d] min-h-screen font-th-body">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Shield className="text-[#633c3f] w-6 h-6" />
          <span className="font-th-heading text-[24px] tracking-tighter text-[#1b1b1d]">Tirak Chat</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#504444] hover:bg-white/10 transition-colors p-2 rounded-full active:scale-95 duration-200">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-5 md:px-16 max-w-2xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-th-heading text-[34px] md:text-[48px] font-bold">สร้างโปรไฟล์</h1>
            <p className="font-th-body text-[17px] text-[#504444] max-w-md mx-auto">ตั้งค่าตัวตนของคุณในระบบ NEWFOUND ข้อมูลโปรไฟล์ของคุณจะถูกเข้ารหัสและปลอดภัย</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative p-2 rounded-full bg-gradient-to-br from-white/80 to-[#e4e2e4]/20 shadow-inner w-40 h-40 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-[rgba(255,255,255,0.4)] backdrop-blur-[10px] relative flex items-center justify-center border-2 border-white">
                  <img alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZl6yBQkZTDL5XNIV-yLk46mmi1BWKyHC38oxYDyqVX4PKAUeURqm915IfU45-6gbsLZHBzWk8Vk6yGD_vh_3P_9xmvExGBpiD9DEHGrcQftnMcryNaZoZCRZog5XR2IhHn_SglBFwvkP4PQtktoO88vcVZ5jKHjHjppWDEbOeV2Agr4OfR6C3FKVPC0bfSux3o_3FaJbc95FWqqp3UunZLbQsl2QHelbG1JNFlYilmsvqkMkYgnIt5xNaVT-09nVtla1HJC9Z1K8" />
                  <div className="absolute inset-0 bg-[#1b1b1d]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-[#633c3f] text-white p-2 rounded-full border-4 border-[#fcf8fb] shadow-lg">
                <Edit2 className="w-4 h-4" />
              </div>
            </div>
            <span className="font-th-body text-[12px] font-semibold text-[#633c3f] tracking-widest uppercase">แตะเพื่ออัปโหลดรูปโปรไฟล์</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-[rgba(252,248,251,0.6)] backdrop-blur-[30px] p-8 md:p-12 rounded-[32px] border border-white/40">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-th-body text-[12px] font-semibold text-[#504444] ml-1">ชื่อ-นามสกุล</label>
                <div className="relative group">
                  <input type="text" placeholder="เช่น สมชาย ใจดี" className="w-full bg-[#f0edef]/30 border-none rounded-xl px-4 py-4 font-th-body text-[17px] focus:ring-2 focus:ring-[#633c3f]/20 transition-all outline-none placeholder:text-[#504444]/30" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-th-body text-[12px] font-semibold text-[#504444] ml-1">ชื่อผู้ใช้</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-th-body text-[17px] text-[#633c3f] font-semibold">@</span>
                  <input type="text" placeholder="newfound_user" className="w-full bg-[#f0edef]/30 border-none rounded-xl pl-10 pr-4 py-4 font-th-body text-[17px] focus:ring-2 focus:ring-[#633c3f]/20 transition-all outline-none placeholder:text-[#504444]/30" />
                </div>
                <p className="text-[11px] text-[#504444]/60 ml-1 font-medium">ชื่อผู้ใช้ต้องไม่ซ้ำและมีความยาวอย่างน้อย 4 ตัวอักษร</p>
              </div>
              <div className="space-y-2">
                <label className="font-th-body text-[12px] font-semibold text-[#504444] ml-1">หัวข้อแนะนำตัว</label>
                <textarea rows={2} placeholder="บอกเล่าเรื่องราวหรือประวัติย่อของคุณ..." className="w-full bg-[#f0edef]/30 border-none rounded-xl px-4 py-4 font-th-body text-[17px] focus:ring-2 focus:ring-[#633c3f]/20 transition-all outline-none resize-none placeholder:text-[#504444]/30"></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className={\`w-full py-5 rounded-full text-white font-bold text-[17px] tracking-wide active:scale-[0.98] transition-all hover:brightness-110 flex items-center justify-center gap-2 \${isSuccess ? 'bg-[#633c3f]' : 'bg-gradient-to-br from-[#a38285] to-[#7e5356] shadow-lg shadow-[#7e5356]/40'}\`}
              >
                {isSubmitting ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : isSuccess ? (
                  <><CheckCircle2 className="w-5 h-5" /> ตั้งค่าโปรไฟล์สำเร็จ</>
                ) : (
                  <>ตั้งค่าเสร็จสมบูรณ์ <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>

          <p className="text-center font-th-body text-[14px] text-[#504444]/60 px-8">
            การดำเนินการต่อแสดงว่าคุณยอมรับนโยบายข้อมูลที่เข้ารหัสและมาตรฐานระดับมืออาชีพของ NEWFOUND
          </p>
        </div>
      </main>
    </div>
  );
};
`,
  'PermissionsScreen.tsx': `import React, { useState } from 'react';
import { Shield, Camera, Image, Users, Bell, ChatBubble, Call, Settings } from 'lucide-react';
import { ScreenId } from '../types';

export const PermissionsScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [perms, setPerms] = useState({ camera: false, photos: true, contacts: false, notifications: true });

  const toggle = (key: keyof typeof perms) => setPerms({...perms, [key]: !perms[key]});

  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body overflow-x-hidden">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm z-50 flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Shield className="text-[#5d5e63] w-6 h-6" />
          <span className="font-th-heading text-[22px] tracking-tighter text-[#1b1b1d] font-bold">NEWFOUND</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:block font-th-body text-[12px] font-semibold text-[#45474a]/60 hover:text-[#7e5356] transition-colors">HELP</button>
          <div className="w-10 h-10 rounded-full border border-white/20 bg-[#eae7ea] overflow-hidden shadow-sm active:scale-95 duration-200 cursor-pointer">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhI26Rru3jmbsuFGi__EuE0YCdfKrJR3MKHAMf8dQZTh65lGLktsq8ifGyrekmEEzfmnHi2YyyENkn4_DB2z8jF5Q3g-aFIWfNfTz1dWJOSj8VpDtIJgA4fMeHTKnOrNN8RnL5-lMzIar2yLqUMdWbN5sMtOnPdqXMCUS4jwZgHQSBPkJvCr6KtWRL_Cm0oLeUieCGhke7TGcGbp_amIVanijEFOp1WzTe8sg8UpUOUiiwlEW7GGPlTqlxXEb5tHyPYhzyp6BceRk" />
          </div>
        </div>
      </header>

      <main className="pt-32 pb-40 px-5 md:px-16 max-w-4xl mx-auto">
        <section className="mb-12 text-center md:text-left">
          <h1 className="font-th-heading text-[34px] md:text-[48px] font-bold text-[#1b1b1d] mb-4">Personal Control.</h1>
          <p className="text-[#45474a] font-th-body text-[17px] max-w-2xl mx-auto md:mx-0">
            Configure how <span className="font-semibold text-[#7e5356]">Newfound</span> interacts with your device. We prioritize your privacy through transparent access and crystalline data management.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[24px] border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] mb-6"><Camera className="w-6 h-6" /></div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">Camera</h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">Required for secure document verification and profile identification. We only access the camera during active capture sessions.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">Secure Access</span>
              <button onClick={() => toggle('camera')} className={\`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none \${perms.camera ? 'bg-[#7e5356]' : 'bg-[#e4e2e4]'}\`}>
                <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 \${perms.camera ? 'translate-x-6' : ''}\`}></div>
              </button>
            </div>
          </div>

          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[24px] border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63] mb-6"><Image className="w-6 h-6" /></div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">Photos</h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">Allows you to upload existing identification and customize your professional presence. Newfound does not scan your private library.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">Limited Read</span>
              <button onClick={() => toggle('photos')} className={\`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none \${perms.photos ? 'bg-[#7e5356]' : 'bg-[#e4e2e4]'}\`}>
                <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 \${perms.photos ? 'translate-x-6' : ''}\`}></div>
              </button>
            </div>
          </div>

          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[24px] border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#e0dfe4] flex items-center justify-center text-[#5d5e63] mb-6"><Users className="w-6 h-6" /></div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">Contacts</h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">Sync your network to identify trusted collaborators and professional connections within the ecosystem. We never send unsolicited invites.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">Network Sync</span>
              <button onClick={() => toggle('contacts')} className={\`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none \${perms.contacts ? 'bg-[#7e5356]' : 'bg-[#e4e2e4]'}\`}>
                <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 \${perms.contacts ? 'translate-x-6' : ''}\`}></div>
              </button>
            </div>
          </div>

          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[24px] border border-white/40 p-8 rounded-[32px] flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#7e5356]/5">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] mb-6"><Bell className="w-6 h-6" /></div>
              <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-2">Notifications</h3>
              <p className="text-[#45474a] text-[14px] leading-relaxed">Critical alerts regarding account security, transaction status, and important community updates. Managed through silent delivery options.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]/40 uppercase tracking-widest">Real-time</span>
              <button onClick={() => toggle('notifications')} className={\`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none \${perms.notifications ? 'bg-[#7e5356]' : 'bg-[#e4e2e4]'}\`}>
                <div className={\`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 \${perms.notifications ? 'translate-x-6' : ''}\`}></div>
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16 p-12 rounded-[40px] bg-[#5d5e63] text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7e5356]/20 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10 flex-1">
            <h2 className="font-th-heading text-[28px] font-bold mb-4">Privacy by Architecture</h2>
            <p className="text-white/80 text-[17px] leading-relaxed mb-6">
              Our "Liquid Glass" design isn't just aesthetic. It represents our commitment to total transparency. Your data remains encrypted on-device unless explicitly permitted for processing.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('contact_sync')} className="bg-white text-[#5d5e63] px-8 py-3 rounded-full font-semibold hover:bg-[#e0dfe4] transition-colors active:scale-95">Next Step</button>
            </div>
          </div>
          <div className="w-full md:w-64 h-64 rounded-[32px] overflow-hidden shadow-2xl relative z-10">
            <img className="w-full h-full object-cover" alt="Glass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8oxB3Eb_NfPyh0x0Dtwnzw53ZkrWIxFC1nnxmehWmNpJN2tqTVc85dNauXWt6Jez82xOaLJ6TodfTDQp173AeJ_u_9RUqZc46gIMXaf2YEJSg4QE9WWOGA9oes2UYB3DP4GNk9wX8ZF1-3c33FP9VDPGpYs3nMh50oBwPLuCxK_KlyTXuK1sfDOuW0xfQOB4jT54TWp1Cg5scqDWCJeW6EFSzNN-NO_rmTS9tFnSinmToKXmAYdFJEIvgi_SyMZfdZo2_c_hryI" />
          </div>
        </section>
      </main>
      
      <nav className="fixed bottom-6 left-0 right-0 w-max mx-auto z-50 flex items-center gap-6 px-8 py-3 bg-[#fcf8fb]/70 backdrop-blur-2xl border border-white/10 shadow-lg rounded-full">
        <button onClick={() => onNavigate('chat_list')} className="text-[#45474a]/60 p-3 hover:scale-110 transition-transform"><ChatBubble className="w-6 h-6" /></button>
        <button onClick={() => onNavigate('create_group')} className="text-[#45474a]/60 p-3 hover:scale-110 transition-transform"><Users className="w-6 h-6" /></button>
        <button onClick={() => onNavigate('call_history')} className="text-[#45474a]/60 p-3 hover:scale-110 transition-transform"><Call className="w-6 h-6" /></button>
        <button onClick={() => onNavigate('settings_account')} className="bg-[#ffefef] text-[#7e5356] p-3 rounded-full hover:scale-110 transition-transform"><Settings className="w-6 h-6" /></button>
      </nav>
    </div>
  );
};
`
};

for (const [filename, content] of Object.entries(screens)) {
  fs.writeFileSync(path.join(screensDir, filename), content);
  console.log('Created', filename);
}
