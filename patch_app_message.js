import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  /isEdited: false/,
  "isEdited: false,\n      replyToId: replyToId,\n      viewOnce: isViewOnce"
);
fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx patched message');
