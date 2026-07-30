import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';

const screens = {
  'GlobalSearchScreen.tsx': `import React from 'react';
import { VerifiedUser, Settings, Search, History, ArrowUpLeft, PermMedia, Link as LinkIcon, Videocam, ChatBubble, Security, Group, Lock } from 'lucide-react';
import { ScreenId } from '../types';

export const GlobalSearchScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-br from-[#fcf8fb] to-[#f0edef] text-[#1b1b1d] min-h-screen font-th-body overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <VerifiedUser className="text-[#5d5e63] w-6 h-6" />
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('settings_account')} className="hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <Settings className="text-[#45474a] w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARVP3y0c3hE54R97Xgz0lUXDKsDVuO9r1JUig3L6AfW0z_rdP55d-ROMKi2dAUn3kS2yCpnGSRiI5Ji9gzRIzVIAFk9eMEJB50AlM35ZL-r7xmBolkj-NGpKlgiyWAED_a2GTLHCOPyQoqyVoaHcAWqRrFNADbZuUopxizl-tpxRGaJu9Nj3wkforMVdna8V6eMXO3tk9SfFqkLWvh2vnWuT2DaUHfqEZzwA3Du1wZA24JHQjmoDF7mUQGNE1Loye-6Jox-NK5fLk" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-7xl mx-auto">
        <section className="mb-12">
          <div className="relative group transition-all duration-500 rounded-[32px] bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/40 shadow-sm p-2 focus-within:ring-2 focus-within:ring-[#7e5356]/20">
            <div className="flex items-center px-6 py-4 gap-4">
              <Search className="text-[#7e5356] w-8 h-8" />
              <input 
                autoFocus 
                type="text" 
                placeholder="ค้นหาข้อความ, รายชื่อ หรือไฟล์..." 
                className="w-full bg-transparent border-none focus:ring-0 font-th-heading text-[20px] text-[#1b1b1d] placeholder:text-[#45474a]/40 outline-none"
              />
              <button className="bg-[#7e5356] text-white px-6 py-2 rounded-full font-th-body text-[12px] font-semibold hover:brightness-110 transition-all active:scale-95">
                ค้นหา
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/10 p-6 rounded-[24px] shadow-sm h-full">
              <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 mb-6 uppercase tracking-widest">การค้นหาล่าสุด</h3>
              <div className="flex flex-col gap-4">
                {['สัญญาจ้างงาน 2024', 'การประชุมทีมกลยุทธ์', 'กุญแจส่วนตัว Vault'].map((text, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/20 p-2 -mx-2 rounded-xl transition-all">
                    <div className="flex items-center gap-3">
                      <History className="text-[#45474a]/40 w-5 h-5" />
                      <span className="font-th-body text-[17px] text-[#1b1b1d]">{text}</span>
                    </div>
                    <ArrowUpLeft className="text-[#45474a]/20 group-hover:text-[#7e5356] transition-colors w-5 h-5" />
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#1b1b1d]/5">
                <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 mb-6 uppercase tracking-widest">หมวดหมู่แนะนำ</h3>
                <div className="flex flex-wrap gap-2">
                  {['เอกสาร PDF', 'รูปภาพ', 'ลิงก์', 'วิดีโอ'].map(t => (
                    <span key={t} className="px-4 py-2 rounded-full bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/40 text-[14px] font-medium text-[#45474a] hover:text-[#7e5356] hover:border-[#7e5356] transition-all cursor-pointer">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/10 p-8 rounded-[32px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">ข้อความที่พบ</h3>
                <span className="text-[#7e5356] font-th-body text-[12px] font-semibold cursor-pointer hover:underline">ดูทั้งหมด</span>
              </div>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex-shrink-0 overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9-_csfELEwoB9RhlN8LIx8ph9qFUPnc0SXOcFnDGRO3Kfssyk5VUnCYL1QDk6QoQowTYuDLLIlqOOI3Tc67r60BOsagfUORbin7_85d-AxFfUHaB3LTeHN2N0sue1FGE1YbIFJ5rr7FTt99LcEqmgsyOZqyTSfN70W91MlkTVma4kYtp-8FWeAAD7RCv_YPjg2Ak_V5yXtdK3ubtBUpNC81XRcar7SiK04-rR1BO2UUMJa_cICbpWnw7XjnUccd46zUMZPGUmMuc" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-[#1b1b1d]">ณิชา พงษ์สวัสดิ์</h4>
                        <span className="text-[12px] text-[#45474a]/50">14:20 น.</span>
                      </div>
                      <p className="text-[#45474a] leading-relaxed">
                        ผมส่งไฟล์ <span className="bg-[#ffefef] text-[#8f6265] px-1.5 py-0.5 rounded font-semibold">กุญแจ</span> สำหรับเปิด Vault ชุดใหม่ให้คุณแล้วนะ รบกวนเช็คความถูกต้องด้วยครับ...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-[#1b1b1d]/5 ml-16"></div>
                <div className="group cursor-pointer">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#ffced1] flex items-center justify-center text-[#7b5558] font-bold flex-shrink-0">GD</div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-[#1b1b1d]">Group: Design System</h4>
                        <span className="text-[12px] text-[#45474a]/50">เมื่อวานนี้</span>
                      </div>
                      <p className="text-[#45474a] leading-relaxed">
                        อัปเดตเลเยอร์ <span className="bg-[#ffefef] text-[#8f6265] px-1.5 py-0.5 rounded font-semibold">Liquid Glass</span> ตัวใหม่ล่าสุดให้ใน Shared Library เรียบร้อยแล้วครับ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/10 p-6 rounded-[24px] shadow-sm">
                <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 mb-6 uppercase tracking-widest">รายชื่อที่เกี่ยวข้อง</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex-shrink-0 overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_6UqPuXC2MurqtE4W0SGKxGCZORbAyRSbZ26vuL_XSoHalJxqd680i-vp42u1MegQfUV2gny6wRcPRS_96Bl-0LDjKAaJrJOcJ3ZyPeKVX1hTHbYiihKFFWTdHevIBJ84iOH95qg6AL-aiR0Sz7VifTBatzod7xoFiltLxPAg-tQKj-YAddvEEE5U9ISmrklKNJCevuB1fdfplaHLa6zN_a6IjZDufNgtDT8jr_tIX0sDAcHJYdZFsejfvVxsmP8N-U6OV9_gx3s" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#1b1b1d] text-[14px]">วิศรุต กิตติคุณ</h5>
                      <p className="text-[12px] text-[#45474a]">Security Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#ffefef] text-[#8f6265] flex items-center justify-center font-bold text-[12px]">MS</div>
                    <div>
                      <h5 className="font-semibold text-[#1b1b1d] text-[14px]">Maya Smith</h5>
                      <p className="text-[12px] text-[#45474a]">Vault Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(252,248,251,0.4)] backdrop-blur-[20px] border border-white/10 p-6 rounded-[24px] shadow-sm">
                <h3 className="font-th-body text-[12px] font-semibold text-[#45474a]/60 mb-6 uppercase tracking-widest">สื่อที่แชร์ล่าสุด</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-pointer relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Media" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGGc1RpNK7vmPtx_iPMZ1YXnDEJsQPWKsn8uF7emWG7VNOEOeeu8QbBRZ9bLapavp9F51w8785rbcAu3FIfpCujwASiCWsYCgXrrn2bj8a-AIXRjRq0pjD8uHUyR7tNrBCpMbVKFBflFZxosgG6zgIjPi7jAgvBpd0Wi9xHS5A91H9-Mz9HIqrWBuePiA2vCpX2MwTxLMqAhglDzaAsEG7yTJFsrY9IIfpaxsBKB0REq95y7N8gXlcJPYFCgBECowiHbhL3uAdBh0" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-pointer relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Media" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa2dd9Xx7rW0DfE-UYR-2XFDkNnZ89Qa_W4pPt0PTgZtucf_oGL7ZoWxVVCSFV4IZvWarWFe78R0qPQRQ2Q_l4NzhN1eriPefAFg5HAo9zSJSBr0Gtbb18rytjwea-RmyQb9Tj2Vb4Yc91wHsgFaB9UezAAl9WOJ-QbtGa_HgfftQ1ALejA5yZHIHWFl2eA8zQNLZQrRLh8XThMP_6cxiZlWCGpRrF_u7feye7ThBpvAnuICBwD8FkDevQnqV78oG-Flbf6w8_wu0" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-pointer relative flex items-center justify-center bg-[#f0edef]">
                    <span className="text-[#45474a]/40">PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center p-2 mx-auto bg-[#fcf8fb]/40 backdrop-blur-[20px] w-[90%] max-w-md rounded-full border border-white/20 shadow-xl shadow-[#5d5e63]/5">
        <button onClick={() => onNavigate('chat_list')} className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all active:scale-90 duration-300">
          <ChatBubble className="mb-1 w-6 h-6" />
          <span className="font-th-body text-[10px] font-semibold">Chats</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all active:scale-90 duration-300">
          <Group className="mb-1 w-6 h-6" />
          <span className="font-th-body text-[10px] font-semibold">Groups</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-[#ffefef] text-[#8f6265] rounded-full px-5 py-2 active:scale-90 duration-300">
          <Lock className="mb-1 w-6 h-6 fill-current" />
          <span className="font-th-body text-[10px] font-semibold">Vault</span>
        </button>
        <button onClick={() => onNavigate('permissions')} className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all active:scale-90 duration-300">
          <Security className="mb-1 w-6 h-6" />
          <span className="font-th-body text-[10px] font-semibold">Privacy</span>
        </button>
      </nav>
    </div>
  );
};
`,
  'BlockedContactsScreen.tsx': `import React, { useState } from 'react';
import { ArrowLeft, Settings, UserPlus, Search, ShieldAlert, ChatBubble, Users, Lock, Security } from 'lucide-react';
import { ScreenId } from '../types';

export const BlockedContactsScreen: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  const [blockedList, setBlockedList] = useState([
    { id: 1, name: "อภิชาติ รัตนศิลป์", time: "บล็อกเมื่อ 2 วันที่แล้ว", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJSBrLoGxBiYXLnlII-o2qfOiAKXPvFo-2TXDpqMbiIAu5KqysX5I2AS7RLSrgB2BAaX-jRqLRkSbii-Dkdfanx8JP4fJbQwgeNuzLdgJbo7tPo2rBuASoqf02N2hqK8j4LwFoRuAztvyDkp8VsnC5Wu1KN3CfLaDPthnQ14g1mT4M1brfo_1ATYwA8EM23y3Nyz5YG0LR_CFRF0G_mJ1n53dxrNnp8R-20Wo0TiBsZeMqdgxt7JSz5Niz6p651CbvBZkAaY4_ywc" },
    { id: 2, name: "พิมลวรรณ สุขุม", time: "บล็อกเมื่อ 1 สัปดาห์ที่แล้ว", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-K1WvJYgeYYYX7TTyuDbYOKIofieFcT3TTUnibEcgM1rafb3ztZMm1GOR0YfT5qEYYWuuBCn6Mm8MfDrmNcFLNA7yvTGX9Wi6bqeZ23iD8D7CBntYTOrxrgdGmDlR1l0EmSWb1DlhlGehh5kecGpceM5_nPn4Nsqo049mOq0Y5x8XFbxgbjuY4vcovAcxM5zD65qhtoVMadmhg2oaVIlorFs7pCdmS-_tUXMOGLqEiXSouwiimmuuklQlF5GiA_w1b6yUWaRswqA" },
    { id: 3, name: "ธนภัทร ใจดี", time: "บล็อกเมื่อ 15 พ.ค. 2024", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7RXlV6Hu8YaH9aJiamF2IKdqZIHCNj7WyWGZRgxv85Fwlrku8jEZjarFoqAh2B02kkvxfIzCxTmPNw0IVW2UmV7DwHnN4qL-1mZIEmR36zpfAOz7gSfxsBifdPrHGOPJ4yQvuZcRsyiQkC1T3Q-lm0ilBMooiKqR_DZjKhAsy5cirJpfM4rY2jLtoEXICcEjioqtL-zVh3no69o1WQgcaEw7SGhM1yICHFOnVMQEt_5R7XtI6pNayuZJS8Lt1PdDqN9ff8VO7Alk" }
  ]);

  const unblock = (id: number) => {
    setBlockedList(blockedList.filter(b => b.id !== id));
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,#fcf8fb_0%,#f0edef_100%)] min-h-screen text-[#1b1b1d] font-th-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf8fb]/60 backdrop-blur-[30px] border-b border-[#1b1b1d]/10 flex justify-between items-center px-5 md:px-16 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings_privacy')} className="active:scale-95 duration-200">
            <ArrowLeft className="text-[#5d5e63] w-6 h-6" />
          </button>
          <h1 className="font-th-heading text-[24px] font-bold tracking-tighter text-[#5d5e63]">NEWFOUND</h1>
        </div>
        <div className="flex items-center gap-4">
          <Settings className="text-[#5d5e63] w-6 h-6 active:scale-95 duration-200 cursor-pointer" />
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-4xl mx-auto min-h-screen">
        <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-th-heading text-[34px] md:text-[48px] font-bold text-[#1b1b1d]">รายชื่อที่บล็อก</h2>
            <p className="text-[#45474a] font-th-body text-[14px]">จัดการผู้ติดต่อที่คุณไม่ต้องการรับข้อความหรือการแจ้งเตือน</p>
          </div>
          <button className="bg-gradient-to-br from-[#7e5356] to-[#b88a8d] text-white flex items-center justify-center gap-2 px-6 py-3 rounded-full font-th-body text-[12px] font-semibold shadow-xl shadow-[#7e5356]/10 active:scale-95 transition-all duration-300">
            <UserPlus className="w-5 h-5 fill-current" />
            เพิ่มรายชื่อใหม่
          </button>
        </section>

        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-[#76777b] w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="ค้นหาตามชื่อ..." 
            className="w-full bg-[#f6f3f5]/50 border-none rounded-2xl pl-12 py-4 focus:ring-2 focus:ring-[#7e5356]/20 placeholder:text-[#76777b]/60 text-[17px] outline-none"
          />
        </div>

        <div className="space-y-3">
          {blockedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShieldAlert className="w-16 h-16 text-[#76777b]/30 mb-4" />
              <p className="text-[#45474a]">ไม่มีรายชื่อที่ถูกบล็อกในขณะนี้</p>
            </div>
          ) : (
            blockedList.map(b => (
              <div key={b.id} className="bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px] border border-white/20 p-4 rounded-[24px] flex items-center justify-between group hover:bg-[rgba(255,255,255,0.25)] hover:-translate-y-[2px] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 ring-1 ring-black/5">
                    <img className="w-full h-full object-cover" alt="Profile" src={b.img} />
                  </div>
                  <div>
                    <h3 className="font-th-heading text-[17px] font-bold text-[#1b1b1d]">{b.name}</h3>
                    <p className="text-[#45474a] text-[14px]">{b.time}</p>
                  </div>
                </div>
                <button onClick={() => unblock(b.id)} className="px-5 py-2 rounded-full border border-[#76777b]/20 text-[#45474a] font-th-body text-[12px] font-semibold hover:bg-[#eae7ea] transition-colors active:scale-95">
                  เลิกบล็อก
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 p-6 bg-[rgba(255,255,255,0.4)] backdrop-blur-[20px] rounded-[32px] border-dashed border-[#7e5356]/20 border-2">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#ffefef] rounded-2xl">
              <Security className="text-[#8f6265] w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="font-th-heading text-[17px] font-bold text-[#1b1b1d]">ความเป็นส่วนตัวคือสิ่งสำคัญ</h4>
              <p className="text-[#45474a] text-[14px] mt-1 leading-relaxed">
                เมื่อคุณบล็อกผู้ติดต่อ พวกเขาจะไม่สามารถเห็นสถานะออนไลน์ของคุณ หรือติดต่อคุณผ่านทางข้อความและกลุ่มได้ ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดในระบบนิเวศของ NEWFOUND
              </p>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md rounded-full border border-white/20 bg-[#fcf8fb]/40 backdrop-blur-[20px] shadow-xl shadow-[#5d5e63]/5 z-50 flex justify-around items-center p-2">
        <button onClick={() => onNavigate('chat_list')} className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all rounded-full active:scale-90 duration-300">
          <ChatBubble className="w-6 h-6 mb-1" />
          <span className="font-th-body text-[10px] font-semibold">Chats</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all rounded-full active:scale-90 duration-300">
          <Users className="w-6 h-6 mb-1" />
          <span className="font-th-body text-[10px] font-semibold">Groups</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#45474a]/70 px-5 py-2 hover:bg-white/20 transition-all rounded-full active:scale-90 duration-300">
          <Lock className="w-6 h-6 mb-1" />
          <span className="font-th-body text-[10px] font-semibold">Vault</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-[#ffefef] text-[#8f6265] rounded-full px-5 py-2 active:scale-90 duration-300">
          <Security className="w-6 h-6 mb-1 fill-current" />
          <span className="font-th-body text-[10px] font-semibold">Privacy</span>
        </button>
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
