import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// Replace currentUserId destructured with nothing
content = content.replace(/currentUserId,\s*/, '');

// Replace currentUserId usages with currentUser.uid
content = content.replace(/currentUserId/g, 'currentUser.uid');

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
console.log('Fixed ChatDetailScreen currentUserId');
