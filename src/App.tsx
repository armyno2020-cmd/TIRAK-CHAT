// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ScreenId,
  Language,
  ChatRoom,
  ChatMessage,
  UserProfile,
  SecuritySettings,
} from "./types";
import { E2EEService } from "./services/encryption";
import { FirebaseService, CallSession } from "./services/firebaseService";
import { NotificationService } from "./services/notificationService";
import { initGlobalHaptics } from "./utils/haptics";
import { requestNotificationPermission } from "./config/firebase";

// Components
import { NavigationHeader } from "./components/NavigationHeader";
import { BottomNavBar } from "./components/BottomNavBar";
import { LanguageSelectorModal } from "./components/LanguageSelectorModal";
import { IncomingCallModal } from "./components/IncomingCallModal";

// Screens
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { LanguageScreen } from "./screens/LanguageScreen";
import { PrivacyIntroScreen } from "./screens/PrivacyIntroScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { OTPVerificationScreen } from "./screens/OTPVerificationScreen";
import { ProfileSetupScreen } from "./screens/ProfileSetupScreen";
import { PermissionsScreen } from "./screens/PermissionsScreen";
import { SecuritySetupScreen } from "./screens/SecuritySetupScreen";
import { ContactSyncScreen } from "./screens/ContactSyncScreen";
import { ChatListScreen } from "./screens/ChatListScreen";
import { ChatDetailScreen } from "./screens/ChatDetailScreen";
import { MediaViewerModal } from "./screens/MediaViewerModal";
import { GroupInfoScreen } from "./screens/GroupInfoScreen";
import { CreateGroupScreen } from "./screens/CreateGroupScreen";
import { CallScreen } from "./screens/CallScreen";
import { CallHistoryScreen } from "./screens/CallHistoryScreen";
import { StoriesScreen } from "./screens/StoriesScreen";
import { CreateStoryScreen } from "./screens/CreateStoryScreen";
import { NotificationSettingsScreen } from "./screens/NotificationSettingsScreen";
import { PrivacySettingsScreen } from "./screens/PrivacySettingsScreen";
import { BackupScreen } from "./screens/BackupScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { HelpScreen } from "./screens/HelpScreen";
import { ArchitectureDiagramsScreen } from "./screens/ArchitectureDiagramsScreen";
import { MyQRCodeScreen } from "./screens/MyQRCodeScreen";
import { DataUsageScreen } from "./screens/DataUsageScreen";
import { ReportFeedbackScreen } from "./screens/ReportFeedbackScreen";
import { LinkedDevicesScreen } from "./screens/LinkedDevicesScreen";
import { StarredMessagesScreen } from "./screens/StarredMessagesScreen";
import { QRScannerScreen } from "./screens/QRScannerScreen";

import { AddFriendScreen } from "./screens/AddFriendScreen";
import { TwoStepVerificationScreen } from "./screens/TwoStepVerificationScreen";
import { ArchivedChatsScreen } from "./screens/ArchivedChatsScreen";
import { BlockedContactsScreen } from "./screens/BlockedContactsScreen";
import { FriendProfileScreen } from "./screens/FriendProfileScreen";
import { OfficialAccountScreen } from "./screens/OfficialAccountScreen";
import { GlobalSearchScreen } from "./screens/GlobalSearchScreen";
import { DesktopChatEmptyState } from "./components/DesktopChatEmptyState";
import { DesktopNavigationRail } from "./components/DesktopNavigationRail";


