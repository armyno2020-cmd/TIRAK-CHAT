import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /const handleAcceptIncomingCall = async \(\) => {[^]*?setActiveCallSessionId\(incomingCall.id\);[^]*?setActiveCall\({[^]*?peerName: incomingCall.callerName,[^]*?peerAvatar: incomingCall.callerAvatar,[^]*?type: incomingCall.type[^]*?}\);/g,
  `const handleAcceptIncomingCall = async () => {
    if (!incomingCall) return;
    
    let resolvedName = incomingCall.callerName;
    let resolvedAvatar = incomingCall.callerAvatar;
    const room = chatRooms.find(r => r.id === incomingCall.receiverId);
    if (room && room.type === 'group') {
      resolvedName = room.name;
      resolvedAvatar = room.avatarUrl;
    }

    await FirebaseService.acceptCall(incomingCall.id);
    setActiveCallSessionId(incomingCall.id);
    setActiveCall({
      peerName: resolvedName,
      peerAvatar: resolvedAvatar,
      type: incomingCall.type
    });`
);

content = content.replace(
  /<IncomingCallModal\s+call={incomingCall}\s+onAccept={handleAcceptIncomingCall}\s+onReject={handleRejectIncomingCall}\s+\/>/g,
  `{(() => {
        let displayCall = incomingCall;
        if (incomingCall) {
          const room = chatRooms.find(r => r.id === incomingCall.receiverId);
          if (room && room.type === 'group') {
             displayCall = { ...incomingCall, callerName: room.name, callerAvatar: room.avatarUrl };
          }
        }
        return (
          <IncomingCallModal
            call={displayCall}
            onAccept={handleAcceptIncomingCall}
            onReject={handleRejectIncomingCall}
          />
        );
      })()}`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed incoming call display');
