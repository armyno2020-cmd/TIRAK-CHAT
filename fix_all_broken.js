import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const screenName = file.replace('.tsx', '');
  
  // Check if it's missing the export line
  if (!content.includes(`export const ${screenName}:`)) {
    // Inject export const right after the last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
       const endOfImports = content.indexOf(';', lastImportIndex) + 1;
       const before = content.substring(0, endOfImports);
       let after = content.substring(endOfImports);
       
       // Just inject it before `return (`
       after = after.replace(/return\s*\(/, `\n\nexport const ${screenName}: React.FC<any> = (props) => {\n  const { onNavigate, activeLanguage, currentUser, chatRoom, chats, messages, peerName } = props || {};\n  return (`);
       
       content = before + after;
    }
  }

  fs.writeFileSync(path.join(dir, file), content);
}
