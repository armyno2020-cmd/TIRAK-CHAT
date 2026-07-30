import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// fix onSendMessage type
content = content.replace(
  /onSendMessage: \(roomId: string, content: string, type\?: 'text' \| 'image' \| 'voice', replyToId\?: string, isViewOnce\?: boolean\) => void;/,
  "onSendMessage: (roomId: string, content: string, type?: 'text' | 'image' | 'voice_note', replyToId?: string, isViewOnce?: boolean) => void;"
);

// fix 'voice' to 'voice_note'
content = content.replace(/'voice'/g, "'voice_note'");
content = content.replace(/msg\.type === 'text'/g, "msg.contentType === 'text'");
content = content.replace(/msg\.type === 'image'/g, "msg.contentType === 'image'");
content = content.replace(/msg\.type === 'voice_note'/g, "msg.contentType === 'voice_note'");
content = content.replace(/pinnedMessage\.type === 'image'/g, "pinnedMessage.contentType === 'image'");
content = content.replace(/pinnedMessage\.type === 'voice_note'/g, "pinnedMessage.contentType === 'voice_note'");

// fix msg.isViewOnce to msg.viewOnce
content = content.replace(/msg\.isViewOnce/g, "msg.viewOnce");

// fix msg.timestamp to msg.createdAt
content = content.replace(/msg\.timestamp/g, "msg.createdAt");

// fix msg.status to msg.readBy
content = content.replace(/msg\.status === 'read'/g, "(msg.readBy && msg.readBy.length > 0)");

// fix 'Add' import from lucide-react if present
content = content.replace(/,\s*Add\s*}/, "}");

// fix chatStarted Translation
content = content.replace(/getTranslation\(activeLanguage, 'chatStarted'\)/, "'CHAT STARTED'");

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
console.log('ChatDetailScreen fixed');
