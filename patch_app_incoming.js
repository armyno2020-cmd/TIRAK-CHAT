import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const unsubscribe = FirebaseService\.subscribeToIncomingCalls\(currentUser.uid, \(call\) => {/g,
  `const groupIds = chatRooms.map(r => r.id);
    const unsubscribe = FirebaseService.subscribeToIncomingCalls(currentUser.uid, groupIds, (call) => {`
);

content = content.replace(
  /}, \[currentUser\?\.uid\]\);/g,
  `}, [currentUser?.uid, chatRooms]);`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed incoming calls effect');
