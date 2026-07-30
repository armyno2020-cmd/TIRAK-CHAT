import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx'));
let invalidFiles = [];

files.forEach(file => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  let exportConstIndex = -1;
  let hookIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('export const ' + file.replace('.tsx', ''))) {
      exportConstIndex = i;
    }
    if ((line.includes('useState') || line.includes('useEffect') || line.includes('useRef')) && !line.includes('import')) {
      if (hookIndex === -1) {
        hookIndex = i;
      }
    }
  }
  
  if (hookIndex !== -1 && exportConstIndex !== -1 && hookIndex < exportConstIndex) {
    invalidFiles.push(file);
    // Fix it by moving the export const line to just above the first hook
    const exportLines = lines.splice(exportConstIndex, 2); // assuming it's 2 lines: export const ... and const { ... } = props || {};
    lines.splice(hookIndex, 0, ...exportLines);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Fixed ${file}`);
  }
});

console.log(invalidFiles);
