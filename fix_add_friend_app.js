import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /<AddFriendScreen\s*activeLanguage=\{activeLanguage\}\s*currentUser=\{currentUser\}\s*onNavigate=\{navigateTo\}\s*\/>/g,
  '<AddFriendScreen currentUser={currentUser} onNavigate={navigateTo} />'
);

fs.writeFileSync('src/App.tsx', content);
