import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const screenName = file.replace('.tsx', '');
  
  if (!content.includes(`export const ${screenName}: React.FC`)) {
    // We deleted the export const line!
    // It usually looked like: export const ScreenName: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
    // Or it might just have `onNavigate }) => {` left on the next line.
    
    // Find where the imports end
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
       const endOfImports = content.indexOf(';', lastImportIndex) + 1;
       const before = content.substring(0, endOfImports);
       let after = content.substring(endOfImports);
       
       // In after, we probably have something like `onNavigate }) => {` or `}) => {`
       // We can just inject `\nexport const ${screenName}: React.FC<any> = (` right before the first `({` or `({ onNavigate`
       // Let's use a regex to find the start of the destructured arguments
       after = after.replace(/^\s*\(\{\s*(onNavigate|activeLanguage|currentUser|chatRoom)/m, `\nexport const ${screenName}: React.FC<any> = ({ $1`);
       
       content = before + after;
    }
  }

  fs.writeFileSync(path.join(dir, file), content);
}
