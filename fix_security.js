import fs from 'fs';
let sec = fs.readFileSync('src/screens/SecuritySetupScreen.tsx', 'utf8');
// find the last import and add export const
const lastImport = sec.lastIndexOf('import ');
const semi = sec.indexOf(';', lastImport) + 1;
const before = sec.substring(0, semi);
let after = sec.substring(semi);

if (!after.includes('export const SecuritySetupScreen')) {
  after = after.replace(/return\s*\(/, `\n\nexport const SecuritySetupScreen: React.FC<any> = (props) => {\n  const { onNavigate } = props || {};\n  return (`);
}

fs.writeFileSync('src/screens/SecuritySetupScreen.tsx', before + after);
