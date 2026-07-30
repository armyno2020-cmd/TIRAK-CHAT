import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
let insideHook = false;
let openBrackets = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // just check if there is a useXXX inside an indented block that isn't the root of the component
  if (line.match(/\b(useState|useEffect|useRef|useCallback|useMemo)\b/) && !line.includes('import')) {
     console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
