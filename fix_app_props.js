import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/currentUser=\{currentUser\}\s*currentUser=\{currentUser\}/g, "currentUser={currentUser}\n            currentUserId={currentUser?.uid || ''}");
fs.writeFileSync('src/App.tsx', content);
