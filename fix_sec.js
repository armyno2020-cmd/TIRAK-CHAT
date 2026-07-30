import fs from 'fs';
let sec = fs.readFileSync('src/screens/SecuritySetupScreen.tsx', 'utf8');

// Remove injected
sec = sec.replace(/export const SecuritySetupScreen: React\.FC<any> = \(props\) => \{\n  const \{ onNavigate \} = props \|\| \{\};\n/g, '');

// Rename ShieldSetupScreen to SecuritySetupScreen
sec = sec.replace(/ShieldSetupScreen/g, 'SecuritySetupScreen');

fs.writeFileSync('src/screens/SecuritySetupScreen.tsx', sec);
