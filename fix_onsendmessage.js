import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');
content = content.replace(
  /onSendMessage\(chatRoom\.id, inputText, 'text', \{ replyToId: replyingTo\?\.id, viewOnce: viewOnceEnabled \}\);/,
  "onSendMessage(chatRoom.id, inputText, 'text', replyingTo?.id, viewOnceEnabled);"
);

content = content.replace(
  /onSendMessage\(chatRoom\.id, 'https:\/\/images\.unsplash\.com[^']+', 'image', \{ replyToId: replyingTo\?\.id, viewOnce: viewOnceEnabled \}\);/,
  "onSendMessage(chatRoom.id, 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=400&auto=format&fit=crop', 'image', replyingTo?.id, viewOnceEnabled);"
);

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
