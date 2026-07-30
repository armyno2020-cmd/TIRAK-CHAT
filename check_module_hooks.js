import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  let exportConstIndex = -1;
  let hookIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/export const \w+Screen(Props)?:/)) {
      exportConstIndex = i;
    }
    if ((line.includes('useState') || line.includes('useEffect') || line.includes('useRef')) && !line.includes('import')) {
      if (hookIndex === -1) {
        hookIndex = i;
      }
    }
  }
  
  if (hookIndex !== -1 && exportConstIndex !== -1 && hookIndex < exportConstIndex) {
    console.log(`ERROR: Hook before export in ${file}`);
  }
});

// Also check App.tsx
const appContent = fs.readFileSync('src/App.tsx', 'utf8');
const appLines = appContent.split('\n');
let appExportIndex = -1;
let appHookIndex = -1;
for (let i = 0; i < appLines.length; i++) {
  const line = appLines[i];
  if (line.includes('function App(') || line.includes('export default function App')) {
    appExportIndex = i;
  }
  if ((line.includes('useState') || line.includes('useEffect') || line.includes('useRef')) && !line.includes('import')) {
    if (appHookIndex === -1) {
      appHookIndex = i;
    }
  }
}
if (appHookIndex !== -1 && appExportIndex !== -1 && appHookIndex < appExportIndex) {
  console.log(`ERROR: Hook before App function in src/App.tsx`);
}

