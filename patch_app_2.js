import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace currentUserId with currentUser where it expects an object
content = content.replace(/currentUserId=\{currentUser\.uid\}/g, (match, offset) => {
  // Check the line context
  const pre = content.substring(Math.max(0, offset - 100), offset);
  if (pre.includes('<ProfileSetupScreen') || 
      pre.includes('<LanguageScreen') || 
      pre.includes('<ContactSyncScreen') || 
      pre.includes('<AddFriendScreen') || 
      pre.includes('<CreateGroupScreen') || 
      pre.includes('<CallScreen') || 
      pre.includes('<AccountScreen') || 
      pre.includes('<MyQRCodeScreen') || 
      pre.includes('<QRScannerScreen')) {
    return 'currentUser={currentUser}';
  }
  return match;
});

content = content.replace(/<ChatDetailScreen([^]*?)currentUserId=\{currentUser\.uid\}/, '<ChatDetailScreen$1currentUserId={currentUser.uid}\n            currentUser={currentUser}');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated currentUserId to currentUser');
