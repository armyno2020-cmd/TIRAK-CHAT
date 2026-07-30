import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatListScreen.tsx', 'utf8');

// Replace the main return block
const startPattern = /return \(\s*<div className="bg-\[#fcf8fb\] text-\[#1b1b1d\] min-h-screen overflow-hidden flex flex-col font-th-body relative">/g;
const newHtml = `return (
    <div className="bg-[#fcf8fb] text-[#1b1b1d] min-h-screen overflow-hidden flex flex-col font-th-body relative">
      <header className="fixed top-4 inset-x-4 rounded-full bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 shadow-sm flex justify-between items-center px-6 h-16 w-auto max-w-5xl mx-auto z-50">
        <div className="flex items-center gap-3 active:scale-95 duration-200 cursor-pointer">
          <ShieldCheck className="w-6 h-6 text-[#5d5e63]" />
        </div>
        <h1 className="font-th-heading text-xl tracking-tighter text-[#1b1b1d]">NEWFOUND</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40 active:scale-95 duration-200 cursor-pointer" onClick={() => onNavigate('settings_account')}>
            <img className="w-full h-full object-cover" src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=User"} />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-28 pb-32 px-5 max-w-5xl mx-auto w-full overflow-y-auto">
        {/* Stories Carousel */}
        <section className="mb-6 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('stories_feed')}>
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-white/40 active:scale-95 transition-transform bg-white/40">
                <Plus className="w-6 h-6 text-[#7e5356]" />
              </div>
              <span className="font-th-body text-[12px] font-semibold text-[#45474a]">Your Story</span>
            </div>
            {/* Mock Story 1 */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('stories_feed')}>
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#7e5356] via-[#f0b9bc] to-white active:scale-95 transition-transform">
                <div className="w-[60px] h-[60px] rounded-full border-2 border-[#fcf8fb] overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPdQWuSBMF_RwnhCNpuhyRZlSE_xLitEZh7AY7sIVRLuJG7Ia35dT4fDna3iatnvUnm91bVurZ6hlri4cWmVjtcCuomadYGtYqBuxQoiiwoni0ula0ZYGIW9tBQhGKPqg17EZDCoRlk8eA2MMjNC1UTDWAQbEkr-j4Tqk3aXNN_9c68YXC55Q9UmoMaPondw606fhvA7VBVPCl2Sh4juiG4-F1BT5tOJi1lYQHwkTjOpdLFMfrXInqzsirwgjiS47xfu1Knw1XISc" />
                </div>
              </div>
              <span className="font-th-body text-[12px] font-semibold text-[#1b1b1d]">Elena</span>
            </div>
            {/* Mock Story 2 */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('stories_feed')}>
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#7e5356] via-[#f0b9bc] to-white active:scale-95 transition-transform">
                <div className="w-[60px] h-[60px] rounded-full border-2 border-[#fcf8fb] overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuSUbtYG186wRu-4DEcVsYi7CmBNm3biu1odfhNfW01KJF03PD2E9n3bEL0Q0DSn39pkBFI5G7QBjjN5YtjBTrVwWLnNbDULGLft8DL6tX0YoE6Ck9LElCwLgT7GthpaeeTMooYsVJTmPmJAanQAz4Dv-6EimjBhPSKi7LE0iw7KO8HxxKZ4mv9aQCQYwQYLsimox0roXvRsqySUDOUvKoZF7gcWPC8UgJ3qu-YyLnxVIpaFmNLnDbWm3pMaeGsvEqtYtFiXoMPKA" />
                </div>
              </div>
              <span className="font-th-body text-[12px] font-semibold text-[#1b1b1d]">Julian</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-th-heading text-2xl font-bold px-2 text-[#1b1b1d] mb-2">Messages</h2>
          {filteredChats.map((chat) => {
            const peerUid = chat.members?.find(m => m !== currentUser?.uid) || chat.members?.[0];
            return (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="glass-card rounded-3xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/40 transition-colors active:scale-[0.98] duration-200 border border-white/40 bg-white/30"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/30">
                    <img className="w-full h-full object-cover" src={chat.avatarUrl} alt={chat.name} />
                  </div>
                  {peerUid && <PresenceDot uid={peerUid} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-th-body text-[17px] font-semibold truncate text-[#1b1b1d]">{chat.name}</span>
                    <span className="font-th-body text-[10px] font-semibold tracking-wider text-[#7e5356]">
                      {new Date(chat.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-th-body text-[14px] text-[#45474a] font-medium truncate">{chat.lastMessage || 'ไม่มีข้อความ'}</p>
                </div>
                {chat.unreadCount ? (
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-[#ffefef] text-[#7e5356] px-2 py-0.5 rounded-full font-th-body font-semibold text-[10px]">{chat.unreadCount}</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
      </main>

      <button onClick={onOpenNewGroup} className="fixed bottom-24 right-8 w-14 h-14 bg-[#7e5356] text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>edit_square</span>
      </button>
    </div>
  );`;

let startIndex = content.indexOf('return (');
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + newHtml + '\n};';
  fs.writeFileSync('src/screens/ChatListScreen.tsx', content);
  console.log("Updated ChatListScreen");
}
