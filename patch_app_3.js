import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace both currentUserId and currentUser with just the one they need.
content = content.replace(/<LanguageScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<ProfileSetupScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<ContactSyncScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<AddFriendScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<CreateGroupScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<CallScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<AccountScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<MyQRCodeScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<QRScannerScreen[^]*?\/>/g, (match) => match.replace(/currentUserId=\{currentUser\.uid\}\s*/, ''));
content = content.replace(/<ChatListScreen[^]*?\/>/g, (match) => match.replace(/currentUser=\{currentUser\}\s*/, ''));

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx cleanup complete');
