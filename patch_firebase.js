import fs from 'fs';

let content = fs.readFileSync('src/services/firebaseService.ts', 'utf8');

content = content.replace(
  /public static subscribeToIncomingCalls\(\s*userId: string,\s*callback/g,
  'public static subscribeToIncomingCalls(\n    userId: string,\n    groupIds: string[],\n    callback'
);

content = content.replace(
  /where\('receiverId', '==', userId\),/g,
  "where('receiverId', 'in', [userId, ...groupIds.slice(0, 29)]),"
);

fs.writeFileSync('src/services/firebaseService.ts', content);
console.log('Fixed incoming calls query');
