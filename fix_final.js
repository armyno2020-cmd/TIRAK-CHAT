import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Fix imports
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+'lucide-react'/g, (match, p1) => {
    let imports = p1.split(',').map(s => s.trim());
    const replacements = {
      'Call': 'Phone',
      'CallMade': 'ArrowUpRight',
      'CallReceived': 'ArrowDownLeft',
      'CallMissed': 'PhoneMissed',
      'Videocam': 'Video',
      'ChatBubble': 'MessageCircle',
      'Security': 'Shield',
      'VerifiedUser': 'ShieldCheck',
      'PermMedia': 'ImageIcon',
      'PhoneIphone': 'Smartphone',
      'LocationOn': 'MapPin',
      'Description': 'FileText',
      'Block': 'Ban',
      'CloudSync': 'CloudRain'
    };
    for (let i = 0; i < imports.length; i++) {
      if (replacements[imports[i]]) {
        imports[i] = replacements[imports[i]];
      }
    }
    return `import { ${imports.join(', ')} } from 'lucide-react'`;
  });
  
  // Replace components in JSX
  content = content.replace(/<Call/g, '<Phone');
  content = content.replace(/<\/Call>/g, '</Phone>');
  
  content = content.replace(/<CallMade/g, '<ArrowUpRight');
  content = content.replace(/<\/CallMade>/g, '</ArrowUpRight>');
  
  content = content.replace(/<CallReceived/g, '<ArrowDownLeft');
  content = content.replace(/<\/CallReceived>/g, '</ArrowDownLeft>');
  
  content = content.replace(/<CallMissed/g, '<PhoneMissed');
  content = content.replace(/<\/CallMissed>/g, '</PhoneMissed>');
  
  content = content.replace(/<Videocam/g, '<Video');
  content = content.replace(/<\/Videocam>/g, '</Video>');
  
  content = content.replace(/<ChatBubble/g, '<MessageCircle');
  content = content.replace(/<\/ChatBubble>/g, '</MessageCircle>');
  
  content = content.replace(/<Security/g, '<Shield');
  content = content.replace(/<\/Security>/g, '</Shield>');
  
  content = content.replace(/<VerifiedUser/g, '<ShieldCheck');
  content = content.replace(/<\/VerifiedUser>/g, '</ShieldCheck>');
  
  content = content.replace(/<PermMedia/g, '<ImageIcon');
  content = content.replace(/<\/PermMedia>/g, '</ImageIcon>');
  
  content = content.replace(/<PhoneIphone/g, '<Smartphone');
  content = content.replace(/<\/PhoneIphone>/g, '</Smartphone>');
  
  content = content.replace(/<LocationOn/g, '<MapPin');
  content = content.replace(/<\/LocationOn>/g, '</MapPin>');
  
  content = content.replace(/<Description/g, '<FileText');
  content = content.replace(/<\/Description>/g, '</FileText>');
  
  content = content.replace(/<Block /g, '<Ban ');
  content = content.replace(/<\/Block>/g, '</Ban>');

  content = content.replace(/<CloudSync/g, '<CloudRain');
  content = content.replace(/<\/CloudSync>/g, '</CloudRain>');

  // Also fix any onEndPhone -> onEndCall that were left over
  content = content.replace(/mockOnEndPhone/g, 'mockOnEndCall');

  fs.writeFileSync(path.join(dir, file), content);
}
