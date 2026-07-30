import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Add activeLanguage?: any; currentUser?: any; to the props interface or inline type.
  content = content.replace(/Screen:\s*React\.FC<\{/g, 'Screen: React.FC<{ activeLanguage?: any; currentUser?: any;');
  content = content.replace(/ScreenProps\s*\{/g, 'ScreenProps { activeLanguage?: any; currentUser?: any;');
  content = content.replace(/interface\s+[a-zA-Z0-9]+Props\s*\{/g, (match) => match + ' activeLanguage?: any; currentUser?: any;');
  
  fs.writeFileSync(path.join(dir, file), content);
}
