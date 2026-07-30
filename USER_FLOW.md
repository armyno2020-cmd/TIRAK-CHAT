# Tirak Chat - User Flow & State Management

## Comprehensive User Flow Diagram

```mermaid
graph TD
    %% App Initialization
    Start((App Launch)) --> Init[Initialize Firebase & Local State]
    Init --> CheckAuth{Is User Authenticated?}
    
    %% Sign-up / Auth Flow
    CheckAuth -- No --> Welcome[Welcome Screen]
    Welcome --> Register[Register Screen]
    Register --> InputPhone[Input Phone Number]
    InputPhone --> RequestOTP[Request OTP via Firebase Auth]
    RequestOTP --> OTPVerif[OTP Verification Screen]
    OTPVerif --> VerifyOTP[Verify Code]
    VerifyOTP -- Success --> CheckProfile{Is Profile Setup?}
    VerifyOTP -- Failed --> OTPVerif
    
    %% Profile Setup Flow
    CheckProfile -- No --> ProfileSetup[Profile Setup Screen]
    ProfileSetup --> UploadAvatar[Upload Avatar/Photo]
    ProfileSetup --> InputName[Input Display Name]
    InputName --> SaveProfile[Save User Profile to Firestore]
    SaveProfile --> SyncContacts[Contact Sync Screen]
    SyncContacts --> CompleteOnboarding[Complete Onboarding State]
    CompleteOnboarding --> MainApp
    
    %% Main App Flow
    CheckAuth -- Yes --> CheckProfile
    CheckProfile -- Yes --> MainApp
    
    MainApp((Main Dashboard / Chat List))
    
    %% Adding Friends Flow
    MainApp --> AddFriendBtn[Click Add Friend]
    AddFriendBtn --> AddFriendScreen[Add Friend Screen]
    AddFriendScreen --> SearchMethod{Search Method}
    SearchMethod -- Phone/Username --> SearchQuery[Search Firestore 'users' collection]
    SearchMethod -- QR Code --> QRScanner[QR Scanner Screen]
    QRScanner --> DecodeQR[Decode User ID]
    DecodeQR --> SearchQuery
    SearchQuery -- Found --> ShowProfile[Show Friend Profile]
    SearchQuery -- Not Found --> ShowError[Show Error]
    ShowProfile --> AddFriendAction[Add to Subcollection & Update State]
    AddFriendAction --> MainApp
    
    %% Engaging in Chat
    MainApp --> SelectChat[Select Chat Room]
    SelectChat --> ChatDetail[Chat Detail Screen]
    ChatDetail --> SendText[Type & Send Text]
    ChatDetail --> SendVoice[Record & Send Voice Note]
    ChatDetail --> SendMedia[Upload & Send Image/Video]
    SendText --> UpdateFirestore[Update Firestore 'messages' & Update Room Last Message]
    UpdateFirestore --> RealtimeUpdate[Listener triggers UI update]
    
    %% Engaging in Calls
    ChatDetail --> StartVoiceCall[Click Voice Call]
    ChatDetail --> StartVideoCall[Click Video Call]
    StartVoiceCall --> CreateCallSession[Create Firestore Call Session]
    StartVideoCall --> CreateCallSession
    CreateCallSession --> CallScreen[Call Screen (LiveKit)]
    CallScreen --> ConnectLiveKit[Connect to LiveKit Room]
    ConnectLiveKit --> CallActive[Call Active]
    CallActive --> EndCall[End Call]
    EndCall --> UpdateCallStatus[Update Call History]
    UpdateCallStatus --> ChatDetail
```

## State Changes & Transitions

### 1. Authentication State (`currentUser`)
- **Initial State**: `null` (Loading state while checking Firebase Auth).
- **Transition**: Upon successful OTP verification, `currentUser` is populated with the Firebase `User` object.
- **Effect**: Routes user away from `welcome` and `register` screens towards `profile_setup` or `chat_list`.

### 2. Onboarding State (`isOnboarded`)
- **Initial State**: `false`.
- **Transition**: Becomes `true` after the user completes the `ProfileSetupScreen` and `ContactSyncScreen`.
- **Effect**: Grants access to the main application components (`chat_list`, `account`, `add_friend`).

### 3. Navigation State (`currentScreen`)
- **Initial State**: Derived based on Auth and Onboarding states (`welcome` if unauthenticated, `chat_list` if fully onboarded).
- **Transitions**: Controlled via the `navigateTo(screenId)` function. It maintains a stack or direct state replacement depending on the flow (e.g., `chat_list` -> `chat_detail` -> `call_screen`).

### 4. Active Chat State (`activeChatRoom`)
- **Initial State**: `null`.
- **Transition**: Set when a user clicks a chat item in the `ChatListScreen`.
- **Effect**: Renders the `ChatDetailScreen` and passes the room ID to fetch real-time messages.

### 5. Call State (`callSession`, `isCalling`)
- **Initial State**: `null` / `false`.
- **Transition**: Activated when a user initiates a call from `ChatDetailScreen` or `CallHistoryScreen`. Triggers Firebase Cloud Function or direct Firestore write to create a LiveKit room and signal the receiver.
- **Effect**: Renders the `CallScreen` full-screen modal, initializing the LiveKit connection token and connecting to the WebRTC server.
