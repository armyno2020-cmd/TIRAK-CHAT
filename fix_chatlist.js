import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatListScreen.tsx', 'utf8');

// Replace currentUserId?: string; with currentUser?: UserProfile;
content = content.replace(/currentUserId\?: string;/, "currentUser?: any;");

// Replace currentUserId with currentUser
content = content.replace(/currentUserId\n/, "currentUser\n");

// Replace currentUserId usage
content = content.replace(/currentUserId/g, "currentUser?.uid");

fs.writeFileSync('src/screens/ChatListScreen.tsx', content);
