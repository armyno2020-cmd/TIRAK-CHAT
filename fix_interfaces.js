import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // If the file is broken like this:
  // import { FirebaseService } from '../services/firebaseService';\n\n  currentUser: any;
  // We need to inject the interface back.
  
  const screenName = file.replace('.tsx', '');
  const interfaceName = `${screenName}Props`;
  
  // A heuristic: if it has "  onNavigate: " at the root level (no interface), inject it before.
  // We look for the first occurrence of properties without an interface.
  // Actually, wait, it's easier to just find `\n  onNavigate:` or `\n  activeLanguage:` and put the interface before it, IF it's not inside an interface.
  // Even simpler: The line deleted was `interface XxxProps {`.
  
  if (!content.includes(`interface ${interfaceName}`)) {
     // Find the last import
     const lastImportIndex = content.lastIndexOf('import ');
     if (lastImportIndex !== -1) {
       const endOfImports = content.indexOf(';', lastImportIndex) + 1;
       const before = content.substring(0, endOfImports);
       let after = content.substring(endOfImports);
       
       // If after starts with some whitespace then properties...
       // Let's just find the first prop like currentUser: any; or onNavigate: or activeLanguage:
       after = after.replace(/^\s*(activeLanguage\s*:|currentUser\s*:|onNavigate\s*:|phoneNumber\s*:|chats\s*:|chatRoom\s*:|peerName\s*:|activeScreen\s*:|securitySettings\s*:)/m, `\n\ninterface ${interfaceName} {\n  $1`);
       
       content = before + after;
     }
  }
  
  // Also check if we deleted `React.FC<{`
  if (!content.includes('React.FC<{') && content.includes('React.FC<') === false && content.includes('=> {')) {
    // some were defined inline
  }

  fs.writeFileSync(path.join(dir, file), content);
}
