import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `
  const handleEndCall = async () => {
    if (activeCallSessionId) {
      if (activeChatRoom?.type !== 'group') {
        await FirebaseService.endCall(activeCallSessionId, 35);
      }
    }
    setActiveCall(null);
    setActiveCallSessionId(null);
    navigateTo('chat_list');
  };
`;

content = content.replace(/const handleEndCall = async \(\) => \{[\s\S]*?navigateTo\('chat_list'\);\n  \};/, replacement.trim());

fs.writeFileSync('src/App.tsx', content);
