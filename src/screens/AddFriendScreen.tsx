import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  UserPlus,
  Shield,
  ScanLine,
  Smartphone,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { ScreenId } from "../types";
import { FirebaseService } from "../services/firebaseService";

interface AddFriendScreenProps {
  currentUser: any;
  onNavigate: (screen: ScreenId) => void;
}

export const AddFriendScreen: React.FC<AddFriendScreenProps> = ({
  currentUser,
  onNavigate,
}) => {
  const [friendCode, setFriendCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = FirebaseService.subscribeToFriendRequests(
      currentUser.uid,
      (requests) => {
        setPendingRequests(requests || []);
      },
    );
    return () => unsub();
  }, [currentUser?.uid]);

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendCode.trim()) return;
    setLoading(true);
    setStatusMessage(null);

    const res = await FirebaseService.addFriend(
      currentUser.uid,
      friendCode.trim(),
    );

    if (res.success) {
      setStatusMessage({
        text: res.message || "ส่งคำขอเป็นเพื่อนเรียบร้อยแล้ว",
        type: res.status === "accepted" ? "success" : "info",
      });
      setFriendCode("");
      if (res.status === "accepted") {
        setTimeout(() => onNavigate("chat_list"), 1200);
      }
    } else {
      setStatusMessage({
        text: res.message || "ไม่พบผู้ใช้งาน กรุณาตรวจสอบไอดีอีกครั้ง",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleAcceptRequest = async (friendshipId: string) => {
    const ok = await FirebaseService.acceptFriendRequest(friendshipId);
    if (ok) {
      setStatusMessage({ text: "ตอบรับคำขอเป็นเพื่อนสำเร็จ!", type: "success" });
    }
  };

  const handleRejectRequest = async (friendshipId: string) => {
    await FirebaseService.rejectFriendRequest(friendshipId);
  };

  return (
    <div className="bg-transparent text-[#1b1b1d] h-full w-full font-th-body flex flex-col relative overflow-hidden">
      <header className="sticky top-0 z-30 px-4 py-3 glass-surface border-b border-white/60 shadow-2xs flex justify-between items-center w-full shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate("chat_list")}
            className="glass-button-secondary p-1.5 rounded-full glass-button-secondary transition-colors text-[#1b1b1d] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-th-heading text-[18px] text-[#7e5356] font-bold tracking-tight">
            เพิ่มเพื่อนใหม่
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full space-y-6 pb-12">
        <div>
          <h1 className="font-th-heading text-[22px] font-bold text-[#1b1b1d] mb-1">
            ค้นหาและเพิ่มเพื่อน
          </h1>
          <p className="text-[#45474a] font-th-body text-[13px]">
            ระบุไอดี ยูสเซอร์เนม หรือเบอร์โทรศัพท์เพื่อส่งคำขอเป็นเพื่อน
            (ปลายทางจะต้องยืนยันการรับเพื่อนก่อนจึงจะเห็นข้อมูลกัน)
          </p>
        </div>

        <section className="glass-surface border border-white/80 rounded-2xl p-5 shadow-2xs relative overflow-hidden">
          <form onSubmit={handleAddFriend} className="relative z-10 space-y-4">
            <div className="space-y-1.5">
              <label className="font-th-heading text-[12px] font-bold text-[#7e5356] tracking-wider uppercase ml-1">
                ไอดีผู้ใช้หรือเบอร์โทรศัพท์
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value)}
                  placeholder="@username หรือ +66..."
                  className="w-full h-12 glass-surface border border-white/40 rounded-xl pl-11 pr-4 font-th-body text-[14px] focus:outline-none focus:ring-2 focus:ring-[#7e5356]/30 transition-all shadow-2xs"
                />
                <Search className="w-4 h-4 text-[#45474a]/60 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              className="w-full h-12 glass-button-primary rounded-xl font-th-heading text-[14px] font-bold shadow-2xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={loading || !friendCode.trim()}
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? "กำลังส่งคำขอ..." : "ส่งคำขอเป็นเพื่อน"}</span>
            </button>

            {statusMessage && (
              <p
                className={`text-center font-bold text-xs mt-2 ${
                  statusMessage.type === "success"
                    ? "text-emerald-700"
                    : statusMessage.type === "info"
                      ? "text-amber-700"
                      : "text-[#ba1a1a]"
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </form>
        </section>

        {/* Pending Friend Requests Section */}
        {pendingRequests.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Clock className="w-4 h-4 text-[#7e5356]" />
              <h2 className="font-th-heading text-[15px] font-bold text-[#7e5356]">
                คำขอเป็นเพื่อนที่รอการยืนยัน ({pendingRequests.length})
              </h2>
            </div>
            <div className="space-y-2">
              {pendingRequests.map((req) => (
                <div
                  key={req.friendshipId}
                  className="glass-surface border border-white/80 rounded-2xl p-4 flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        req.requester?.photoURL ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      }
                      alt={req.requester?.displayName || "User"}
                      className="w-11 h-11 rounded-full object-cover border border-white/60"
                    />
                    <div>
                      <h3 className="font-th-heading text-[14px] font-bold text-[#1b1b1d]">
                        {req.requester?.displayName || "สมาชิก Tirak Chat"}
                      </h3>
                      <p className="text-[12px] text-[#45474a]">
                        @{req.requester?.username || "user"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAcceptRequest(req.friendshipId)}
                      className="glass-button-primary px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>ยอมรับ</span>
                    </button>
                    <button
                      onClick={() => handleRejectRequest(req.friendshipId)}
                      className="glass-button-secondary px-3 py-1.5 rounded-xl font-bold text-xs text-[#ba1a1a] flex items-center gap-1 cursor-pointer"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>ปฏิเสธ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate("qr_scanner")}
            className="glass-button-secondary glass-surface border border-white/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-2xs active:scale-95 transition-all glass-button-secondary cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl glass-button-primary/10 text-[#7e5356] flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <span className="font-th-heading text-[13px] font-bold text-[#1b1b1d]">
              สแกน QR Code
            </span>
          </button>

          <button
            onClick={() => onNavigate("contact_sync")}
            className="glass-button-secondary glass-surface border border-white/80 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-2xs active:scale-95 transition-all glass-button-secondary cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl glass-button-primary/10 text-[#7e5356] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-th-heading text-[13px] font-bold text-[#1b1b1d]">
              ซิงค์รายชื่อสมุดโทรศัพท์
            </span>
          </button>
        </section>
      </main>

      <footer className="py-3 flex justify-center w-full shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1 glass-surface rounded-full border border-white/80 shadow-2xs">
          <Shield className="w-3 h-3 text-[#7e5356]" />
          <span className="text-[11px] text-[#45474a] font-th-body">
            การค้นหาแบบปลอดภัย ปลายทางต้องตอบรับเพื่อนก่อนเปิดเผยข้อมูล
          </span>
        </div>
      </footer>
    </div>
  );
};
