import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'CallHistoryScreen.tsx': `import React, { useState } from 'react';
import { Shield, Call, CallMade, CallReceived, CallMissed, Videocam, ChatBubble, VerifiedUser, Settings } from 'lucide-react';
import { ScreenId } from '../types';

export const CallHistoryScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'missed'>('all');

  return (
    <div className="font-th-body text-[#1b1b1d] min-h-screen bg-gradient-to-br from-[#fcf8fb] to-[#f0edef] overflow-x-hidden">
      <header className="fixed top-4 left-4 right-4 rounded-full bg-[#fcf8fb]/80 backdrop-blur-[30px] border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <Shield className="text-[#5d5e63] w-6 h-6" />
          <span className="font-th-heading text-[20px] text-[#7e5356] tracking-tighter font-bold">Tirak Chat</span>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40">
          <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU44wAt3JU6g1B_pbRFruhiJHpSkXYAoW8SQcy_xt1mYgEpznw8ZZoY2mJT6bwG11QVmiw1d_WAy-v2ht5b_nsIcIB7XJHrFnqlc_XzSnku_j_EEgLW-J-wcqApma90CIJ6L4x2LrR_upWr_PSZo5m9X9diu4e6Waga3mS3ZAP1Bx93TpdeF8dgJJJLI7Q1s6lumyS81tAJ8nVuTBiuIH0oQGr9Rrjlc6rNi-RpaFBJ2m4mc3XmxnXfnq5jDtowA98cCM4MYJniwY" />
        </div>
      </header>
      
      <main className="pt-28 pb-32 px-5 max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="font-th-heading text-[20px] text-[#1b1b1d] font-semibold">ประวัติการโทร</h1>
          <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/50 p-1 rounded-full flex gap-1 w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={\`px-6 py-2 rounded-full font-th-body text-[12px] font-semibold transition-all \${activeTab === 'all' ? 'bg-[#7e5356] text-white shadow-sm' : 'text-[#45474a]/60 hover:bg-white/40'}\`}
            >ทั้งหมด</button>
            <button 
              onClick={() => setActiveTab('missed')}
              className={\`px-6 py-2 rounded-full font-th-body text-[12px] font-semibold transition-all \${activeTab === 'missed' ? 'bg-[#7e5356] text-white shadow-sm' : 'text-[#45474a]/60 hover:bg-white/40'}\`}
            >ไม่ได้รับ</button>
          </div>
        </div>

        <div className="space-y-3">
          {(activeTab === 'all' ? [1, 2, 3, 4, 5] : [2, 5]).map((item, i) => (
            <div key={i} className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/50 rounded-3xl p-4 flex items-center justify-between group transition-all hover:translate-x-1 active:scale-95">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#e0dfe4]">
                    <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdWD9xFkk0IFJfIm6pQWamP05glL9pTE8WAJbW4Ku7CxOjvi5lnLQ8C54ntbutMUF2_KcHANpq6t8SMHc6dr-cWef8EKcPW9bgiKZnE6AVOewL1hwVIZRHhgHOlKEvLLj8jV-ub1YLbOK23mzxLIVqMU-EWHFGS-K4Y1QQU09-ckqJJ2ip2ZBl91tTD3ZGhEp2AgoYt6z22YvJKKzBo5pFd8w0aXpHWfrdk2HmVu8fNjTtsVaX9V0ez40qnGdlhUJli1_SeWXSjCU" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                    {item === 2 || item === 5 ? <CallMissed className="w-4 h-4 text-[#ba1a1a]" /> : item === 3 ? <CallReceived className="w-4 h-4 text-[#5d5e63]" /> : <CallMade className="w-4 h-4 text-[#7e5356]" />}
                  </div>
                </div>
                <div>
                  <h3 className={\`font-th-heading text-[16px] \${item === 2 || item === 5 ? 'text-[#ba1a1a]' : 'text-[#1b1b1d]'}\`}>{item === 2 ? 'เบอร์ไม่รู้จัก' : 'คุณสุรเชษฐ์'}</h3>
                  <p className="text-th-body text-[14px] text-[#45474a]/70">วันนี้, 14:20 • {item === 2 || item === 5 ? 'สายที่ไม่ได้รับ' : '5 นาที 12 วินาที'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {item !== 2 && item !== 5 && <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 text-[#7e5356] hover:bg-[#7e5356] hover:text-white transition-colors"><Call className="w-5 h-5" /></button>}
                {item !== 2 && <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 text-[#7e5356] hover:bg-[#7e5356] hover:text-white transition-colors"><Videocam className="w-5 h-5" /></button>}
                {(item === 2 || item === 5) && <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 text-[#7e5356] hover:bg-[#7e5356] hover:text-white transition-colors"><Call className="w-5 h-5" /></button>}
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-6 left-0 w-full z-50 flex justify-center items-center px-6">
        <div className="bg-[#fcf8fb]/80 backdrop-blur-[30px] border border-white/20 rounded-full shadow-sm flex justify-around items-center w-full max-w-md px-4 py-3">
          <button onClick={() => onNavigate('chat_list')} className="flex flex-col items-center justify-center text-[#45474a]/60 hover:text-[#7e5356] transition-colors px-6 py-2">
            <ChatBubble className="w-6 h-6" />
            <span className="font-th-body text-[12px] font-semibold mt-1">แชท</span>
          </button>
          <button onClick={() => onNavigate('permissions')} className="flex flex-col items-center justify-center bg-[#f0b9bc]/20 text-[#7e5356] rounded-full px-6 py-2 scale-90 duration-300">
            <VerifiedUser className="w-6 h-6" />
            <span className="font-th-body text-[12px] font-semibold mt-1">ความปลอดภัย</span>
          </button>
          <button onClick={() => onNavigate('settings_account')} className="flex flex-col items-center justify-center text-[#45474a]/60 hover:text-[#7e5356] transition-colors px-6 py-2">
            <Settings className="w-6 h-6" />
            <span className="font-th-body text-[12px] font-semibold mt-1">การตั้งค่า</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
`,
  'FriendProfileScreen.tsx': `import React from 'react';
import { ArrowLeft, ChatBubble, Call, Videocam, VerifiedUser, Lock, Mail, PhoneIphone, LocationOn, Description, Link as LinkIcon, Block, ChevronRight, PlayCircle } from 'lucide-react';
import { ScreenId } from '../types';

export const FriendProfileScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-br from-[#fcf8fb] to-[#f0edef] text-[#1b1b1d] font-th-body min-h-screen overflow-x-hidden">
      <header className="fixed top-4 left-4 right-4 rounded-full border border-white/20 bg-[#f6f3f5]/40 backdrop-blur-[30px] shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <button onClick={() => onNavigate('chat_list')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f0edef] hover:opacity-80 transition-opacity active:scale-95">
          <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
        </button>
        <span className="font-th-heading text-[20px] text-[#7e5356] tracking-tighter font-bold">NEWFOUND</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40">
          <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFdKILLfIf5HZ_QpznYXDeXrLckhih6QjBJDaphLS_dA0E6CPwWRgR3fX4ROz7lFvImYVHtONQgAwXgtg1_Hl2iqZrV2hhRYBByZpBG22xtJyQTyFPaxs6tnwyZkkHCZbEE7YViXNf84ZGt91gXTG-RiPe22dvqII0bNWGV8nkx7Du4_e7a7U4byOkzEfEuizHCvA8TDqZjUL7B_gHg3EQuV3xMb4HNNCz6YTkQBpIth-wWUmsy_4G6YMJ6wsd0Zmd8vCdyi8LKGE" />
        </div>
      </header>

      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto space-y-6">
        <section className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[30px] border border-white/40 rounded-[40px] p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/50 shadow-xl overflow-hidden mb-6">
              <img className="w-full h-full object-cover" alt="Friend" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUOjo9RXyIHFK-IpRcj7jqUI9Pspd3w1IPh2_07kqEFeKNYJnpKmIyFlnPTCpwB2kvwwcIonI-kxFmZLluc2NM85Mq8cAkUagXrW8izB7xBc1VTbKrX0GpWRfKEY4IFyMo7x-j_uhRiN0huzgWux1LcE9hMxno08lTCcd0hIs4TitqEK8tPPV0KDiTpxueIB1mQqAhES69FwqnDuJd8Jyg_UAGuoGHtDdkQ5K5nUF-bEySZTIsEj88EozlL9Gpg2SUkHXEv1d9n64" />
            </div>
            <h1 className="font-th-heading text-[24px] font-bold text-[#1b1b1d] mb-1">เมธา สุขสันต์</h1>
            <p className="font-th-body text-[14px] text-[#45474a]/70 mb-6">@metha_joyful</p>
            
            <div className="flex justify-center gap-4">
              <button className="w-14 h-14 rounded-full bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 flex items-center justify-center text-[#5d5e63] hover:bg-[#f0b9bc]/30 active:scale-95 transition-all">
                <ChatBubble className="w-6 h-6 fill-current" />
              </button>
              <button className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7e5356] to-[#f0b9bc] flex items-center justify-center text-white shadow-lg shadow-[#7e5356]/20 active:scale-95 transition-all">
                <Call className="w-6 h-6 fill-current" />
              </button>
              <button className="w-14 h-14 rounded-full bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 flex items-center justify-center text-[#5d5e63] hover:bg-[#f0b9bc]/30 active:scale-95 transition-all">
                <Videocam className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </section>

        <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 rounded-[32px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
              <VerifiedUser className="w-5 h-5" />
            </div>
            <div>
              <p className="font-th-body text-[12px] font-semibold text-[#5d5e63] tracking-wider">สถานะความปลอดภัย</p>
              <p className="font-th-body text-[14px] text-[#45474a]">เข้ารหัสแบบ End-to-End</p>
            </div>
          </div>
          <Lock className="text-[#7e5356] w-6 h-6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 rounded-[32px] p-6 space-y-4">
            <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 uppercase tracking-widest">ข้อมูลติดต่อ</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-[#5d5e63] w-6 h-6" />
                <div>
                  <p className="font-th-body text-[14px] text-[#45474a]/60">อีเมล</p>
                  <p className="font-th-body text-[17px]">metha.s@newfound.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIphone className="text-[#5d5e63] w-6 h-6" />
                <div>
                  <p className="font-th-body text-[14px] text-[#45474a]/60">เบอร์โทรศัพท์</p>
                  <p className="font-th-body text-[17px]">+66 81 234 5678</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 rounded-[32px] p-6 flex flex-col justify-between">
            <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 uppercase tracking-widest">สถานที่ปัจจุบัน</h3>
            <div className="mt-4 h-24 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[#e0dfe4]/30 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <LocationOn className="text-[#7e5356] w-6 h-6 mx-auto mb-1" />
                  <p className="font-th-body text-[14px] font-semibold">กรุงเทพมหานคร, ไทย</p>
                </div>
              </div>
              <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCao70YuD-onddE8HyR92kGyXjJO1KWZdMnXY7Aj-GeHxk5iZyXGs2XLUHNEostvfgm-Mx-gjytw3jK6A4AN1TNC-n-emoTNagG4rRhinAIe11-r1NBElkdtveprvBrk1xUuVRHAXx0R2fbvudxEj8Pi4PMdYPm2KTZ-NWDRra6CCt8MsnFEmXv2eohIW20M-Fgp9OrT3KJ2enr3tyo__gSnOSQTYhU-mhe_O7Ryj_pAMsXGBTRczaHU4iP-DPjwEKNkVGvqN_Ofvc")'}}></div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-th-heading text-[20px] font-semibold text-[#1b1b1d]">สื่อที่แชร์ร่วมกัน</h2>
            <button className="text-[#7e5356] font-th-body text-[12px] font-semibold">ดูทั้งหมด</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuA-hK7DFUQRa35EZxEb0Xckd7FKgChHNyyKMiT1yvqJnuDge0dTwSArk65DEgoRtxM9p0nHvoq6FnDFUfmq8SMS6NIPW1iDKnoiYNG7JHSPlxQs4CCYY1QgijUEQf4qeT1e2BYT8i3M4KiCyv48CdNcxpk38fR8PgOEHgEo3VZVG75QppZtBmRB3eXqzAGDL02LJBikvBui2AqggCdaNZ_yGdOMaCvLTOVT97UPBhq2sTjj7N1tQFhScLYgV8Lh8zI8QT0tmBkZfTA",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCS3s1NSVCB1_5oSCg9BDf7021LDQdxFDseJP3RrLacn3WLgloxM3pEWRBikmMTD7MMwYpaR6BA7QI0sxglSScrCWO6pO3jlwm48oVlRq0zGTyisLHyoaApKf1m49gW514unPjahG4nNmxErSLPTBmQHguw-w29cSi4dcv8JQNMFXCtdTeShMXijdU89QmTGMVMq7TWfBkHckzaljIraDkFdzWXg00DLs-SmuYFL2Ci9bv8HimdQsfzFQOIGfOVh29TQgNqttdmIEk",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuD5V8_QuGCFSpDCT6Vm4OWvLJXzBdby6EZlJH5XGEVm2SNMFwbLFpmesdxayOAGToEVdz-g8AK7ASKDY2WGlHShjQIaKXQ-nnOmcVOHuHNujmKAsL_3yW_gLTgEabl7vBHpJBxk1YJBz21WJKvP2BEoJCAy5XeY-2zj48_iMPqhgdbuF65B68w5iQfCX4PzXi84100VDy0HDzzW3F8Co2vbH6YNmkJIRnmDNJAhrLgYqD7aHS1ahXHPXza6qTsH3dzKlXuil6hYePA"
            ].map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 relative group">
                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Shared Media" src={img} />
                {i === 2 && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[15px] border border-white/30 rounded-[32px] overflow-hidden">
          <button className="w-full px-6 py-5 flex items-center justify-between border-b border-white/10 hover:bg-white/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#7e5356]/10 flex items-center justify-center text-[#7e5356]">
                <Description className="w-5 h-5" />
              </div>
              <span className="font-th-body text-[17px]">ไฟล์เอกสาร (12)</span>
            </div>
            <ChevronRight className="text-[#45474a]/40 w-5 h-5" />
          </button>
          <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f2f2f7] flex items-center justify-center text-[#5d5e63]">
                <LinkIcon className="w-5 h-5" />
              </div>
              <span className="font-th-body text-[17px]">ลิงก์ที่แชร์ (45)</span>
            </div>
            <ChevronRight className="text-[#45474a]/40 w-5 h-5" />
          </button>
        </section>

        <button className="w-full py-4 text-[#ba1a1a] font-semibold flex items-center justify-center gap-2 hover:bg-[#ba1a1a]/5 rounded-2xl transition-colors">
          <Block className="w-5 h-5" />
          บล็อกรายชื่อติดต่อนี้
        </button>
      </main>
    </div>
  );
};
`,
  'CreateGroupScreen.tsx': `import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { ScreenId } from '../types';

export const CreateGroupScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const contacts = [
    { id: 4, name: "ก้องภพ อัศวไพศาล", status: "ออฟไลน์เมื่อ 2 ชม. ที่แล้ว", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC92ZQhVWCrkyzkk-YUqzLIuWkvkhetl4_Bkfp4e-YHsbbGeghU6faAg_4ZP68e1jI_p0ZT3KKnX4JZEC0h_pMcQGpVtN5aMFoidF5nyJichK1AxRuvsuflfqTf2SQcfOWJKQn4DnM8IvgsyyfbW2OLW6Cqq-cGR1I6Hfo94ORaI62WOXhEfxjK2skIF4mCVfRPz1bp5o1EVdcmarsAQTJJEddHNBUapT8Y9Vbb0eiatvqwYd8drFoQoCxLB1mKt8-cPRD5L1qDtFI" },
    { id: 5, name: "ชลธิชา มิ่งขวัญ", status: "กำลังใช้งาน", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiheaq0OQHb5G6X95sPtBuf-Yz9GLm7wxfBxKGrDYJGebR1GpYGxtlrTDaowxFhGdohgq1JJJbVOo6NfcbitOXpd1wPiN0fxRoKGck-QkotFf4j9WZQYf7A989BO8JZLxbL0FrhrvIWMBhxX3oAufeOiXys8bo7OrZDLBcaRDLzpe0ciqZKVDrFnnp0tXi30lLiZQCJLveb9CmtfA5qCwtVduI2xgjmya_cJ4CueJzXv8d07wpVKyYHeuUI0tMzQOwzDNxIZi8udY" },
    { id: 6, name: "ธนพล พงษ์ศิริ", status: "ไม่ระบุสถานะ", init: "ธพ" },
    { id: 7, name: "ประวิทย์ เจริญสุข", status: "ออฟไลน์", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv_pZjcuvi0iku3bQkrowNsbu6VsKMwzGbXBr2fRE2WixmjrKR4koxGdAbFHnhuwTPOtmvY_VZ3bbFcz96OZnT1ETREXo2qI9SMccrBYZE1_v2zIfHUUPTYS_jhjMdF_1uxxNkksdtD4Ic0TkThU9LDWloI-N_z01vY3XN4mnKVCfGF1WTVXTiimdp41CzW9q_znGItdDaKBcWBfP6yrrCSH0p4K_uAkOFdVM0nGmR7W4oXuobcMEKnHS3O7uJNTB_P_RECEgQbkw" }
  ];

  return (
    <div className="bg-gradient-to-br from-[#fcf8fb] to-[#e2e2e7] text-[#1b1b1d] min-h-screen font-th-body">
      <header className="fixed top-4 left-4 right-4 rounded-full border border-white/20 bg-[#f6f3f5]/40 backdrop-blur-[30px] shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('chat_list')} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#eae7ea] transition-colors active:scale-90">
            <X className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[20px] font-bold text-[#7e5356] tracking-tighter">สร้างกลุ่ม</h1>
        </div>
        <button className="font-th-body text-[12px] font-semibold px-6 py-2 bg-[#7e5356] text-white rounded-full hover:opacity-80 transition-opacity active:scale-95">ถัดไป</button>
      </header>

      <main className="pt-24 pb-40 px-5 max-w-2xl mx-auto min-h-screen">
        <div className="mb-8 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-[#45474a]/60 w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="ค้นหารายชื่อผู้ติดต่อ..." 
            className="w-full bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#7e5356]/20 placeholder:text-[#45474a]/40 transition-all duration-300 outline-none"
          />
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 whitespace-nowrap scrollbar-hide">
          <div className="inline-flex items-center gap-2 bg-[#f0b9bc]/20 px-3 py-2 rounded-full border border-[#7e5356]/10">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#eae7ea]"><img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWh09NtTrIRh14bqvOFHl3Gg5k06qazPS_Ko-CFhF_TXhIPHw1HTOp5jlk5qlvQXO2DidSPOQOJ5mc7mIxdxdSnnT5vhdXRHqLxI_baYXIiNfb7XMEWS4WctmxwQU10uy7-sbVKZ15mA8eYSiFTOKLxY9tEsuHbqb_0gi-hTHPQZveTOlzX0v3K5hBYWITDkFFy1xGu0QAiO7korajXYIUe5Z4YJpDwU2lIeDS73Ob1UP2JrTw7My4TAGtM27dhVRC8-5mPqtHUwg" /></div>
            <span className="font-th-body text-[12px] font-semibold text-[#7e5356]">รินรดา</span>
            <X className="w-4 h-4 text-[#7e5356]/60 cursor-pointer" />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#f0b9bc]/20 px-3 py-2 rounded-full border border-[#7e5356]/10">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#eae7ea]"><img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1awmfTQFpp5YbDV1cNB39yMg-jq_yJN2h_JAZQJe0MNcbaP_ALU1Tqq023qtoh01_Be_B2uPZ8mfmiy_agDGguB-QVGmSDxYGOab7pJyviTgAC-7Fqh1piua6xpvUWWjidUK2UfPFr5vEk7iqcLzwzgmUWQkTUpeMkrqBJ6yzGmHp2fwXca6C3WIWgcB8VfiLvlw2LQPnmigcMrd_w2imzEHHDFS4mRdMw1pABzyyk5RjBjyBfgclfx4qjxq9qGxyRO3yGGq9WjU" /></div>
            <span className="font-th-body text-[12px] font-semibold text-[#7e5356]">กิตติพงษ์</span>
            <X className="w-4 h-4 text-[#7e5356]/60 cursor-pointer" />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#f0b9bc]/20 px-3 py-2 rounded-full border border-[#7e5356]/10">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#eae7ea]"><img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHQ10sXERpNjYhUF_LxkDyD31wmK4WlkmFOfCi2r1jzzK3o-dhiAyo9hx-SuNFZDAai7f0ekCu76x-G6fHlGWugHoOj4lJBgjjCZcLxkgL3K2V13GMud0bgvPvGMQpRv2gNYBiseMR2dqsOzw32ac4phxnnXK4uM7LYhNiwZRyDVggPuXQAz1DhEd82UnWgKuOzWhzObpn1x8dpEx6WGh9bnpGmdPJerfAp0gODZkVUsf75AEUYf5dLUcysvcNtCDBCR2wRlffR8g" /></div>
            <span className="font-th-body text-[12px] font-semibold text-[#7e5356]">นภัสสร</span>
            <X className="w-4 h-4 text-[#7e5356]/60 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-th-body text-[12px] font-semibold text-[#45474a]/60 px-2 uppercase">รายชื่อผู้ติดต่อ (48)</p>
          
          {contacts.map((c) => (
            <div 
              key={c.id} 
              onClick={() => toggleSelect(c.id)}
              className={\`group flex items-center justify-between p-4 rounded-3xl bg-[rgba(252,248,251,0.4)] backdrop-blur-[30px] border \${selectedIds.includes(c.id) ? 'border-[#7e5356]/20 bg-[#ffefef]/30' : 'border-white/30'} cursor-pointer hover:bg-white/40 transition-all duration-300 active:scale-[0.98]\`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {c.img ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50"><img className="w-full h-full object-cover" src={c.img} /></div>
                  ) : (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 flex items-center justify-center bg-[#e0dfe4] text-[#5d5e63] font-bold">{c.init}</div>
                  )}
                  {c.status === "กำลังใช้งาน" && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#fcf8fb]"></div>}
                  {c.status.includes("ออฟไลน์") && <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-[#fcf8fb]"></div>}
                </div>
                <div>
                  <p className="font-th-heading text-[17px] font-semibold text-[#1b1b1d]">{c.name}</p>
                  <p className="font-th-body text-[14px] text-[#45474a]/60">{c.status}</p>
                </div>
              </div>
              <div className="relative">
                <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 \${selectedIds.includes(c.id) ? 'bg-[#7e5356] border-[#7e5356]' : 'border-[#c6c6ca] bg-transparent'}\`}>
                  {selectedIds.includes(c.id) && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 left-0 w-full z-50 flex justify-center items-center px-6">
        <div className="flex items-center justify-between w-full max-w-md bg-[#fcf8fb]/80 backdrop-blur-[30px] px-6 py-4 rounded-full border border-white/20 shadow-sm">
          <div className="flex flex-col">
            <span className="font-th-body text-[10px] font-semibold text-[#45474a]/60 uppercase">เลือกแล้ว</span>
            <span className="font-bold text-[#7e5356]">{selectedIds.length + 3} สมาชิก</span>
          </div>
          <button className="bg-gradient-to-r from-[#7e5356] to-[#a37c7f] px-8 py-3 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2">
            สร้างกลุ่ม
          </button>
        </div>
      </div>
    </div>
  );
};
`,
  'OfficialAccountScreen.tsx': `import React from 'react';
import { Verified, Settings, ChatBubble, Call, Share, Security, CloudSync, ChevronRight } from 'lucide-react';
import { ScreenId } from '../types';

export const OfficialAccountScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body selection:bg-[#ffdadb] selection:text-[#311215]">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <Verified className="text-[#5d5e63] w-6 h-6" />
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
        <button onClick={() => onNavigate('settings_account')} className="hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <Settings className="text-[#5d5e63] w-6 h-6" />
        </button>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-6xl mx-auto space-y-6">
        <section className="bg-white/40 backdrop-blur-[20px] border border-white/50 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] flex items-center justify-center p-1 overflow-hidden shadow-sm">
              <img className="w-full h-full object-cover rounded-full" alt="Brand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl_ZYXiPiOEnjzFBzA3OfSa2TIbb2aFcKJ3kPjYD8kAP6YQ_-F-2cE3Sq4GDMjzvUCE24g-oCThhLKxf1v9kM00rdWtCBc6_1OCpukuEdV6sq2F9kigcPeYOaDGotRnlv7VwAHV7RFIdjJtH0qbK3F5Uy29xFXi0pPCwG2Zo_q7moJMVDQRfTZhGthxsNzXMZU1VsVqFvknwzJCu3A98LOlJfk6Wqa_YqbtmjoDDq14w4PvPTl-3SGk10y_bSnpTL-_-En0vu73ZU" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="font-th-heading text-[34px] md:text-[48px] font-bold text-[#1b1b1d] flex items-center justify-center md:justify-start gap-2">
                  NEWFOUND คอร์ปอเรชัน
                  <Verified className="text-[#7e5356] w-8 h-8 fill-[#7e5356] text-white" />
                </h2>
                <span className="bg-[#ffefef] text-[#8f6265] px-3 py-1 rounded-full font-th-body text-[12px] font-semibold self-center md:self-auto">
                  บัญชีทางการ
                </span>
              </div>
              <p className="text-[#45474a] font-th-body text-[17px] max-w-2xl leading-relaxed">
                เราคือผู้นำด้านนวัตกรรมดิจิทัลที่เน้นความปลอดภัยและความโปร่งใส ด้วยเทคโนโลยี Liquid Glass ที่ทันสมัยที่สุด เพื่อยกระดับประสบการณ์การใช้งานของลูกค้าในระดับพรีเมียม
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-[#7e5356] font-medium hover:underline decoration-[#7e5356]/30">
                www.newfound.co.th
              </a>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <button className="bg-gradient-to-br from-[#7e5356] to-[#b89194] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                  <ChatBubble className="w-5 h-5" /> ส่งข้อความ
                </button>
                <button className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 text-[#45474a] px-8 py-3 rounded-full font-semibold hover:bg-white/40 active:scale-95 transition-all flex items-center gap-2">
                  <Call className="w-5 h-5" /> โทรออก
                </button>
                <button className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 text-[#45474a] p-3 rounded-full hover:bg-white/40 active:scale-95 transition-all">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">บริการและประกาศ</h3>
            <button className="text-[#7e5356] font-th-body text-[12px] font-semibold hover:opacity-70 transition-opacity">ดูทั้งหมด</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 rounded-[24px] p-1 overflow-hidden group cursor-pointer">
              <div className="relative h-64 md:h-full rounded-[20px] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="News" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8ufra8vhDjFzuTRecCCd3FLkaaahEiw-p-twZeiQOKw6REBCP966v3s9QNX8rmStGZ-_9so5-xiQ0yCotm9jeWh6fe7EDRmFAe1WSNp1LOnBrBQilKsCTuCNkS1RikAwMPILsQmedWfK9pJ_QhDI2ypP0ELTqburs4rHjdtsEFgS2NXffHMH1rpcZPOSrm3plVwvyrW80jLjBTzCQu-H-dRSWAGhTHJf2f7DCgGGOMdQ1wlg17juKIAWCoYAVSvQXOk58vAzAHXg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 font-th-body text-[12px] font-semibold mb-2">ประกาศล่าสุด</span>
                  <h4 className="text-white font-th-heading text-[20px] md:text-[24px] font-bold">เปิดตัวสำนักงานใหญ่แห่งใหม่ ใจกลางกรุงเทพฯ</h4>
                  <p className="text-white/70 font-th-body text-[14px] mt-2 line-clamp-2">สัมผัสประสบการณ์การบริการระดับเวิลด์คลาสได้แล้ววันนี้ ณ อาคาร NewFound Tower</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 rounded-[24px] p-6 space-y-4 hover:bg-white/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#8f6265]">
                <Security className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1b1b1d]">ระบบความปลอดภัยขั้นสูง</h4>
                <p className="text-[#45474a] text-[14px] mt-2">ปกป้องข้อมูลของคุณด้วยการเข้ารหัสระดับเดียวกับธนาคาร</p>
              </div>
              <div className="pt-4 border-t border-[#1b1b1d]/5">
                <span className="text-[#7e5356] font-th-body text-[12px] font-semibold flex items-center gap-1">
                  รายละเอียดเพิ่มเติม <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            
            <div className="bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 rounded-[24px] p-6 space-y-4 hover:bg-white/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#e2e2e7] flex items-center justify-center text-[#1a1c1f]">
                <CloudSync className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1b1b1d]">Cloud Vault Pro</h4>
                <p className="text-[#45474a] text-[14px] mt-2">พื้นที่เก็บข้อมูลคลาวด์ส่วนตัวที่รวดเร็วและไร้รอยต่อ</p>
              </div>
              <div className="pt-4 border-t border-[#1b1b1d]/5">
                <span className="text-[#7e5356] font-th-body text-[12px] font-semibold flex items-center gap-1">
                  จองการใช้งาน <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="md:col-span-2 bg-[rgba(252,248,251,0.6)] backdrop-blur-[12px] border border-white/80 rounded-[24px] p-8 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2">
                <h4 className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">ต้องการที่ปรึกษาทางธุรกิจ?</h4>
                <p className="text-[#45474a]">จองคิวเพื่อคุยกับผู้เชี่ยวชาญของเราได้ฟรี 30 นาทีแรก</p>
              </div>
              <button className="bg-[#1b1b1d] text-[#fcf8fb] px-10 py-4 rounded-full font-bold hover:opacity-80 active:scale-95 transition-all shrink-0">
                นัดหมายล่วงหน้า
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
`,
  'ArchivedChatsScreen.tsx': `import React from 'react';
import { ArrowLeft, Archive, Search, Settings, ArrowLeftToLine } from 'lucide-react';
import { ScreenId } from '../types';

export const ArchivedChatsScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen font-th-body bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#fcf8fb_100%)] overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('chat_list')} className="active:scale-95 duration-200 hover:opacity-80 transition-opacity">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="font-th-heading text-[20px] md:text-[24px] font-bold text-[#5d5e63] tracking-tighter">แชทที่เก็บถาวร</h1>
            <span className="text-[12px] font-semibold text-[#45474a]/60 uppercase">Archived Conversations</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#ffefef] text-[#8f6265] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1">
            <Archive className="w-[14px] h-[14px]" />
            ARCHIVED
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#76777b] w-5 h-5" />
            <input 
              type="text" 
              placeholder="ค้นหาในจดหมายเหตุ..." 
              className="w-full bg-[#f6f3f5] border-none rounded-2xl py-3 pl-12 pr-4 text-[#1b1b1d] placeholder:text-[#76777b] focus:ring-2 focus:ring-[#7e5356]/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 py-2 mb-2 opacity-40">
            <ArrowLeftToLine className="w-4 h-4" />
            <span className="font-th-body text-[10px] font-semibold">ปัดไปทางซ้ายเพื่อยกเลิกการเก็บถาวร</span>
          </div>

          <div className="group relative overflow-hidden bg-[rgba(255,255,255,0.4)] backdrop-blur-[12px] border border-white/50 rounded-[24px] p-4 flex items-center gap-4 transition-all hover:bg-white/60 cursor-pointer">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3LfRyeA9H9-jdQ6_oUllC8SYUVXuXbX3Gr5hKVFU7Y6NZFrt2gtl_Zof0ypbO9tS9Myrs5a5usNcCOv0QDajprXHgT8a1RrOQ_lqwd3IDU6_p7L73WlntCgV1VOkjppiFG2zt1IOlit0cH5l8Ic8iBoANRcp05DPoJeKBX5H-dOVVjmuzDkvNS8jaNQTj4QYYtIzr4uUn75aSLTFMFSrtXVvO-zBGZjYomEtGKNSvK8ofyiuNPmDnxL5MaQufH9mvWjYk7zit66k")'}}></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f0b9bc] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-th-heading text-[16px] font-bold text-[#1b1b1d]">วิภาวี รัตนากร</h3>
                <span className="text-[11px] text-[#76777b]">2 วันที่แล้ว</span>
              </div>
              <p className="text-[14px] text-[#45474a]/80 line-clamp-1">ได้ตรวจสอบเอกสารความปลอดภัยชุดใหม่เรียบร้อยแล้วค่ะ...</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-[rgba(255,255,255,0.4)] backdrop-blur-[12px] border border-white/50 rounded-[24px] p-4 flex items-center gap-4 transition-all hover:bg-white/60 cursor-pointer">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBO98C3X9fIaKo8KO96t15dqYyN5qAOO-sYCeOSD1kt7PUx6LWcfDCsdpsVz0DEPRLvxtECkDwZ7jToTk7p3_KOnCfFHk9RWCNlajjJtrJnbuo0A9vJOMvikjNwSxb79KpaIwXYfWyWNCtkxFNxVVdBTnsSf6WxV5SPQtfnVNRmVcLcz6LjhriG5lXgOIa-r46PIrTo-qg3lNtvyBPXmwtnaXtOq-TLbHMJ3HsrlHoTbD5742XRbn4-gK1KDQaK0DqpAmfVErwWpcM")'}}></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#c6c6cb] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-th-heading text-[16px] font-bold text-[#1b1b1d]">กลุ่มโปรเจกต์ NEWFOUND</h3>
                <span className="text-[11px] text-[#76777b]">1 สัปดาห์ที่แล้ว</span>
              </div>
              <p className="text-[14px] text-[#45474a]/80 line-clamp-1">ธีรเดช: สรุปแผนการเข้ารหัสข้อมูลชั้นความลับสูงสุด...</p>
            </div>
          </div>
          
          <div className="mt-12 text-center opacity-30">
            <p className="font-th-body text-[12px] font-semibold">การสนทนาเก่าถูกจัดเก็บไว้อย่างปลอดภัย</p>
          </div>
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
