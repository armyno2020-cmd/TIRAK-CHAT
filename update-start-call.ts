import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `
  const handleStartCall = async (peerName: string, avatar: string, type: 'voice' | 'video') => {
    if (activeChatRoom && activeChatRoom.type === 'group') {
      // Group Call: use chatId as room name
      setActiveCall({
        peerName: activeChatRoom.name,
        peerAvatar: activeChatRoom.avatarUrl,
        type
      });
      setActiveCallSessionId(activeChatRoom.id);
      setCurrentScreen('call_active');
      return;
    }

    // Direct Call
    let receiverId = 'user_elena';
    if (activeChatRoom && activeChatRoom.type === 'direct') {
      const otherMember = activeChatRoom.members.find(m => m !== currentUser.uid);
      if (otherMember) receiverId = otherMember;
    }

    const callId = await FirebaseService.createCallSession({
      callerId: currentUser.uid,
      callerName: currentUser.displayName,
      callerAvatar: currentUser.photoURL,
      receiverId: receiverId,
      receiverName: peerName,
      receiverAvatar: avatar,
      chatId: activeChatRoom?.id,
      type
    });
    
    setActiveCall({ peerName, peerAvatar: avatar, type });
    setActiveCallSessionId(callId);
    setCurrentScreen('call_active');
  };
`;

content = content.replace(/const handleStartCall = async \(peerName: string, avatar: string, type: 'voice' \| 'video'\) => \{[\s\S]*?setCurrentScreen\('call_active'\);\n  \};/, replacement.trim());

fs.writeFileSync('src/App.tsx', content);
