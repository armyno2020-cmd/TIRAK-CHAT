// @ts-nocheck
import React, { useState } from "react";
import {
  ArrowLeft,
  Network,
  Phone,
  MessageSquare,
  UploadCloud,
  Server,
  ShieldCheck,
  Database,
  Cpu,
  Globe,
  ArrowRight,
  Radio,
  CheckCircle2,
  Lock,
  RefreshCw,
  Layers,
} from "lucide-react";
import { Language, ScreenId } from "../types";
import { getTranslation } from "../locales/i18n";

interface ArchitectureDiagramsScreenProps {
  activeLanguage: Language;
  onNavigate: (screen: ScreenId) => void;
}

type TabKey = "overall" | "call" | "message" | "upload";

export const ArchitectureDiagramsScreen: React.FC<
  ArchitectureDiagramsScreenProps
> = ({ activeLanguage, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("overall");
  const [activeStep, setActiveStep] = useState<number>(0);

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: "overall", label: "สถาปัตยกรรมรวม", icon: Network },
    { key: "call", label: "การโทร (Call Flow)", icon: Phone },
    { key: "message", label: "ข้อความ (Message Flow)", icon: MessageSquare },
    { key: "upload", label: "ไฟล์ (Upload Flow)", icon: UploadCloud },
  ];

  return (
    <div className="min-h-screen bg-transparent liquid-bg p-4 max-w-2xl mx-auto space-y-4 pb-16">
      {/* Top Header */}
      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={() => onNavigate("settings_help")}
          className="glass-button-secondary p-2.5 rounded-full glass-surface glass-button-secondary text-[#1b1b1d] transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-th-heading text-xl font-extrabold text-[#1b1b1d]">
            แผนผังและสถาปัตยกรรมระบบ
          </h2>
          <p className="text-xs text-[#7e5356] font-bold font-th-body">
            System Architecture & Flow Specifications
          </p>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="glass-surface p-1.5 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setActiveStep(0);
              }}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-th-heading text-xs font-bold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap ${
                isActive
                  ? "glass-button-primary shadow-md shadow-[#7e5356]/20"
                  : "text-[#45474a] glass-button-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: สถาปัตยกรรมรวม (Overall Architecture) */}
      {activeTab === "overall" && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-surface p-4 rounded-3xl border border-white/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-th-heading text-[#7e5356] bg-[#ffefef] px-3 py-1 rounded-full border border-[#7e5356]/20">
                Overall Topology
              </span>
              <span className="text-[11px] font-mono text-[#5d5e63]">
                Client → Nginx → Services → Cloud
              </span>
            </div>
            <h3 className="font-th-heading text-base font-bold text-[#1b1b1d]">
              แผนผังสถาปัตยกรรมระดับระบบ (System Architecture Map)
            </h3>
            <p className="font-th-body text-xs text-[#45474a] leading-relaxed">
              โครงสร้างระบบ NEWFOUND ที่เชื่อมโยงผ่าน Nginx Reverse Proxy (Port
              3000 / HTTPS 443) กระจายทราฟฟิกไปยัง Frontend, Node.js API, Jitsi
              Video Bridge และบริการก้อง Cloud (Firebase & coturn TURN server)
            </p>
          </div>

          {/* Architecture Node Tree Diagram */}
          <div className="glass-surface p-5 rounded-3xl border border-white/80 space-y-4 shadow-sm bg-gradient-to-b from-white/90 to-white/40">
            {/* Layer 1: Client */}
            <div className="p-3.5 rounded-2xl glass-surface border border-[#c6c6ca] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#5d5e63] text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                    Client Applications
                  </h4>
                  <p className="text-[10px] text-[#45474a] font-mono">
                    React Native Web / iOS / Android Apps
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Port 3000 / WSS
              </span>
            </div>

            <div className="flex justify-center my-1">
              <ArrowRight className="w-5 h-5 text-[#7e5356] rotate-90" />
            </div>

            {/* Layer 2: Nginx Gateway */}
            <div className="p-3.5 rounded-2xl bg-[#ffefef] border border-[#7e5356]/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl glass-button-primary">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                    Nginx Reverse Proxy
                  </h4>
                  <p className="text-[10px] text-[#45474a] font-mono">
                    SSL Termination, Load Balancer & Rate Limiting
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold glass-button-primary px-2 py-0.5 rounded-full">
                HTTPS / 443
              </span>
            </div>

            <div className="flex justify-center my-1">
              <ArrowRight className="w-5 h-5 text-[#7e5356] rotate-90" />
            </div>

            {/* Layer 3: Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] space-y-1">
                <div className="flex items-center space-x-1.5 text-[#5d5e63]">
                  <Layers className="w-4 h-4" />
                  <span className="font-th-heading text-xs font-bold">
                    Frontend Service
                  </span>
                </div>
                <p className="text-[10px] text-[#45474a]">
                  Next.js / React / TypeScript
                </p>
              </div>

              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] space-y-1">
                <div className="flex items-center space-x-1.5 text-[#7e5356]">
                  <Cpu className="w-4 h-4" />
                  <span className="font-th-heading text-xs font-bold">
                    Backend Express
                  </span>
                </div>
                <p className="text-[10px] text-[#45474a]">
                  API Gateway, E2EE Keys Relay & Auth Tokens
                </p>
              </div>

              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] space-y-1">
                <div className="flex items-center space-x-1.5 text-blue-600">
                  <Radio className="w-4 h-4" />
                  <span className="font-th-heading text-xs font-bold">
                    Jitsi Meet Server
                  </span>
                </div>
                <p className="text-[10px] text-[#45474a]">
                  SFU Video Bridge for Multi-party Calls
                </p>
              </div>
            </div>

            <div className="flex justify-center my-1">
              <ArrowRight className="w-5 h-5 text-[#7e5356] rotate-90" />
            </div>

            {/* Layer 4: Storage & TURN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Database className="w-5 h-5 text-amber-600" />
                  <div>
                    <h5 className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                      Firebase Cloud
                    </h5>
                    <p className="text-[10px] text-[#45474a]">
                      Firestore DB, Auth & Cloud Storage
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  Encrypted
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Radio className="w-5 h-5 text-[#7e5356]" />
                  <div>
                    <h5 className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                      coturn Server
                    </h5>
                    <p className="text-[10px] text-[#45474a]">
                      STUN/TURN NAT Traversal Relay
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full">
                  Port 3478
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: การโทร (Call Flow Sequence) */}
      {activeTab === "call" && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-surface p-4 rounded-3xl border border-white/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-th-heading text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                WebRTC Call Sequence
              </span>
              <span className="text-[11px] font-mono text-[#5d5e63]">
                P2P + TURN Fallback
              </span>
            </div>
            <h3 className="font-th-heading text-base font-bold text-[#1b1b1d]">
              การทำงานของระบบโทร (Voice/Video Call Sequence Flow)
            </h3>
            <p className="font-th-body text-xs text-[#45474a]">
              ลำดับการทำงานตั้งแต่กดปุ่มโทร ออกโทเค็นห้อง Jitsi
              สร้างการเชื่อมต่อ WebRTC P2P Direct และสลับไปยัง coturn TURN
              server อัตโนมัติเมื่ออยู่หลัง NAT/Firewall
            </p>
          </div>

          {/* Sequence Steps */}
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "ผู้ใช้ A กดปุ่มโทรออก (Call Click)",
                actor: "Client A → Backend",
                desc: "Client A ส่งคำร้องสร้างสายโทรไปยัง Node.js Backend พร้อมสเปก E2EE Encryption Key",
                tech: "HTTPS POST /api/calls/create",
              },
              {
                step: 2,
                title:
                  "สร้างห้อง Jitsi & สัญญาณสายเข้า (Jitsi Room & Signaling)",
                actor: "Backend → Firebase / Jitsi Server",
                desc: "Backend จองห้องประชุมใน Jitsi Video Bridge และสร้างเอกสาร callSession ใน Firestore เพื่อแจ้งเตือน Client B",
                tech: "Firestore Realtime Listener",
              },
              {
                step: 3,
                title: "ผู้ใช้ B ตอบรับสาย & แลกเปลี่ยน ICE Candidates",
                actor: "Client B ↔ Client A",
                desc: "Client B กดรับสาย ทั้งสองฝั่งทำการแลกเปลี่ยน Session FileText Protocol (SDP) และ ICE Candidates",
                tech: "WebRTC PeerConnection",
              },
              {
                step: 4,
                title: "เชื่อมต่อตรง P2P หรือใช้ TURN Fallback (coturn)",
                actor: "WebRTC Engine → coturn",
                desc: "หากการเชื่อมต่อ P2P โดยตรงล้มเหลวเนื่องจาก Symmetric NAT / Firewall ระบบจะสลับไปส่งสตรีมวิดีโอผ่าน coturn Relay Server (UDP/TCP 3478) ทันที",
                tech: "STUN / TURN Traversal",
              },
            ].map((s) => (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === s.step
                    ? "glass-surface border-[#7e5356] shadow-md ring-2 ring-[#7e5356]/20"
                    : "glass-surface border-white/80 glass-button-secondary"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      activeStep === s.step
                        ? "glass-button-primary"
                        : "bg-[#e0dfe4] text-[#45474a]"
                    }`}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                        {s.title}
                      </h4>
                      <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {s.tech}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#7e5356] font-bold">
                      {s.actor}
                    </p>
                    <p className="font-th-body text-xs text-[#45474a] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ข้อความ (Message Flow) */}
      {activeTab === "message" && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-surface p-4 rounded-3xl border border-white/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-th-heading text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                E2EE Message Protocol
              </span>
              <span className="text-[11px] font-mono text-[#5d5e63]">
                Signal Protocol + Realtime
              </span>
            </div>
            <h3 className="font-th-heading text-base font-bold text-[#1b1b1d]">
              การส่งข้อความและสถานะเรียลไทม์ (Message & Presence Flow)
            </h3>
            <p className="font-th-body text-xs text-[#45474a]">
              กระบวนการเข้ารหัสข้อความต้นทาง (E2EE Signal Protocol) ก่อนส่งผ่าน
              HTTPS และ Broadcast ไปยัง Socket.io / Firestore Realtime Listener
              พร้อม Typing Indicator และ Read Receipts
            </p>
          </div>

          <div className="glass-surface p-4 rounded-3xl border border-white/80 space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
              <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <h4 className="font-th-heading text-xs font-bold text-emerald-900">
                  Signal Protocol Client Encryption
                </h4>
                <p className="text-[10px] text-emerald-800">
                  ข้อความถูกเข้ารหัสด้วย AES-256-GCM + Double Ratchet
                  บนเครื่องผู้ส่งก่อนออกจากเครื่องเสมอ
                </p>
              </div>
            </div>

            {/* Message Sequence Timeline */}
            <div className="space-y-2.5 pt-2">
              {[
                {
                  label: "1. Send Message",
                  desc: "ผู้ส่งกดส่ง → Client เข้ารหัสข้อความ → ยิง HTTPS POST ไปยัง Express Server / Firestore subcollection messages",
                },
                {
                  label: "2. Socket / Firestore Broadcast",
                  desc: "เซิร์ฟเวอร์กระจายสัญญาณ Push Notification และ Realtime Broadcast ไปยังผู้รับในห้องแชทเดียวกัน",
                },
                {
                  label: "3. Typing & Presence Updates",
                  desc: 'สถานะ "กำลังพิมพ์..." และสถานะออนไลน์ (isOnline) ถูกอัปเดตแบบ Realtime ผ่าน Realtime DB',
                },
                {
                  label: "4. Decrypt & Read Receipt",
                  desc: "เครื่องผู้รับถอดรหัสข้อความแล้วแสดงผลใน UI พร้อมส่ง Read Receipt กลับไปยังผู้ส่ง",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] space-y-1"
                >
                  <h5 className="font-th-heading text-xs font-bold text-[#7e5356]">
                    {item.label}
                  </h5>
                  <p className="font-th-body text-xs text-[#45474a] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ไฟล์ (Upload Flow) */}
      {activeTab === "upload" && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-surface p-4 rounded-3xl border border-white/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-th-heading text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Encrypted File Storage
              </span>
              <span className="text-[11px] font-mono text-[#5d5e63]">
                Backend → Firebase Storage
              </span>
            </div>
            <h3 className="font-th-heading text-base font-bold text-[#1b1b1d]">
              กระบวนการอัปโหลดไฟล์และสื่อ (File Upload Flow)
            </h3>
            <p className="font-th-body text-xs text-[#45474a]">
              สถาปัตยกรรมการอัปโหลดรูปภาพ วิดีโอ โน้ตเสียง และไฟล์แนบผ่าน
              Backend Proxy ไปยัง Firebase Storage และส่งคืน Public Encrypted
              URL
            </p>
          </div>

          <div className="glass-surface p-5 rounded-3xl border border-white/80 space-y-4">
            {/* Diagram Step Chart */}
            <div className="flex flex-col space-y-3">
              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] flex items-center justify-between">
                <span className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                  1. Choose & Encrypt File
                </span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  Client Side
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-[#7e5356] rotate-90" />
              </div>

              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] flex items-center justify-between">
                <span className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                  2. Upload Payload via Express Backend
                </span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  HTTPS multipart/form-data
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-[#7e5356] rotate-90" />
              </div>

              <div className="p-3 rounded-2xl glass-surface border border-[#c6c6ca] flex items-center justify-between">
                <span className="font-th-heading text-xs font-bold text-[#1b1b1d]">
                  3. Firebase Storage Storage Reference
                </span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  chat_media/{"{chatId}"}
                </span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-[#7e5356] rotate-90" />
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <span className="font-th-heading text-xs font-bold text-emerald-900">
                  4. Return Signed / Public URL to Chat
                </span>
                <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                  Secure Media Link
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#ffefef] border border-[#7e5356]/30 text-[11px] font-th-body text-[#45474a] space-y-1">
              <p className="font-bold text-[#7e5356]">
                หมายเหตุความปลอดภัยในการจัดเก็บสื่อ:
              </p>
              <p>
                สื่อทุกประเภทจะถูกสแกนประเภทไฟล์ (MIME Type)
                และตรวจสอบขนาดไฟล์ตามนโยบายระบบ (รูปภาพ/วิดีโอ ≤ 100MB, เสียง ≤
                25MB) พร้อมทั้งเก็บข้อมูลการเข้าถึงเฉพาะสมาชิกในห้องแชทด้วย
                Firestore Shield Rules
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      <div className="pt-2">
        <button
          onClick={() => onNavigate("settings_help")}
          className="glass-button-secondary w-full py-3.5 rounded-2xl glass-button-primary font-th-heading font-bold text-sm shadow-md  active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>เข้าใจสถาปัตยกรรมระบบแล้ว (Return to Help)</span>
        </button>
      </div>
    </div>
  );
};
