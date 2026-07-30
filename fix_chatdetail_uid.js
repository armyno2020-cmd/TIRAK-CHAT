import fs from 'fs';

let content = fs.readFileSync('src/screens/ChatDetailScreen.tsx', 'utf8');

// Remove currentUserId: string; from Props
content = content.replace(/currentUserId: string;\n/, '');

// Remove currentUserId, from destructuring
content = content.replace(/currentUserId,\n/, '');

// Add const currentUserId = currentUser?.uid;
content = content.replace(/const \[inputText, setInputText\] = useState\(''\);/, "const currentUserId = currentUser?.uid || '';\n  const [inputText, setInputText] = useState('');");

fs.writeFileSync('src/screens/ChatDetailScreen.tsx', content);
