import fs from 'fs';

let content = fs.readFileSync('src/screens/AccountScreen.tsx', 'utf8');
content = content.replace(/,\s*Language\s*as\s*GlobeIcon\s*}/, "}");
fs.writeFileSync('src/screens/AccountScreen.tsx', content);
console.log('AccountScreen fixed');
