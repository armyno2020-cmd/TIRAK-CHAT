import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
files.push('../App.tsx');

files.forEach(file => {
  const filePath = file === '../App.tsx' ? 'src/App.tsx' : path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.match(/if\s*\(.*\)[\s\S]*?(useState|useEffect|useRef)/)) {
    console.log(`Potential conditional hook in ${file}`);
  }
});

