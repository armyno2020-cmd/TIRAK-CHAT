import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const callId = await FirebaseService.createCallSession\({[^]*?}\);/g,
  `const isGroupCall = chatRooms.some(r => r.id === peerId);
    const resolvedChatId = isGroupCall ? peerId : activeChatRoom?.id;

    const callId = await FirebaseService.createCallSession({
      callerId: currentUser.uid,
      callerName: currentUser.displayName,
      callerAvatar: currentUser.photoURL,
      receiverId: peerId,
      receiverName: peerName,
      receiverAvatar: avatar,
      chatId: resolvedChatId,
      type: type
    });`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed handleStartCall');
