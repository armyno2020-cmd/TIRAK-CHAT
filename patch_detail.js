import fs from 'fs';
let code = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// Fix 'Add' import
code = code.replace(/Add\n} from 'lucide-react';/, '} from \'lucide-react\';');

// Fix type
code = code.replace(/'text' | 'image' | 'voice'/g, "'text' | 'image' | 'voice_note'");
code = code.replace(/msg\.type === /g, 'msg.contentType === ');
code = code.replace(/pinnedMessage\.type === /g, 'pinnedMessage.contentType === ');
code = code.replace(/msg.isViewOnce/g, 'msg.viewOnce');
code = code.replace(/msg.timestamp/g, 'msg.createdAt');
code = code.replace(/msg.status === 'read'/g, '(msg.readBy && msg.readBy.length > 0)');

code = code.replace(/getTranslation\(activeLanguage, 'chatStarted'\)/, "'CHAT STARTED'");

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', code);
console.log('Fixed ChatDetailScreen');
