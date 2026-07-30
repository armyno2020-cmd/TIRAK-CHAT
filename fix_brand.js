import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  content = content.replace(/Tirak Chat/g, 'NEWFOUND');
  
  // also fix duplicate App.tsx props again if needed
  fs.writeFileSync(path.join(dir, file), content);
}
