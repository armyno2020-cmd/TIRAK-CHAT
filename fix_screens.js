import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Revert bad seds
  content = content.replace(/PhoneMade/g, 'ArrowUpRight');
  content = content.replace(/PhoneReceived/g, 'ArrowDownLeft');
  content = content.replace(/PhoneMissed/g, 'PhoneMissed');
  
  // Revert onEndPhone -> onEndCall
  content = content.replace(/onEndPhone/g, 'onEndCall');
  content = content.replace(/onStartPhone/g, 'onStartCall');
  content = content.replace(/PhonePhone/g, 'Phone');
  
  // Revert component name mistakes if any
  content = content.replace(/<Phone /g, '<Call ');
  content = content.replace(/<Phone\n/g, '<Call\n');
  content = content.replace(/<Ban /g, '<Block ');
  content = content.replace(/<Ban\n/g, '<Block\n');

  fs.writeFileSync(path.join(dir, file), content);
}
