import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// Add currentUser: UserProfile; to ChatDetailScreenProps
content = content.replace(
  /currentUserId: string;/,
  "currentUserId: string;\n  currentUser: UserProfile;"
);

// Add currentUser to destructuring
content = content.replace(
  /currentUserId,/,
  "currentUserId,\n  currentUser,"
);

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
console.log('ChatDetailScreenProps fixed');
