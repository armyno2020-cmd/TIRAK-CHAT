import React from "react";
import {
  ArrowLeft,
  Verified,
  Settings,
  MessageCircle,
  Phone,
  Share,
  Shield,
  Cloud,
  ChevronRight,
} from "lucide-react";
import { ScreenId } from "../types";

export const OfficialAccountScreen: React.FC<any> = (props) => {
  const {
    onNavigate,
    activeLanguage,
    currentUser,
    chatRoom,
    chats,
    messages,
    peerName,
  } = props || {};
  return (
    <div className="bg-transparent text-[#1b1b1d] min-h-screen font-th-body selection:bg-[#ffdadb] selection:text-[#311215]">
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("account")}
            className="glass-button-secondary p-2 -ml-2 rounded-full glass-button-secondary transition-colors text-[#1b1b1d]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">
            บัญชีทางการ
          </span>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-16 max-w-6xl mx-auto space-y-6">
        <section className="glass-surface backdrop-blur-[20px] border border-white/50 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white glass-surface flex items-center justify-center p-1 overflow-hidden shadow-sm">
              <img
                className="w-full h-full object-contain p-2 rounded-full"
                alt="TIRAK CHAT Official"
                src="/tirak_logo.png"
              />
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
                เราคือผู้นำด้านนวัตกรรมดิจิทัลที่เน้นความปลอดภัยและความโปร่งใส
                ด้วยเทคโนโลยี Liquid Glass ที่ทันสมัยที่สุด
                เพื่อยกระดับประสบการณ์การใช้งานของลูกค้าในระดับพรีเมียม
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#7e5356] font-medium hover:underline decoration-[#7e5356]/30"
              >
                www.newfound.co.th
              </a>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <button className="glass-button-secondary bg-gradient-to-br from-[#7e5356] to-[#b89194] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> ส่งข้อความ
                </button>
                <button className="glass-surface border border-white/80 text-[#45474a] px-8 py-3 rounded-full font-semibold glass-button-secondary active:scale-95 transition-all flex items-center gap-2">
                  <Phone className="w-5 h-5" /> โทรออก
                </button>
                <button className="glass-surface border border-white/80 text-[#45474a] p-3 rounded-full glass-button-secondary active:scale-95 transition-all">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">
              บริการและประกาศ
            </h3>
            <button className="glass-button-secondary text-[#7e5356] font-th-body text-[12px] font-semibold hover:opacity-70 transition-opacity">
              ดูทั้งหมด
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-surface border border-white/80 rounded-[24px] p-1 overflow-hidden group cursor-pointer">
              <div className="relative h-64 md:h-full rounded-[20px] overflow-hidden">
                <img
                  className="rounded-[20px] shadow-sm w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="News"
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 font-th-body text-[12px] font-semibold mb-2">
                    ประกาศล่าสุด
                  </span>
                  <h4 className="text-white font-th-heading text-[20px] md:text-[24px] font-bold">
                    เปิดตัวสำนักงานใหญ่แห่งใหม่ ใจกลางกรุงเทพฯ
                  </h4>
                  <p className="text-white/70 font-th-body text-[14px] mt-2 line-clamp-2">
                    สัมผัสประสบการณ์การบริการระดับเวิลด์คลาสได้แล้ววันนี้ ณ
                    อาคาร NewFound Tower
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-surface border border-white/80 rounded-[24px] p-6 space-y-4 glass-button-secondary transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#8f6265]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1b1b1d]">
                  ระบบความปลอดภัยขั้นสูง
                </h4>
                <p className="text-[#45474a] text-[14px] mt-2">
                  ปกป้องข้อมูลของคุณด้วยการเข้ารหัสระดับเดียวกับธนาคาร
                </p>
              </div>
              <div className="pt-4 border-t border-[#1b1b1d]/5">
                <span className="text-[#7e5356] font-th-body text-[12px] font-semibold flex items-center gap-1">
                  รายละเอียดเพิ่มเติม <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="glass-surface border border-white/80 rounded-[24px] p-6 space-y-4 glass-button-secondary transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#e2e2e7] flex items-center justify-center text-[#1a1c1f]">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1b1b1d]">
                  Cloud Vault Pro
                </h4>
                <p className="text-[#45474a] text-[14px] mt-2">
                  พื้นที่เก็บข้อมูลคลาวด์ส่วนตัวที่รวดเร็วและไร้รอยต่อ
                </p>
              </div>
              <div className="pt-4 border-t border-[#1b1b1d]/5">
                <span className="text-[#7e5356] font-th-body text-[12px] font-semibold flex items-center gap-1">
                  จองการใช้งาน <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="md:col-span-2 glass-surface border border-white/80 rounded-[24px] p-8 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2">
                <h4 className="font-th-heading text-[24px] font-bold text-[#1b1b1d]">
                  ต้องการที่ปรึกษาทางธุรกิจ?
                </h4>
                <p className="text-[#45474a]">
                  จองคิวเพื่อคุยกับผู้เชี่ยวชาญของเราได้ฟรี 30 นาทีแรก
                </p>
              </div>
              <button className="glass-button-secondary bg-[#1b1b1d] text-[#fcf8fb] px-10 py-4 rounded-full font-bold hover:opacity-80 active:scale-95 transition-all shrink-0">
                นัดหมายล่วงหน้า
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
