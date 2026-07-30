import fs from 'fs';
let code = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

code = code.replace(
  /onSendMessage: \(roomId: string, content: string, type\?: 'text' \| 'image' \| 'voice_note', replyToId\?: string, isViewOnce\?: boolean\) => void;/,
  "onSendMessage: (roomId: string, content: string, type?: 'text' | 'image' | 'voice_note', extra?: any) => void;"
);

code = code.replace(
  /onSendMessage\(chatRoom\.id, inputText, 'text', replyingTo\?\.id, viewOnceEnabled\);/,
  "onSendMessage(chatRoom.id, inputText, 'text', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });"
);

code = code.replace(
  /onSendMessage\(chatRoom\.id, `Voice note \(\${recordingSeconds}s\)`,\s*'voice_note', replyingTo\?\.id, viewOnceEnabled\);/,
  "onSendMessage(chatRoom.id, `Voice note (${recordingSeconds}s)`, 'voice_note', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });"
);

code = code.replace(
  /onSendMessage\(chatRoom\.id, 'https:\/\/images\.unsplash\.com\/photo-[^]+?', 'image', replyingTo\?\.id, viewOnceEnabled\);/,
  "onSendMessage(chatRoom.id, 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=400&auto=format&fit=crop', 'image', { replyToId: replyingTo?.id, viewOnce: viewOnceEnabled });"
);

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', code);
console.log('Fixed ChatDetailScreen signature');
