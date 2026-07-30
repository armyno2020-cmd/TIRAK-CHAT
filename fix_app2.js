import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/<SecuritySetupScreen\s+onNavigate={navigateTo}/g, "<SecuritySetupScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<ContactSyncScreen\s+onNavigate={navigateTo}/g, "<ContactSyncScreen activeLanguage={activeLanguage} currentUser={currentUser} onNavigate={navigateTo}");
content = content.replace(/<AddFriendScreen\s+onNavigate={navigateTo}/g, "<AddFriendScreen currentUser={currentUser} onNavigate={navigateTo}");
content = content.replace(/<ChatListScreen\s+chats={chatRooms}/g, "<ChatListScreen activeLanguage={activeLanguage} chats={chatRooms}");
content = content.replace(/<ChatDetailScreen\s+chatRoom={activeChatRoom}/g, "<ChatDetailScreen activeLanguage={activeLanguage} currentUser={currentUser} chatRoom={activeChatRoom}");
content = content.replace(/<GroupInfoScreen\s+chatRoom={activeChatRoom}/g, "<GroupInfoScreen activeLanguage={activeLanguage} chatRoom={activeChatRoom}");
content = content.replace(/<CallScreen\s+peerName={activeCall.peerName}/g, "<CallScreen activeLanguage={activeLanguage} currentUser={currentUser} peerName={activeCall.peerName}");
content = content.replace(/<StoriesScreen\s+onNavigate={navigateTo}/g, "<StoriesScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<NotificationSettingsScreen\s+onNavigate={navigateTo}/g, "<NotificationSettingsScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<PrivacySettingsScreen\s+onNavigate={navigateTo}/g, "<PrivacySettingsScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<BackupScreen\s+onNavigate={navigateTo}/g, "<BackupScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<HelpScreen\s+onNavigate={navigateTo}/g, "<HelpScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<ArchitectureDiagramsScreen\s+onNavigate={navigateTo}/g, "<ArchitectureDiagramsScreen activeLanguage={activeLanguage} onNavigate={navigateTo}");
content = content.replace(/<BottomNavBar\s+activeScreen={currentScreen}/g, "<BottomNavBar activeLanguage={activeLanguage} activeScreen={currentScreen}");

fs.writeFileSync('src/App.tsx', content);
