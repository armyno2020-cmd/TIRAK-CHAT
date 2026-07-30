import React, { useRef, useState, useEffect } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Shield,
  Globe,
  Lock,
  EyeOff,
  Laptop,
  MessageSquare,
  FolderLock,
  Sparkles,
  Smartphone,
  Fingerprint,
  Clock,
  Key,
  CheckCircle2,
  ChevronDown,
  RefreshCw,
  Zap,
  Activity,
  Cpu,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";
import { motion, useInView } from "framer-motion";

interface WelcomeScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLanguageModal: () => void;
  onGoogleSignIn?: () => void;
}

/* Animated Counter Component for Running Statistics Numbers */
const AnimatedCounter: React.FC<{
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}> = ({ from = 0, to, decimals = 0, suffix = "", prefix = "", duration = 2.2 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = from + (to - from) * easedProgress;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  activeLanguage,
  onNavigate,
  onOpenLanguageModal,
  onGoogleSignIn,
}) => {
  const privacySectionRef = useRef<HTMLDivElement>(null);
  const [timerCount, setTimerCount] = useState(5);
  const [activeCategory, setActiveCategory] = useState("all");

  const scrollToPrivacy = () => {
    privacySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Demo Countdown Timer Loop for Auto-Erasure Widget
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerCount((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between p-4 md:p-8 relative overflow-y-auto font-th-body scroll-smooth">
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed -top-[20%] -right-[10%] w-[550px] h-[550px] rounded-full bg-[#ffefef]/70 blur-[130px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed top-[35%] -left-[10%] w-[450px] h-[450px] rounded-full bg-[#f2f2f7]/80 blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-[20%] w-[400px] h-[400px] rounded-full bg-[#ffdadb]/40 blur-[140px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-4 left-4 right-4 rounded-full glass-surface shadow-xs flex justify-between items-center px-6 py-2.5 z-50 mx-auto max-w-4xl border border-white/60">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/tirak_logo.png"
            alt="TIRAK CHAT"
            className="w-7 h-7 object-contain drop-shadow-xs hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-th-heading text-[19px] text-[#7e5356] font-extrabold tracking-tight">
            TIRAK CHAT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#7e5356] glass-surface border border-white/40 shadow-xs cursor-pointer glass-button-secondary"
            onClick={onOpenLanguageModal}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">
              {activeLanguage === "th" ? "TH" : "EN"}
            </span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-5xl mx-auto w-full pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 min-h-[calc(100vh-100px)]">
        {/* Left Content Column */}
        <div className="flex flex-col items-start gap-5 text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/20 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#7e5356]" />
            <span className="font-th-heading text-[11px] font-bold text-[#7e5356] uppercase tracking-wider">
              {getTranslation(activeLanguage, "militaryGradeProtection")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-[1.15] tracking-tight"
          >
            {activeLanguage === "th" ? (
              <>
                ความปลอดภัยที่ <span className="text-gradient-pink">นิยาม</span>{" "}
                ตัวตนดิจิทัลของคุณ
              </>
            ) : (
              <>
                Shield that <span className="text-gradient-pink">defines</span>{" "}
                your digital existence.
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-th-body text-sm sm:text-base text-[#45474a] max-w-xl leading-relaxed"
          >
            {activeLanguage === "th"
              ? "TIRAK CHAT สร้างเกราะป้องกันรอบการสื่อสารที่สำคัญของคุณ เราไม่เพียงเข้ารหัสข้อมูล แต่เราปกป้องความเป็นส่วนตัวของคุณจากโลกภายนอก"
              : "TIRAK CHAT creates an impenetrable layer around your most sensitive communications. We don't just encrypt; we disappear your footprint from the global grid."}
          </motion.p>

          {/* Action Buttons Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-3 w-full max-w-md pt-2"
          >
            <button
              onClick={() => onNavigate("register")}
              className="glass-button-primary w-full py-4 rounded-full font-th-heading font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
              data-haptic="heavy"
            >
              <span>เริ่มต้นใช้งาน / เข้าสู่ระบบ</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              <button
                onClick={() => onNavigate("register")}
                className="glass-button-secondary px-4 py-3 rounded-full font-th-heading font-bold text-xs flex items-center justify-center gap-2 border border-white/80 shadow-2xs cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#7e5356]" />
                <span>เบอร์โทรศัพท์</span>
              </button>

              <button
                onClick={onGoogleSignIn}
                className="glass-button-secondary px-4 py-3 rounded-full font-th-heading font-bold text-xs flex items-center justify-center gap-2 border border-white/80 shadow-2xs cursor-pointer"
              >
                <img
                  className="w-4 h-4 object-contain"
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                  alt="Google"
                />
                <span>Google</span>
              </button>
            </div>

            <button
              onClick={scrollToPrivacy}
              className="mt-1 glass-button-secondary text-[#7e5356] px-6 py-2.5 rounded-full font-th-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:bg-[#ffefef]/50"
            >
              <span>เรียนรู้เพิ่มเติมเกี่ยวกับความปลอดภัย</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>

          {/* Trust Highlights Row */}
          <div className="pt-2 flex flex-wrap gap-5 text-xs text-[#5d5e63]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "zeroKnowledge")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <EyeOff className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "noMetaData")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-[#7e5356]" />
              <span className="font-th-heading font-semibold">
                {getTranslation(activeLanguage, "seamlessSync")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Animation Column (3D Rose Gold Emblem Showcase) */}
        <div className="relative flex justify-center items-center py-6 w-full min-h-[420px] lg:min-h-[480px]">
          {/* Animated Concentric Signal Waves / Encryption Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#7e5356]/25 bg-gradient-to-r from-[#7e5356]/10 via-transparent to-transparent shadow-lg"
            />
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full border border-[#7e5356]/35"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.55, 0.25],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border-2 border-dashed border-[#7e5356]/40"
            />
          </div>

          {/* Central 3D Pure Artwork Logo */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex flex-col items-center justify-center p-4 drop-shadow-2xl cursor-pointer"
          >
            <img
              src="/tirak_logo.png"
              alt="TIRAK CHAT"
              className="w-[240px] sm:w-[300px] h-auto object-contain filter drop-shadow-[0_25px_40px_rgba(126,83,86,0.3)] transition-transform hover:scale-108 duration-300"
            />
          </motion.div>

          {/* Floating Glassmorphic Badges */}
          {/* Top Right Badge: แชทส่วนตัว เข้ารหัส E2EE */}
          <motion.div
            animate={{
              y: [-7, 7, -7],
              x: [4, -4, 4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute top-2 sm:top-6 right-2 sm:right-6 z-20 glass-surface backdrop-blur-2xl border border-white/80 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-3 bg-white/75 hover:bg-white transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356] shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#1b1b1d] font-th-heading">
                แชทส่วนตัว
              </p>
              <p className="text-[10px] text-[#7e5356] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> เข้ารหัส E2EE
              </p>
            </div>
          </motion.div>

          {/* Bottom Left Badge: คลังปลอดภัย พื้นที่จัดเก็บเข้ารหัส */}
          <motion.div
            animate={{
              y: [7, -7, 7],
              x: [-4, 4, -4],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 z-20 glass-surface backdrop-blur-2xl border border-white/80 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-3 bg-white/75 hover:bg-white transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356] shadow-xs">
              <FolderLock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#1b1b1d] font-th-heading">
                คลังปลอดภัย
              </p>
              <p className="text-[10px] text-[#5d5e63] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#7e5356]" /> พื้นที่จัดเก็บเข้ารหัส
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* PRIVACY & SECURITY FULL-VIEWPORT (100vh) COLLECTION SECTIONS STACK */}
      <section
        ref={privacySectionRef}
        id="privacy-showcase"
        className="w-full space-y-0 z-10"
      >
        {/* Infinite Auto-Scrolling Feature Ticker Marquee (No White Background Box / No Numbers) */}
        <div className="w-full overflow-hidden py-4 my-6 relative select-none">
          {/* Gradient Blur Edges for Seamless Vignette Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fcf8fb] via-[#fcf8fb]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fcf8fb] via-[#fcf8fb]/80 to-transparent z-20" />

          <motion.div
            className="flex items-center gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
          >
            {/* Array of all Features duplicated for continuous 100% seamless infinite loop */}
            {[
              { id: "sec-1", label: "การเข้ารหัส E2EE", icon: ShieldCheck },
              { id: "sec-2", label: "สถาปัตยกรรมไร้รอยบันทึก", icon: EyeOff },
              { id: "sec-3", label: "ตู้นิรภัยชีวภาพ", icon: Fingerprint },
              { id: "sec-4", label: "ข้อความลบเลือนตามเวลา", icon: Clock },
              { id: "sec-1", label: "การโทรและวิดีโอเข้ารหัส", icon: Smartphone },
              { id: "sec-2", label: "ลบประวัติและ Metadata 100%", icon: Shield },
              { id: "sec-4", label: "ป้องกันการแคปหน้าจอ", icon: FolderLock },
              { id: "sec-1", label: "กุญแจเข้ารหัสส่วนตัว", icon: Key },
              { id: "sec-3", label: "สแกน QR Code ส่วนตัว", icon: Sparkles },
              { id: "sec-3", label: "คลังจัดเก็บข้อมูลนิรภัย", icon: Lock },
              { id: "sec-5", label: "สถิติความปลอดภัย 99.99%", icon: Zap },
              // Duplicate for seamless 100% infinite loop
              { id: "sec-1", label: "การเข้ารหัส E2EE", icon: ShieldCheck },
              { id: "sec-2", label: "สถาปัตยกรรมไร้รอยบันทึก", icon: EyeOff },
              { id: "sec-3", label: "ตู้นิรภัยชีวภาพ", icon: Fingerprint },
              { id: "sec-4", label: "ข้อความลบเลือนตามเวลา", icon: Clock },
              { id: "sec-1", label: "การโทรและวิดีโอเข้ารหัส", icon: Smartphone },
              { id: "sec-2", label: "ลบประวัติและ Metadata 100%", icon: Shield },
              { id: "sec-4", label: "ป้องกันการแคปหน้าจอ", icon: FolderLock },
              { id: "sec-1", label: "กุญแจเข้ารหัสส่วนตัว", icon: Key },
              { id: "sec-3", label: "สแกน QR Code ส่วนตัว", icon: Sparkles },
              { id: "sec-3", label: "คลังจัดเก็บข้อมูลนิรภัย", icon: Lock },
              { id: "sec-5", label: "สถิติความปลอดภัย 99.99%", icon: Zap },
            ].map((nav, idx) => {
              const IconComp = nav.icon;
              return (
                <button
                  key={`${nav.id}-${idx}`}
                  onClick={() => {
                    const el = document.getElementById(nav.id);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-extrabold font-th-heading text-[#1b1b1d] bg-white/40 backdrop-blur-2xl border border-white/80 shadow-md hover:bg-white/65 hover:border-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356] border border-[#7e5356]/20 shrink-0 group-hover:scale-110 transition-transform">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* COLLECTION SECTION 01: End-to-End Encryption (Full Viewport 100vh) */}
        <div
          id="sec-1"
          className="min-h-screen w-full flex items-center justify-center py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#ffefef]/20 to-transparent border-b border-[#c6c6ca]/20"
        >
          {/* Animated Background Motion Mesh */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.4, 0.15],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#7e5356]/15 blur-[120px]"
            />
          </div>

          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/25 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#7e5356]" />
                <span className="font-th-heading text-xs font-extrabold text-[#7e5356] uppercase tracking-wider">
                  COLLECTION 01 • END-TO-END ENCRYPTION
                </span>
              </div>

              <h2 className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-tight">
                การเข้ารหัสต้นทางถึงปลายทาง <br />
                <span className="text-gradient-pink">ด้วย Signal Protocol</span>
              </h2>

              <p className="font-th-body text-base text-[#45474a] leading-relaxed">
                ทุกข้อความ เสียงโทร และวิดีโอคอลของคุณถูกล็อกด้วยกุญแจเข้ารหัสเฉพาะตัวแบบสุ่ม (Double Ratchet Algorithm) ที่ถูกสร้างขึ้นบนอุปกรณ์ของคุณเท่านั้น แม้แต่เซิร์ฟเวอร์ผู้ให้บริการก็ไม่สามารถถอดรหัสอ่านข้อความได้
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>การแลกเปลี่ยนกุญแจแบบ Elliptic Curve (ECDH P-256)</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>การบีบอัดและเข้ารหัสข้อมูลด้วย AES-256-GCM สตรีมมิ่ง</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>เปลี่ยนกุญแจเข้ารหัสใหม่ในทุกๆ ข้อความ (Perfect Forward Secrecy)</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("register")}
                  className="glass-button-primary px-8 py-4 rounded-full font-th-heading font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>ลองสัมผัสระบบแชทเข้ารหัส E2EE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-surface border border-white/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-white/80 backdrop-blur-2xl space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-th-heading text-sm font-bold text-[#1b1b1d]">
                      ระบบสตรีมมิ่งเซสชันเข้ารหัสเรียลไทม์
                    </span>
                  </div>
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#ffefef] text-[#7e5356] border border-[#7e5356]/20">
                    E2EE Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/90 border border-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Key className="w-6 h-6 text-[#7e5356]" />
                      <div>
                        <p className="text-xs font-bold text-[#1b1b1d]">Double Ratchet Key Hash</p>
                        <p className="text-[11px] text-[#687280] font-mono">e3b0c44298fc1c149afbf4c8996fb924</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-emerald-600 animate-pulse" />
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-white shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-[#7e5356]" />
                      <div>
                        <p className="text-xs font-bold text-[#1b1b1d]">Voice & Video Encryption</p>
                        <p className="text-[11px] text-[#687280]">LiveKit WebRTC SRTP-AES128</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 animate-spin" />
                      สตรีมปลอดภัย
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* COLLECTION SECTION 02: Zero Knowledge Architecture (Full Viewport 100vh) */}
        <div
          id="sec-2"
          className="min-h-screen w-full flex items-center justify-center py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#f2f2f7]/40 to-transparent border-b border-[#c6c6ca]/20"
        >
          {/* Animated Background Motion Mesh */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, -60, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#f2f2f7]/80 blur-[130px]"
            />
          </div>

          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-surface border border-white/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-white/80 backdrop-blur-2xl space-y-6"
              >
                <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-6 h-6 text-emerald-700" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">Metadata Stripping Engine</p>
                      <p className="text-xs text-emerald-700">ลบข้อมูลระบุตัวตนและตำแหน่ง IP ทันที 100%</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300">
                    100% Clean
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white/90 border border-white shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-[#7e5356]" />
                    <div>
                      <p className="text-sm font-bold text-[#1b1b1d]">Server Processing Memory</p>
                      <p className="text-xs text-[#687280]">RAM-Only Ephemeral Buffer</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#7e5356]">ไร้การบันทึกฮาร์ดดิสก์</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/25 shadow-xs">
                <EyeOff className="w-4 h-4 text-[#7e5356]" />
                <span className="font-th-heading text-xs font-extrabold text-[#7e5356] uppercase tracking-wider">
                  COLLECTION 02 • ZERO KNOWLEDGE ARCHITECTURE
                </span>
              </div>

              <h2 className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-tight">
                สถาปัตยกรรมไร้รอยบันทึก <br />
                <span className="text-gradient-pink">ไร้ร่องรอยดิจิทัล</span>
              </h2>

              <p className="font-th-body text-base text-[#45474a] leading-relaxed">
                เราตัดขบวนการจัดเก็บ Metadata ทั้งหมด ข้อมูลการสื่อสารของคุณจะถูกส่งผ่านความทรงจำ RAM แบบชั่วคราวและถูกลบทันทีที่ผู้รับได้รับข้อความ โดยไม่มีการบันทึกลงดิสก์
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>ไม่เคยมีการบันทึกประวัติการแชทหรือไฟล์บนเซิร์ฟเวอร์</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>ซ่อนและลบ IP Address ของคู่สนทนาแบบอัตโนมัติ</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("register")}
                  className="glass-button-primary px-8 py-4 rounded-full font-th-heading font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>เริ่มต้นแชทแบบไร้ร่องรอย</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLLECTION SECTION 03: Biometric Vault & Secure Enclave (Full Viewport 100vh) */}
        <div
          id="sec-3"
          className="min-h-screen w-full flex items-center justify-center py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#ffefef]/30 to-transparent border-b border-[#c6c6ca]/20"
        >
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/25 shadow-xs">
                <Fingerprint className="w-4 h-4 text-[#7e5356]" />
                <span className="font-th-heading text-xs font-extrabold text-[#7e5356] uppercase tracking-wider">
                  COLLECTION 03 • BIOMETRIC VAULT
                </span>
              </div>

              <h2 className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-tight">
                ตู้นิรภัยชีวภาพ <br />
                <span className="text-gradient-pink">และฮาร์ดแวร์ยืนยันตัวตน</span>
              </h2>

              <p className="font-th-body text-base text-[#45474a] leading-relaxed">
                ป้องกันการเข้าถึงแชทและคลังรูปภาพลับด้วยการสแกนลายนิ้วมือ (Fingerprint) หรือใบหน้า (Face ID) ร่วมกับฮาร์ดแวร์กุญแจนิรภัยในตัวเครื่อง เพื่อความเป็นส่วนตัวสูงสุด
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>รองรับการสแกนลายนิ้วมือ Fingerprint & Touch ID</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>รองรับการยืนยันตัวตนด้วยใบหน้า Face ID</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>ฮาร์ดแวร์ปกป้องกุญแจด้วย Apple / Android Secure Enclave</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("register")}
                  className="glass-button-primary px-8 py-4 rounded-full font-th-heading font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>ตั้งค่าตู้นิรภัยชีวภาพของคุณ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-surface border border-white/90 rounded-3xl p-8 shadow-2xl flex flex-col justify-between space-y-6 bg-white/75 backdrop-blur-2xl relative overflow-hidden"
              >
                {/* Animated Laser Scanning Line */}
                <motion.div
                  animate={{ y: [0, 220, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7e5356] to-transparent shadow-[0_0_15px_#7e5356] pointer-events-none z-10"
                />

                <div className="space-y-4 text-left relative z-20">
                  <div className="w-16 h-16 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] shadow-xs border border-[#7e5356]/20">
                    <Fingerprint className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="font-th-heading text-2xl font-bold text-[#1b1b1d]">
                    Secure Hardware Enclave Lock
                  </h4>
                  <p className="font-th-body text-sm text-[#45474a] leading-relaxed">
                    ระบบป้องกันระดับฮาร์ดแวร์จะเข้ารหัสข้อมูลของคุณและปลดล็อกเฉพาะเมื่อสแกนลายนิ้วมือหรือใบหน้าถูกต้องเท่านั้น
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#5d5e63] font-semibold relative z-20">
                  <span>Hardware Shield Status:</span>
                  <span className="text-[#7e5356] font-bold flex items-center gap-1.5 text-sm">
                    <Shield className="w-4 h-4" /> Secure Enclave Active
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* COLLECTION SECTION 04: Auto-Erasure Messages & Self-Destruct Media (Full Viewport 100vh) */}
        <div
          id="sec-4"
          className="min-h-screen w-full flex items-center justify-center py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#f2f2f7]/40 to-transparent border-b border-[#c6c6ca]/20"
        >
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-surface border border-white/90 rounded-3xl p-8 shadow-2xl flex flex-col justify-between space-y-6 bg-white/75 backdrop-blur-2xl relative overflow-hidden"
              >
                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-[#ffefef] flex items-center justify-center text-[#7e5356] shadow-xs border border-[#7e5356]/20">
                      <Clock className="w-8 h-8" />
                    </div>
                    {/* Live Animated Countdown Badge */}
                    <div className="px-4 py-2 rounded-full bg-[#ffefef] text-[#7e5356] font-mono text-xs font-bold border border-[#7e5356]/30 flex items-center gap-2 shadow-2xs">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#7e5356]" />
                      <span>ทำลายตัวเองใน {timerCount}s</span>
                    </div>
                  </div>
                  <h4 className="font-th-heading text-2xl font-bold text-[#1b1b1d]">
                    Auto-Expiring Messages Engine
                  </h4>
                  <p className="font-th-body text-sm text-[#45474a] leading-relaxed">
                    ตั้งเวลานับถอยหลังลบข้อความ ภาพถ่าย และวิดีโอแบบทำลายตัวเองโดยอัตโนมัติทันทีที่อ่านจบ ป้องกันการแคปหน้าจอและการกู้คืนข้อมูลทุกรูปแบบ
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#5d5e63] font-semibold">
                  <span>Timer Presets:</span>
                  <span className="text-[#7e5356] font-bold text-sm">5s • 1m • 1h • 24h • Custom</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface border border-[#7e5356]/25 shadow-xs">
                <Clock className="w-4 h-4 text-[#7e5356]" />
                <span className="font-th-heading text-xs font-extrabold text-[#7e5356] uppercase tracking-wider">
                  COLLECTION 04 • AUTO-ERASURE MESSAGES
                </span>
              </div>

              <h2 className="font-th-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1b1d] leading-tight">
                ข้อความและไฟล์สื่อ <br />
                <span className="text-gradient-pink">ลบเลือนตามกำหนดเวลา</span>
              </h2>

              <p className="font-th-body text-base text-[#45474a] leading-relaxed">
                กำหนดระยะเวลาหมดอายุของบทสนทนาและไฟล์สื่อ ข้อมูลจะถูกทำลายตัวเองออกจากอุปกรณ์ทั้งสองฝ่ายแบบถาวรโดยไม่ทิ้งร่องรอย
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>ลบข้อความ ภาพถ่าย และวิดีโออัตโนมัติเมื่ออ่านจบ</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#1b1b1d]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>ป้องกันการบันทึกภาพหน้าจอ (Anti-Screenshot Protection)</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("register")}
                  className="glass-button-primary px-8 py-4 rounded-full font-th-heading font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>ลองตั้งเวลาลบข้อความอัตโนมัติ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLLECTION SECTION 05: Live System Metrics & Grand Launch CTA (Full Viewport 100vh) */}
        <div
          id="sec-5"
          className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#ffefef]/30 to-transparent"
        >
          <div className="max-w-5xl mx-auto w-full space-y-12 relative z-10 text-center">
            {/* Stats Dashboard Box */}
            <div className="glass-surface border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl bg-white/80 backdrop-blur-2xl space-y-10">
              <div className="space-y-3 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffefef] text-[#7e5356] text-xs font-bold border border-[#7e5356]/20">
                  <Zap className="w-4 h-4 text-[#7e5356]" />
                  <span>LIVE SYSTEM METRICS & TRUST</span>
                </div>
                <h2 className="font-th-heading text-3xl md:text-4xl font-extrabold text-[#1b1b1d]">
                  สถิติความน่าเชื่อถือและตัวเลขระบบ
                </h2>
                <p className="font-th-body text-sm text-[#626267]">
                  การประมวลผลและการรักษาความปลอดภัยระดับสากลที่ได้รับการตรวจสอบอย่างต่อเนื่อง
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Counter 1: 256-bit */}
                <div className="p-6 rounded-2xl glass-surface border border-white/80 shadow-xs bg-white/60">
                  <p className="font-th-heading text-4xl md:text-5xl font-extrabold text-[#7e5356]">
                    <AnimatedCounter to={256} suffix="-bit" />
                  </p>
                  <p className="text-sm font-bold text-[#1b1b1d] mt-2">AES Encryption</p>
                  <p className="text-xs text-[#687280] mt-0.5">มาตรฐานกองทัพสหรัฐฯ</p>
                </div>

                {/* Counter 2: 100% */}
                <div className="p-6 rounded-2xl glass-surface border border-white/80 shadow-xs bg-white/60">
                  <p className="font-th-heading text-4xl md:text-5xl font-extrabold text-[#7e5356]">
                    <AnimatedCounter to={100} suffix="%" />
                  </p>
                  <p className="text-sm font-bold text-[#1b1b1d] mt-2">Zero Knowledge</p>
                  <p className="text-xs text-[#687280] mt-0.5">ไม่มีใครอ่านข้อความได้</p>
                </div>

                {/* Counter 3: 0 Data Leaks */}
                <div className="p-6 rounded-2xl glass-surface border border-white/80 shadow-xs bg-white/60">
                  <p className="font-th-heading text-4xl md:text-5xl font-extrabold text-[#7e5356]">
                    <AnimatedCounter to={0} />
                  </p>
                  <p className="text-sm font-bold text-[#1b1b1d] mt-2">Data Leaks</p>
                  <p className="text-xs text-[#687280] mt-0.5">ประวัติรั่วไหลเป็นศูนย์</p>
                </div>

                {/* Counter 4: 99.99% Uptime */}
                <div className="p-6 rounded-2xl glass-surface border border-white/80 shadow-xs bg-white/60">
                  <p className="font-th-heading text-4xl md:text-5xl font-extrabold text-[#7e5356]">
                    <AnimatedCounter to={99.99} decimals={2} suffix="%" />
                  </p>
                  <p className="text-sm font-bold text-[#1b1b1d] mt-2">Uptime Availability</p>
                  <p className="text-xs text-[#687280] mt-0.5">ระบบเสถียรเรียลไทม์</p>
                </div>
              </div>
            </div>

            {/* Grand Launch Closing Card */}
            <div className="glass-surface border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden bg-gradient-to-br from-white/95 via-[#ffefef]/40 to-white/95 space-y-6">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                className="w-20 h-20 mx-auto rounded-3xl glass-surface border border-white p-3 shadow-md flex items-center justify-center cursor-pointer"
              >
                <img src="/tirak_logo.png" alt="TIRAK CHAT" className="w-full h-full object-contain filter drop-shadow-xs" />
              </motion.div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="font-th-heading text-2xl md:text-3xl font-extrabold text-[#1b1b1d]">
                  สัมผัสประสบการณ์การสื่อสารที่ปลอดภัยที่สุดวันนี้
                </h3>
                <p className="font-th-body text-sm text-[#45474a]">
                  เริ่มต้นใช้งาน Tirak Chat ได้ทันทีโดยไม่ต้องเปิดเผยข้อมูลส่วนตัว
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("register")}
                  className="glass-button-primary px-10 py-4.5 rounded-full font-th-heading font-bold text-base flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
                >
                  <span>เริ่มต้นใช้งาน Tirak Chat</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-6 border-t border-[#c6c6ca]/20 text-xs text-[#626267] z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-75">
            <span className="font-th-heading font-extrabold text-[#1b1b1d]">
              TIRAK CHAT
            </span>
            <span>© 2026 ระบบความเป็นส่วนตัว TIRAK CHAT</span>
          </div>

          <div className="flex gap-8 text-center">
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                256-bit
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                การเข้ารหัส AES
              </p>
            </div>
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                100%
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                ตรวจสอบได้โปร่งใส
              </p>
            </div>
            <div>
              <p className="font-th-heading text-lg font-bold text-[#7e5356]">
                0
              </p>
              <p className="text-[10px] uppercase font-semibold text-[#626267]">
                ประวัติข้อมูลรั่วไหล
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