export default function App() {
  // Navigation & Flow State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("chat_list");
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [activeLanguage, setActiveLanguage] = useState<Language>("th");
  const [isLanguageModalOpen, setIsLanguageModalOpen] =
    useState<boolean>(false);

  // Active User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userPhone, setUserPhone] = useState<string>("");
  const [userCountryCode, setUserCountryCode] = useState<string>("+66");

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    pin: "",
    pinCode: "",
    biometricEnabled: false,
    screenLockEnabled: false,
    readReceiptsEnabled: true,
    typingIndicatorsEnabled: true,
    disappearingTimerDefault: 0,
  });

  // Real-time Firestore Chat State
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeChatRoom, setActiveChatRoom] = useState<ChatRoom | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(
    {},
  );

  // Computed: Total unread message count across all chat rooms (for BottomNavBar badge)
  const totalUnread = chatRooms.reduce((sum, r) => sum + (r.unreadCount || 0), 0);

  // Real-time Call Signaling State
  const [incomingCall, setIncomingCall] = useState<CallSession | null>(null);
  const [activeCallSessionId, setActiveCallSessionId] = useState<string | null>(
    null,
  );
  const [activeCall, setActiveCall] = useState<{
    peerName: string;
    peerAvatar: string;
    type: "voice" | "video";
  } | null>(null);

  // View-Once Media Modal State
  const [viewOnceMediaUrl, setViewOnceMediaUrl] = useState<string | null>(null);

  // Dedicated Authentication State Handler
  // Observes Firebase Auth state changes and synchronizes the user profile with the Firestore 'users' collection upon login
  const handleAuthStateChanged = useCallback(async (profile: UserProfile | null) => {
    if (profile) {
      setCurrentUser(profile);
      setIsOnboarded(true);
      if (profile.securitySettings) {
        setSecuritySettings(profile.securitySettings);
      }
      // Synchronize and persist updated user profile in Firestore 'users' collection
      await FirebaseService.saveUserProfile(profile);

      setCurrentScreen((prev) => {
        if (
          [
            "welcome",
            "register",
            "privacy_intro",
            "otp_verification",
            "profile_setup",
          ].includes(prev)
        ) {
          return "chat_list";
        }
        return prev;
      });
    } else {
      setCurrentUser(null);
      setIsOnboarded(false);
      setCurrentScreen("welcome");
    }
  }, []);

  // 0. Ensure Firebase Auth is initialized and subscribe to Auth Changes
  useEffect(() => {
    const cleanupHaptics = initGlobalHaptics();
    FirebaseService.ensureFirebaseAuth();
    NotificationService.requestPermission();

    const unsubscribeAuth = FirebaseService.subscribeToAuthChanges(handleAuthStateChanged);

    return () => {
      unsubscribeAuth();
      cleanupHaptics();
    };
  }, [handleAuthStateChanged]);

  // 1. Subscribe to Firestore Chat Rooms in real time
  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsubscribe = FirebaseService.subscribeToChatRooms(
      currentUser.uid,
      (rooms) => {
        setChatRooms(rooms);

        // Notification Logic
        if (rooms.length > 0) {
          const latestRoom = rooms.reduce(
            (prev, curr) =>
              (curr.lastMessageAt || 0) > (prev.lastMessageAt || 0)
                ? curr
                : prev,
            rooms[0],
          );
          if (
            latestRoom.lastMessageAt &&
            latestRoom.lastMessageSenderId !== currentUser.uid &&
            latestRoom.id !== activeChatRoom?.id
          ) {
            NotificationService.notifyNewMessage(
              latestRoom.name,
              latestRoom.lastMessage || "New message received",
              latestRoom.lastMessageAt,
            );
          }
        }

        if (rooms.length > 0 && !activeChatRoom) {
          setActiveChatRoom(rooms[0]);
        }
      },
    );
    return () => unsubscribe();
  }, [currentUser?.uid, activeChatRoom?.id]);

  // 2. Subscribe to Firestore Messages for active chat room in real time
  useEffect(() => {
    if (!activeChatRoom) return;

    const unsubscribe = FirebaseService.subscribeToMessages(
      activeChatRoom.id,
      (msgs) => {
        setMessagesMap((prev) => ({
          ...prev,
          [activeChatRoom.id]: msgs,
        }));
      },
    );

    return () => unsubscribe();
  }, [activeChatRoom?.id]);

  // 3. Subscribe to Incoming Calls in real time (Firestore `/calls`)
  useEffect(() => {
    if (!currentUser?.uid) return;
    const groupIds = chatRooms.map((r) => r.id);
    const unsubscribe = FirebaseService.subscribeToIncomingCalls(
      currentUser.uid,
      groupIds,
      (call) => {
        setIncomingCall(call);
      },
    );
    return () => unsubscribe();
  }, [currentUser?.uid, chatRooms]);

  // 4. Subscribe to active call status changes (e.g. peer ended or rejected)
  useEffect(() => {
    if (!activeCallSessionId) return;

    const unsubscribe = FirebaseService.subscribeToActiveCall(
      activeCallSessionId,
      (call) => {
        if (call && (call.status === "ended" || call.status === "rejected")) {
          setActiveCall(null);
          setActiveCallSessionId(null);
          if (currentScreen === "call_active") {
            navigateTo("chat_list");
          }
        }
      },
    );

    return () => unsubscribe();
  }, [activeCallSessionId, currentScreen]);

  // 5. Setup Realtime Database Presence Tracking with onDisconnect
  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsubscribe = FirebaseService.setupPresenceTracking(currentUser.uid);
    return () => unsubscribe();
  }, [currentUser?.uid, chatRooms]);

  // 6. Request FCM Token and persist to Firestore for push notifications
  useEffect(() => {
    if (!currentUser?.uid) return;
    const saveFcm = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          await FirebaseService.saveFcmToken(currentUser.uid, token);
        }
      } catch (err) {
        console.warn("FCM token save warning:", err);
      }
    };
    saveFcm();
  }, [currentUser?.uid]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await FirebaseService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsOnboarded(false);
    setCurrentUser(null);
    setCurrentScreen("welcome");
  };

  // Profile Update Handler
  const handleUpdateUserProfile = async (updatedData: any) => {
    if (!currentUser) return;
    const merged = { ...currentUser, ...updatedData };
    setCurrentUser(merged);
    await FirebaseService.saveUserProfile(merged);
  };

  // Navigation Helper
  const navigateTo = (screen: ScreenId) => {
    if (screen === "welcome") {
      handleLogout();
      return;
    }
    // Registered members must not see registration/sign-up pages
    if (
      isOnboarded &&
      currentUser &&
      ["register", "privacy_intro", "otp_verification"].includes(
        screen,
      )
    ) {
      setCurrentScreen("chat_list");
      return;
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Google / Gmail Sign In Handler with profile synchronization
  const handleGoogleSignIn = async () => {
    try {
      const res = await FirebaseService.signInWithGoogle();
      if (res && res.user) {
        // Synchronize local currentUser state with Google user profile
        setCurrentUser(res.user);
        if (res.user.securitySettings) {
          setSecuritySettings(res.user.securitySettings);
        }

        // Persist profile synchronization in Firestore 'users' collection
        await FirebaseService.saveUserProfile(res.user);

        if (res.isExisting) {
          setIsOnboarded(true);
          setCurrentScreen("chat_list");
        } else {
          setIsOnboarded(false);
          setCurrentScreen("profile_setup");
        }
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
    }
  };

  // Existing User Handler (Prevent Duplicate Registration & Log In Directly)
  const handleExistingUserFound = (existingUser: UserProfile) => {
    setCurrentUser(existingUser);
    setIsOnboarded(true);
    FirebaseService.saveUserProfile(existingUser);
    setCurrentScreen("chat_list");
  };

  // Onboarding Finish Flow
  const handleFinishOnboarding = () => {
    setIsOnboarded(true);
    // Save user profile to Firestore
    FirebaseService.saveUserProfile(currentUser);
    navigateTo("chat_list");
  };

  // Chat Selection
  const handleSelectChat = (room: ChatRoom) => {
    setActiveChatRoom(room);
    navigateTo("chat_detail");
  };

  const handleTogglePinMessage = async (
    messageId: string,
    isPinned: boolean,
  ) => {
    if (!activeChatRoom) return;
    await FirebaseService.togglePinMessage(
      activeChatRoom.id,
      messageId,
      isPinned,
    );
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!activeChatRoom) return;
    await FirebaseService.deleteMessage(activeChatRoom.id, messageId);
  };

  const handleAddReaction = async (messageId: string, emoji: string) => {
    if (!activeChatRoom) return;
    await FirebaseService.addReaction(
      activeChatRoom.id,
      messageId,
      currentUser.uid,
      emoji,
    );
  };

  // Send Message Flow with E2EE & Firestore Sync
  const handleSendMessage = async (
    chatId: string,
    text: string,
    type: any = "text",
    replyToId?: string,
    isViewOnce?: boolean,
    extra?: any,
  ) => {
    if (!chatId) return;

    // Encrypt payload via E2EE
    const encryptedText = await E2EEService.encryptMessage(text);

    const newMessage: Omit<ChatMessage, "id"> = {
      chatId: chatId,
      senderId: currentUser.uid,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.photoURL,
      content: text,
      encryptedContent: encryptedText,
      contentType: type,
      mediaUrl: extra?.mediaUrl,
      fileName: extra?.fileName,
      fileSize: extra?.fileSize,
      latitude: extra?.latitude,
      longitude: extra?.longitude,
      locationAddress: extra?.locationAddress,
      createdAt: Date.now(),
      isDeleted: false,
      isEdited: false,
      replyToId: replyToId,
      viewOnce: isViewOnce,
    };

    // Save directly to Firestore messages subcollection
    await FirebaseService.sendMessage(chatId, newMessage);
  };

  // Mark message as read considering user securitySettings.readReceiptsEnabled
  const handleMarkMessageAsRead = async (chatId: string, messageId: string) => {
    if (!securitySettings.readReceiptsEnabled) return;

    setMessagesMap((prev) => {
      const roomMsgs = prev[chatId] || [];
      let updated = false;
      const nextMsgs = roomMsgs.map((m) => {
        if (m.id === messageId) {
          const readBy = m.readBy || [];
          if (!readBy.includes(currentUser.uid)) {
            updated = true;
            return { ...m, readBy: [...readBy, currentUser.uid] };
          }
        }
        return m;
      });
      if (!updated) return prev;
      return { ...prev, [chatId]: nextMsgs };
    });

    try {
      await FirebaseService.markMessageAsRead(chatId, messageId, currentUser.uid);
    } catch (err) {
      console.warn("markMessageAsRead sync error:", err);
    }
  };

  // Group Creation with Firestore Sync
  const handleCreateGroup = async (
    name: string,
    description: string,
    memberIds: string[],
  ) => {
    const newRoom: ChatRoom = {
      id: "chat_group_" + Date.now(),
      type: "group",
      name: name,
      description: description,
      avatarUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200",
      members: [currentUser.uid, ...memberIds],
      ownerId: currentUser.uid,
      adminIds: [currentUser.uid],
      unreadCount: 0,
      isPinned: true,
      lastMessage: "Group created. Messages are End-to-End Encrypted.",
      lastMessageAt: Date.now(),
      createdAt: Date.now(),
    };

    await FirebaseService.createChatRoom(newRoom);
    setActiveChatRoom(newRoom);
    navigateTo("chat_detail");
  };

  // Start Call Flow with Firestore Signaling
  const handleStartCall = async (
    peerId: string,
    peerName: string,
    avatar: string,
    type: "voice" | "video",
  ) => {
    if (!peerId) {
      console.error("No peerId provided for call");
      return;
    }

    const isGroupCall = chatRooms.some((r) => r.id === peerId);
    const resolvedChatId = isGroupCall ? peerId : activeChatRoom?.id;

    const callId = await FirebaseService.createCallSession({
      callerId: currentUser.uid,
      callerName: currentUser.displayName,
      callerAvatar: currentUser.photoURL,
      receiverId: peerId,
      receiverName: peerName,
      receiverAvatar: avatar,
      chatId: resolvedChatId,
      type: type,
    });

    setActiveCallSessionId(callId);
    setActiveCall({ peerName, peerAvatar: avatar, type });
    navigateTo("call_active");
  };

  // Callee Accepts Call
  const handleAcceptIncomingCall = async () => {
    if (!incomingCall) return;

    let resolvedName = incomingCall.callerName;
    let resolvedAvatar = incomingCall.callerAvatar;
    const room = chatRooms.find((r) => r.id === incomingCall.receiverId);
    if (room && room.type === "group") {
      resolvedName = room.name;
      resolvedAvatar = room.avatarUrl;
    }

    await FirebaseService.acceptCall(incomingCall.id);
    setActiveCallSessionId(incomingCall.id);
    setActiveCall({
      peerName: resolvedName,
      peerAvatar: resolvedAvatar,
      type: incomingCall.type,
    });
    setIncomingCall(null);
    navigateTo("call_active");
  };

  // Callee Rejects Call
  const handleRejectIncomingCall = async () => {
    if (!incomingCall) return;

    await FirebaseService.rejectCall(incomingCall.id);
    setIncomingCall(null);
  };

  // End Active Call
  const handleEndCall = async () => {
    if (activeCallSessionId) {
      if (activeChatRoom?.type !== "group") {
        await FirebaseService.endCall(activeCallSessionId, 35);
      }
    }
    setActiveCall(null);
    setActiveCallSessionId(null);
    navigateTo("chat_list");
  };

  const isAuthScreen = [
    "welcome",
    "language_select",
    "privacy_intro",
    "register",
    "otp_verification",
    "profile_setup",
    "permissions",
    "security_setup",
    "contact_sync",
  ].includes(currentScreen);

  // Determine if bottom navigation bar should be visible on mobile
  const showBottomNav = isOnboarded && !isAuthScreen;

  return (
    <div className="h-screen w-screen text-[#1b1b1d] font-th-body selection:bg-rose-200 antialiased relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="mesh-bg pointer-events-none">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {isAuthScreen ? (
        <main className="w-full h-full relative">
          <AnimatePresence>
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full overflow-y-auto"
            >
              {currentScreen === "welcome" && (
                <WelcomeScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                  onGoogleSignIn={handleGoogleSignIn}
                />
              )}
              {currentScreen === "language_select" && (
                <LanguageScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onSelectLanguage={(lang) => {
                    setActiveLanguage(lang);
                    if (isOnboarded) navigateTo("settings_account");
                    else navigateTo("welcome");
                  }}
                  onNavigate={navigateTo}
                  isOnboarded={isOnboarded}
                />
              )}
              {currentScreen === "privacy_intro" && (
                <PrivacyIntroScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                />
              )}
              {currentScreen === "register" && (
                <RegisterScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                  onGoogleSignIn={handleGoogleSignIn}
                  onExistingUserFound={handleExistingUserFound}
                  onSavePhoneAndUsername={(
                    phone,
                    countryCode,
                    username,
                    name,
                  ) => {
                    setUserPhone(phone);
                    setUserCountryCode(countryCode);
                    setCurrentUser((prev) => ({
                      ...prev,
                      displayName: name || prev.displayName,
                      username: username || prev.username,
                    }));
                  }}
                />
              )}
              {currentScreen === "otp_verification" && (
                <OTPVerificationScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  phoneNumber={userPhone}
                  countryCode={userCountryCode}
                  onNavigate={navigateTo}
                />
              )}
              {currentScreen === "profile_setup" && (
                <ProfileSetupScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                />
              )}
              {currentScreen === "permissions" && (
                <PermissionsScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                />
              )}
              {currentScreen === "security_setup" && (
                <SecuritySetupScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                  onSavePin={(pin, bio) => {
                    const newSet = {
                      ...securitySettings,
                      pinCode: pin,
                      biometricEnabled: bio,
                    };
                    setSecuritySettings(newSet);
                    if (currentUser)
                      FirebaseService.saveUserProfile({
                        ...currentUser,
                        securitySettings: newSet,
                      });
                  }}
                />
              )}
              {currentScreen === "contact_sync" && (
                <ContactSyncScreen
                  activeLanguage={activeLanguage}
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                  onCompleteOnboarding={handleFinishOnboarding}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden w-full h-full relative">
          {/* DESKTOP NAVIGATION RAIL */}
          <DesktopNavigationRail
            currentScreen={currentScreen}
            activeLanguage={activeLanguage}
            currentUser={currentUser}
            onNavigate={navigateTo}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            unreadCount={totalUnread}
          />

          {/* LEFT SIDEBAR CHAT LIST (Always on desktop, on mobile visible when in chat_list) */}
          <div
            className={`w-full md:w-[320px] lg:w-[360px] xl:w-[400px] shrink-0 border-r border-white/60 glass-surface flex flex-col h-full z-20 ${
              currentScreen === "chat_list" ? "flex" : "hidden md:flex"
            }`}
          >
            <ChatListScreen
              activeLanguage={activeLanguage}
              currentUser={currentUser}
              chats={chatRooms}
              onSelectChat={(chatId) => {
                const room = chatRooms.find((r) => r.id === chatId);
                if (room) handleSelectChat(room);
              }}
              onNavigate={navigateTo}
              onOpenNewGroup={() => navigateTo("create_group")}
            />
          </div>

          {/* RIGHT MAIN WORKSPACE AREA */}
          <div
            className={`flex-1 flex flex-col h-full overflow-hidden bg-white/20 relative z-10 ${
              currentScreen === "chat_list" ? "hidden md:flex" : "flex"
            }`}
          >
            {currentScreen === "chat_detail" && activeChatRoom ? (
              <ChatDetailScreen
                activeLanguage={activeLanguage}
                currentUser={currentUser}
                chatRoom={activeChatRoom}
                messages={messagesMap[activeChatRoom.id] || []}
                readReceiptsEnabled={securitySettings.readReceiptsEnabled}
                onNavigate={navigateTo}
                onSendMessage={handleSendMessage}
                onTogglePinMessage={handleTogglePinMessage}
                onDeleteMessage={handleDeleteMessage}
                onAddReaction={handleAddReaction}
                onMarkMessageAsRead={handleMarkMessageAsRead}
                onOpenGroupInfo={() => navigateTo("group_info")}
                onOpenMediaViewer={(url) => setViewOnceMediaUrl(url)}
                onStartCall={(peerUid, type) =>
                  handleStartCall(
                    peerUid,
                    activeChatRoom.name,
                    activeChatRoom.avatarUrl,
                    type as "voice" | "video",
                  )
                }
              />
            ) : currentScreen === "chat_list" ? (
              <DesktopChatEmptyState onNavigate={navigateTo} />
            ) : (
              <div className="h-full w-full overflow-hidden flex flex-col relative bg-transparent">
                <AnimatePresence>
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 w-full h-full overflow-y-auto"
                  >
                    {currentScreen === "group_info" && activeChatRoom && (
                      <GroupInfoScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        chatRoom={activeChatRoom}
                        onNavigate={navigateTo}
                        onStartCall={(type) =>
                          handleStartCall(
                            activeChatRoom.id,
                            activeChatRoom.name,
                            activeChatRoom.avatarUrl,
                            type,
                          )
                        }
                      />
                    )}
                    {currentScreen === "create_group" && (
                      <CreateGroupScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                        onCreateGroup={handleCreateGroup}
                      />
                    )}
                    {currentScreen === "add_friend" && (
                      <AddFriendScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "call_history" && (
                      <CallHistoryScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                        onStartCall={(peerId, name, avatar, type) =>
                          handleStartCall(peerId, name, avatar, type)
                        }
                      />
                    )}
                    {currentScreen === "stories_feed" && (
                      <StoriesScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "create_story" && (
                      <CreateStoryScreen
                        onNavigate={navigateTo}
                        currentUser={currentUser}
                      />
                    )}
                    {currentScreen === "settings_notifications" && (
                      <NotificationSettingsScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "settings_privacy" && (
                      <PrivacySettingsScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                        securitySettings={securitySettings}
                        onUpdateSecuritySettings={(newSet) => {
                          const updated = { ...securitySettings, ...newSet };
                          setSecuritySettings(updated);
                          if (currentUser)
                            FirebaseService.saveUserProfile({
                              ...currentUser,
                              securitySettings: updated,
                            });
                        }}
                      />
                    )}
                    {currentScreen === "settings_backup" && (
                      <BackupScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "settings_account" && (
                      <AccountScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                        onLogout={handleLogout}
                      />
                    )}
                    {currentScreen === "profile_setup" && (
                      <ProfileSetupScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                        onUpdateUser={handleUpdateUserProfile}
                      />
                    )}
                    {currentScreen === "settings_help" && (
                      <HelpScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "architecture_diagrams" && (
                      <ArchitectureDiagramsScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "starred_messages" && (
                      <StarredMessagesScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "linked_devices" && (
                      <LinkedDevicesScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "report_feedback" && (
                      <ReportFeedbackScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "data_usage" && (
                      <DataUsageScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "my_qrcode" && currentUser && (
                      <MyQRCodeScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "qr_scanner" && currentUser && (
                      <QRScannerScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "two_step_verification" && (
                      <TwoStepVerificationScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "archived_chats" && (
                      <ArchivedChatsScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        chats={chatRooms}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "blocked_contacts" && (
                      <BlockedContactsScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "friend_profile" && (
                      <FriendProfileScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "official_account" && (
                      <OfficialAccountScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        onNavigate={navigateTo}
                      />
                    )}
                    {currentScreen === "global_search" && (
                      <GlobalSearchScreen
                        activeLanguage={activeLanguage}
                        currentUser={currentUser}
                        chats={chatRooms}
                        messagesMap={messagesMap}
                        onNavigate={navigateTo}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Call Modal Overlay */}
      {currentScreen === "call_active" &&
        activeCall &&
        activeCallSessionId &&
        currentUser && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
            <CallScreen
              activeLanguage={activeLanguage}
              currentUser={currentUser}
              peerName={activeCall.peerName}
              peerAvatar={activeCall.peerAvatar}
              callType={activeCall.type}
              callId={activeCallSessionId}
              onNavigate={navigateTo}
              onEndCall={handleEndCall}
            />
          </div>
        )}

      {/* Persistent Bottom Bar for Mobile View */}
      {showBottomNav && (
        <div className="block md:hidden shrink-0 z-30 glass-surface">
          <BottomNavBar
            activeLanguage={activeLanguage}
            activeScreen={currentScreen}
            onNavigate={navigateTo}
            unreadCount={totalUnread}
          />
        </div>
      )}

      {/* Language Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        currentLanguage={activeLanguage}
        onSelectLanguage={(lang) => setActiveLanguage(lang)}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      {/* Media Viewer Modal */}
      {viewOnceMediaUrl && (
        <MediaViewerModal
          isOpen={!!viewOnceMediaUrl}
          mediaUrl={viewOnceMediaUrl}
          onClose={() => setViewOnceMediaUrl(null)}
        />
      )}

      {/* Incoming Call Real-Time Signaling Modal */}
      {(() => {
        let displayCall = incomingCall;
        if (incomingCall) {
          const room = chatRooms.find((r) => r.id === incomingCall.receiverId);
          if (room && room.type === "group") {
            displayCall = {
              ...incomingCall,
              callerName: room.name,
              callerAvatar: room.avatarUrl,
            };
          }
        }
        return (
          <IncomingCallModal
            call={displayCall}
            onAccept={handleAcceptIncomingCall}
            onReject={handleRejectIncomingCall}
          />
        );
      })()}
    </div>
  );
}
