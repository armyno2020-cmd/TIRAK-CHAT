import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// replace handleSendMessage signature
content = content.replace(
  /const handleSendMessage = async \(\n\s*chatId: string,\n\s*text: string,\n\s*type: 'text' \| 'image' \| 'voice_note' = 'text',\n\s*extra\?: any\n\s*\) => \{/,
  "const handleSendMessage = async (chatId: string, text: string, type: 'text' | 'image' | 'voice_note' = 'text', replyToId?: string, isViewOnce?: boolean, extra?: any) => {"
);

content = content.replace(
  /const handleSendMessage = async \(\s*chatId: string,\s*text: string,\s*type: 'text' \| 'image' \| 'voice_note' = 'text',\s*extra\?: any\s*\) => \{/g,
  "const handleSendMessage = async (chatId: string, text: string, type: 'text' | 'image' | 'voice_note' = 'text', replyToId?: string, isViewOnce?: boolean, extra?: any) => {"
);

// fix video/voice mismatch
content = content.replace(
  /onStartCall=\{\(peerUid, type\) => handleStartCall\(activeChatRoom.name, activeChatRoom.avatarUrl, type\)\}/,
  "onStartCall={(peerUid, type) => handleStartCall(activeChatRoom.name, activeChatRoom.avatarUrl, type as 'voice' | 'video')}"
);

content = content.replace(
  /isViewOnce:\s*false/g,
  "viewOnce: false"
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx fixed');
