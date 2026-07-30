import fs from 'fs';

let content = fs.readFileSync('src/screens/SecuritySetupScreen.tsx', 'utf8');
content = content.replace('Backspace', 'Delete');
content = content.replace('<Backspace', '<Delete');
fs.writeFileSync('src/screens/SecuritySetupScreen.tsx', content);
