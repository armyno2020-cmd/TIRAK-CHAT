import fs from 'fs';

const code = `
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Mic, 
  Image as ImageIcon, 
  Send,
  Paperclip,
  CheckCheck,
  Play,
  Pause,
  Trash2,
  CornerUpLeft,
  Pin,
  FileText,
  Eye,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, ChatRoom, Language, ScreenId, UserProfile } from '../types';
import { getTranslation } from '../locales/i18n';
import { PresenceDot } from '../components/PresenceDot';

interface ChatDetailScreenProps {
  chatRoom: ChatRoom;
  messages: ChatMessage[];
  currentUserId: string;
  activeLanguage: Language;
  currentUser: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onSendMessage: (roomId: string, content: string, type?: 'text' | 'image' | 'voice_note', extra?: any) => void;
  onStartCall: (peerUid: string, type: 'voice' | 'video') => void;
  onTogglePinMessage?: (messageId: string, isPinned: boolean) => void;
  onOpenGroupInfo: () => void;
  onOpenMediaViewer: (url: string) => void;
}

export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({
  chatRoom,
  messages,
  currentUserId,
  activeLanguage,
  currentUser,
  onNavigate,
  onSendMessage,
  onStartCall,
  onTogglePinMessage,
  onOpenGroupInfo,
  onOpenMediaViewer
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [viewOnceEnabled, setViewOnceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(recordingTimerRef.current);
    }
    return () => clearInterval(recordingTimerRef.current);
  }, [isRecording]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(chatRoom.id, inputText, 'text', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });
    setInputText('');
    setReplyingTo(null);
    setViewOnceEnabled(false);
  };

  const handleSendVoiceNote = () => {
    if (recordingSeconds > 0) {
      onSendMessage(chatRoom.id, \`Voice note (\${recordingSeconds}s)\`, 'voice_note', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });
    }
    setIsRecording(false);
    setReplyingTo(null);
    setViewOnceEnabled(false);
  };

  const handleSendMockImage = () => {
    onSendMessage(chatRoom.id, 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=400&auto=format&fit=crop', 'image', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });
    setShowAttachmentMenu(false);
    setReplyingTo(null);
    setViewOnceEnabled(false);
  };

  const peerUid = chatRoom.members?.find(m => m !== currentUserId) || chatRoom.members?.[0] || 'Unknown';
  
  const formatMessageTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
  };

  const pinnedMessage = messages.find(m => m.isPinned);

  return (
    <div className="bg-[#fcf8fb] min-h-screen font-th-body text-[#1b1b1d] overflow-hidden flex flex-col relative" style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(226, 226, 231, 0.3) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(255, 239, 239, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(226, 226, 231, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(242, 242, 247, 0.5) 0px, transparent 50%)' }}>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-50">
        <div className="bg-[#fcf8fb]/60 backdrop-blur-3xl border border-white/20 rounded-full shadow-sm flex justify-between items-center px-4 h-16 w-auto transition-all duration-300">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('chat_list')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-[#1b1b1d]">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            
            <div className="flex items-center gap-3" onClick={onOpenGroupInfo} style={{ cursor: 'pointer' }}>
              <div className="relative">
                <img 
                  className="w-10 h-10 rounded-full object-cover border border-white/40" 
                  alt={chatRoom.name} 
                  src={chatRoom.avatarUrl || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(chatRoom.name)}&background=random\`} 
                />
                <div className="absolute bottom-0 right-0 z-10">
                  <PresenceDot uid={peerUid} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-th-heading text-[17px] font-semibold leading-none text-[#1b1b1d]">{chatRoom.name}</span>
                <span className="font-label-caps text-[10px] text-[#45474a] flex items-center gap-1 mt-1">
                   End-to-end Encrypted
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => onStartCall(peerUid, 'voice')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-[#45474a]">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button onClick={() => onStartCall(peerUid, 'video')} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-[#45474a]">
              <span className="material-symbols-outlined">videocam</span>
            </button>
          </div>
        </div>
        
        {/* Pinned Message Banner */}
        {pinnedMessage && (
          <div className="mt-2 mx-4 p-2 bg-[#ffefef]/80 backdrop-blur-md rounded-2xl border border-white/60 flex items-center justify-between text-xs shadow-sm cursor-pointer hover:bg-[#ffefef] transition-colors" onClick={() => {
            const el = document.getElementById(\`msg-\${pinnedMessage.id}\`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}>
            <div className="flex items-center space-x-2 overflow-hidden">
              <Pin className="w-3.5 h-3.5 text-[#7e5356] shrink-0" />
              <div className="truncate">
                <span className="font-bold text-[#1b1b1d] mr-1">{pinnedMessage.senderName}:</span>
                <span className="text-[#45474a]">{pinnedMessage.contentType === 'image' ? 'Photo' : pinnedMessage.contentType === 'voice_note' ? 'Voice note' : pinnedMessage.content}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Chat Canvas */}
      <main className="h-screen pt-24 pb-28 px-4 md:px-0 flex flex-col max-w-4xl mx-auto w-full relative">
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffefef]/30 to-transparent blur-[120px]"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 pb-4 relative z-10 hide-scrollbar" id="chat-container">
          <div className="flex justify-center my-8">
            <span className="font-label-caps text-[#45474a]/60 bg-[#f6f3f5]/40 px-4 py-1 rounded-full text-[10px] uppercase tracking-wider">
              {getTranslation(activeLanguage, 'chatStarted') || 'CHAT STARTED'}
            </span>
          </div>

          {messages.map((msg, index) => {
            const isMe = msg.senderId === currentUserId;
            
            return (
              <div key={msg.id} id={\`msg-\${msg.id}\`} className={\`flex flex-col \${isMe ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%] \${isMe ? 'ml-auto' : ''} space-y-1 group relative\`}>
                
                {msg.replyToId && (
                  <div className={\`flex items-center gap-1 mb-1 text-[10px] \${isMe ? 'text-[#7e5356]' : 'text-[#45474a]'}\`}>
                    <CornerUpLeft className="w-3 h-3" />
                    <span>Replying</span>
                  </div>
                )}
                
                <div className={\`\${isMe ? 'bg-[#ffefef] border border-[#7e5356]/10 rounded-2xl rounded-br-none' : 'glass-surface border border-white/40 rounded-2xl rounded-bl-none'} px-5 py-3.5 shadow-[0_4px_20px_-2px_rgba(93,94,99,0.05)] relative overflow-hidden\`}>
                  
                  {msg.viewOnce && !isMe && (
                    <div className="flex items-center gap-2 mb-2 text-rose-500 font-bold text-xs cursor-pointer" onClick={() => { if(msg.mediaUrl) onOpenMediaViewer(msg.mediaUrl); }}>
                      <Eye className="w-4 h-4" /> View Once Message
                    </div>
                  )}

                  {msg.contentType === 'text' && (
                    <p className={\`text-[16px] leading-relaxed \${isMe ? 'text-[#7e5356]' : 'text-[#1b1b1d]'}\`}>
                      {msg.content}
                    </p>
                  )}
                  
                  {msg.contentType === 'image' && msg.mediaUrl && (
                    <div className="relative rounded-xl overflow-hidden mb-1 cursor-pointer" onClick={() => onOpenMediaViewer(msg.mediaUrl!)}>
                      <img src={msg.mediaUrl} alt="Attachment" className="max-w-full h-auto object-cover max-h-64" />
                    </div>
                  )}
                  
                  {msg.contentType === 'voice_note' && (
                    <div className="flex items-center space-x-3 w-48">
                      <button className={\`w-10 h-10 rounded-full flex items-center justify-center \${isMe ? 'bg-[#7e5356] text-white' : 'bg-white text-[#1b1b1d]'}\`}>
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <div className={\`h-full w-1/3 \${isMe ? 'bg-[#7e5356]' : 'bg-[#1b1b1d]'}\`} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={\`flex items-center gap-1 text-[11px] font-label-caps text-[#45474a]/50 uppercase \${isMe ? 'mr-2' : 'ml-2'}\`}>
                  <span>{formatMessageTime(msg.createdAt)}</span>
                  {isMe && (
                    <span className="flex items-center gap-0.5 ml-1">
                      • {(msg.readBy && msg.readBy.length > 0) ? 'READ' : 'SENT'}
                      {(msg.readBy && msg.readBy.length > 0) && <CheckCheck className="w-3.5 h-3.5 ml-0.5" />}
                    </span>
                  )}
                  {msg.isPinned && (
                    <span className="flex items-center gap-0.5 ml-1 text-[#7e5356]">
                      • <Pin className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
                
                {/* Actions (Hover) */}
                <div className={\`absolute -top-3 \${isMe ? 'right-2' : 'left-2'} flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10\`}>
                  <button onClick={() => setReplyingTo(msg)} className="p-1.5 rounded-full bg-white shadow border border-[#eae7ea] text-[#7e5356] hover:bg-rose-50" title="Reply">
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { if(onTogglePinMessage) onTogglePinMessage(msg.id, !msg.isPinned); }} className="p-1.5 rounded-full bg-white shadow border border-[#eae7ea] text-[#5d5e63] hover:bg-gray-50" title={msg.isPinned ? "Unpin" : "Pin"}>
                    <Pin className={\`w-3.5 h-3.5 \${msg.isPinned ? 'fill-current' : ''}\`} />
                  </button>
                  {isMe && (
                    <button className="p-1.5 rounded-full bg-white shadow border border-[#eae7ea] text-rose-500 hover:bg-rose-50" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Attachment Options Drawer */}
      <AnimatePresence>
        {showAttachmentMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-40"
          >
            <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[24px] border border-white shadow-2xl mx-auto w-fit flex gap-4">
              <button onClick={handleSendMockImage} className="p-4 rounded-[20px] bg-[#fcf8fb] flex flex-col items-center hover:bg-white text-[#7e5356] shadow-sm border border-white transition-all active:scale-95">
                <ImageIcon className="w-6 h-6 mb-2" />
                <span className="text-[11px] font-bold font-label-caps">Photo</span>
              </button>
              <button onClick={handleSendMockImage} className="p-4 rounded-[20px] bg-[#fcf8fb] flex flex-col items-center hover:bg-white text-indigo-600 shadow-sm border border-white transition-all active:scale-95">
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-[11px] font-bold font-label-caps">Document</span>
              </button>
              <button onClick={() => { setViewOnceEnabled(!viewOnceEnabled); setShowAttachmentMenu(false); }} className={\`p-4 rounded-[20px] shadow-sm border border-white flex flex-col items-center transition-all active:scale-95 \${viewOnceEnabled ? 'bg-rose-500 text-white' : 'bg-[#fcf8fb] text-amber-600 hover:bg-white'}\`}>
                <Eye className="w-6 h-6 mb-2" />
                <span className="text-[11px] font-bold font-label-caps">View Once</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input Bar (Bottom) */}
      <footer className="fixed bottom-6 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-50">
        
        {/* Replying Context Box */}
        {replyingTo && (
          <div className="mb-2 bg-[#fcf8fb]/90 backdrop-blur-md p-3 rounded-[24px] border border-white shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffefef] flex items-center justify-center text-[#7e5356] shrink-0">
                <CornerUpLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#1b1b1d] text-[12px]">Replying to {replyingTo.senderName}</p>
                <p className="text-[11px] text-[#45474a] truncate mt-0.5">{replyingTo.content}</p>
              </div>
            </div>
            <button onClick={() => setReplyingTo(null)} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#45474a] transition-colors">
              ✕
            </button>
          </div>
        )}
        
        {isRecording ? (
          <div className="bg-[#fcf8fb]/80 backdrop-blur-2xl border border-white/40 rounded-full shadow-lg p-2 flex items-center gap-2">
            <button onClick={() => setIsRecording(false)} className="w-12 h-12 rounded-full flex items-center justify-center text-rose-500 hover:bg-white/40 transition-colors active:scale-95">
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center space-x-3 px-4">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span className="text-sm font-mono font-bold text-rose-600">0:{recordingSeconds.toString().padStart(2, '0')}</span>
            </div>
            <button onClick={handleSendVoiceNote} className="w-12 h-12 bg-[#7e5356] text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
              <Send className="w-5 h-5" style={{ fontVariationSettings: "'FILL' 1" }} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="bg-[#fcf8fb]/80 backdrop-blur-2xl border border-white/40 rounded-full shadow-lg p-2 flex items-center gap-2">
            <button type="button" onClick={() => setShowAttachmentMenu(!showAttachmentMenu)} className="w-12 h-12 rounded-full flex items-center justify-center text-[#45474a]/60 hover:text-[#7e5356] transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getTranslation(activeLanguage, 'typeMessage') || 'Message...'} 
                className="w-full h-12 bg-white/40 border-none rounded-full px-6 focus:ring-2 focus:ring-[#7e5356]/20 placeholder:text-[#45474a]/40 text-[#1b1b1d] font-th-body text-[15px] outline-none transition-all shadow-inner"
              />
              {viewOnceEnabled && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  View Once
                </span>
              )}
            </div>
            {inputText.trim() ? (
              <button type="submit" className="w-12 h-12 bg-[#7e5356] text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            ) : (
              <button type="button" onClick={() => setIsRecording(true)} className="w-12 h-12 rounded-full flex items-center justify-center text-[#45474a]/60 hover:text-[#7e5356] transition-colors">
                <span className="material-symbols-outlined">mic</span>
              </button>
            )}
          </form>
        )}
      </footer>

    </div>
  );
};
`

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', code);
console.log('Fixed ChatDetailScreen.tsx');
