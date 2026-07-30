import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// Fix `'text' | 'image' | 'voice_note'` strings that somehow leaked in
content = content.replace(/'text' \| 'image' \| 'voice_note'/g, "'voice_note'");
content = content.replace(/pinnedMessage\.type ==='voice_note'/g, "pinnedMessage.contentType === 'voice_note'");

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
