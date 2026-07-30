import { Language } from "../types";

export const translations = {
  th: {
    // Branding & Common
    appName: "Tirak Chat",
    appTagline: "แชทส่วนตัวที่ปลอดภัยสูงสุด",
    appDescription:
      "แพลตฟอร์มส่งข้อความชุมชนปลอดภัยและเป็นส่วนตัว ออกแบบมาเพื่อการเชื่อมต่อที่มีความหมาย",
    confirm: "ยืนยัน",
    cancel: "ยกเลิก",
    save: "บันทึก",
    delete: "ลบ",
    edit: "แก้ไข",
    back: "ย้อนกลับ",
    skip: "ข้าม",
    next: "ถัดไป",
    continue: "ดำเนินการต่อ",
    search: "ค้นหา...",
    searchPlaceholder: "ค้นหาแชท, สมาชิก, หรือข้อความ...",
    online: "ออนไลน์",
    offline: "ออฟไลน์",
    typing: "กำลังพิมพ์...",
    activeNow: "ใช้งานอยู่",
    lastSeen: "ใช้งานล่าสุด",

    // Onboarding
    welcome: "ยินดีต้อนรับสู่ Tirak Chat",
    getStarted: "เริ่มใช้งาน",
    learnMore: "เรียนรู้เพิ่มเติม",
    login: "เข้าสู่ระบบ",
    register: "สมัครสมาชิก",
    militaryGradeProtection: "ระบบป้องกันระดับการทหาร",
    zeroKnowledge: "สถาปัตยกรรม Zero-Knowledge",
    noMetaData: "ไม่ติดตาม Metadata",
    seamlessSync: "ซิงก์ไร้รอยต่อ",

    // Language Selection
    chooseLanguage: "เลือกภาษาของคุณ",
    chooseLanguageSub: "เลือกภาษาที่ต้องการใช้งานในระบบ Tirak Chat",
    confirmSelection: "ยืนยันการเลือกภาษา",
    changeLaterNotice: "คุณสามารถเปลี่ยนภาษาได้ภายหลังในการตั้งค่า",

    // Privacy Overview
    privacyManifestoTitle: "ความเป็นส่วนตัวไม่ใช่ทางเลือก แต่เป็นคำสัญญา",
    privacyManifestoDesc:
      "เราใช้การเข้ารหัสระดับโลกเพื่อรับประกันว่าข้อมูลเป็นของคุณ Tirak Chat ไม่สามารถอ่านหรือเข้าถึงบทสนทนาของคุณได้",
    e2eeTitle: "End-to-End Encryption",
    e2eeDesc:
      "ข้อความของคุณถูกล็อกด้วยกุญแจที่มีเพียงคุณและผู้รับเท่านั้นที่มี",
    zeroKnowledgeTitle: "Zero Knowledge Architecture",
    zeroKnowledgeDesc:
      "แม้แต่ผู้ให้บริการก็ไม่มีกุญแจถอดรหัส Metadata ถูกลบข้อมูลระบุตัวตนออกทั้งหมด",
    biometricLockTitle: "Biometric Lock",
    biometricLockDesc: "เพิ่มความปลอดภัยอีกขั้นด้วยฮาร์ดแวร์ยืนยันตัวตน",
    localStorageTitle: "Local Storage Keys",
    localStorageDesc: "กุญแจเข้ารหัสไม่มีวันออกจากอุปกรณ์ของคุณ",
    autoErasureTitle: "Auto-Erasure Messages",
    autoErasureDesc: "ข้อความลบเลือนเองตามเวลาที่คุณกำหนด",
    iUnderstand: "ฉันเข้าใจแล้ว",

    // Register & OTP
    enterPhone: "กรอกหมายเลขโทรศัพท์",
    enterPhoneSub: "เราจะส่งรหัส OTP 6 หลักเพื่อยืนยันตัวตนของคุณ",
    phoneNumber: "หมายเลขโทรศัพท์",
    fullName: "ชื่อ-นามสกุล",
    fullNamePlaceholder: "เช่น จูเลียน สเตอร์ลิง",
    usernameLabel: "ชื่อผู้ใช้ (@username)",
    usernamePlaceholder: "username_your",
    acceptTerms: "ฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว",
    receivePromos: "รับข้อมูลข่าวสารและการแจ้งเตือนความปลอดภัยพิเศษ",
    alreadyHaveAccount: "มีบัญชีอยู่แล้ว?",
    verifyAccount: "ยืนยันบัญชีของคุณ",
    otpSentNotice: "เราได้ส่งรหัสยืนยัน 6 หลักไปยัง",
    didNotReceiveCode: "ไม่ได้รับรหัส?",
    resendIn: "ส่งรหัสใหม่ใน",
    resendCode: "ส่งรหัสใหม่",
    verifySecurely: "ยืนยันอย่างปลอดภัย",
    needAssistance: "ต้องการความช่วยเหลือ?",

    // Profile & Security Setup
    setupProfile: "ตั้งค่าโปรไฟล์",
    setupProfileSub: "กำหนดอักขระและโปรไฟล์ของคุณ ข้อมูลนี้จะถูกเข้ารหัส",
    tapToUploadAvatar: "แตะเพื่ออัปโหลดรูปโปรไฟล์",
    professionalHeadline: "คำอธิบายสั้น / เกี่ยวกับคุณ",
    completeSetup: "เสร็จสิ้นการตั้งค่า",
    secureAccessTitle: "การเข้าถึงส่วนตัว (Security Lock)",
    secureAccessSub: "สร้าง PIN เพื่อล็อกหน้าจอและเข้ารหัสคลังเก็บข้อความ",
    useBiometrics: "เปิดใช้ Biometric / FaceID",
    useBiometricsSub: "สแกนใบหน้าหรือลายนิ้วมือเพื่อเข้าใช้งานได้เร็วขึ้น",

    // Permissions & Contacts
    personalControlTitle: "การควบคุมสิทธิ์ (Permissions)",
    personalControlSub: "กำหนดว่า Tirak Chat เข้าถึงฟังก์ชั่นใดของอุปกรณ์บ้าง",
    cameraPermission: "กล้องถ่ายรูป",
    cameraPermissionDesc: "ใช้สำหรับยืนยันตัวตน ถ่ายรูปภาพ และโทรวิดีโอ",
    photosPermission: "รูปภาพและคลังสื่อ",
    photosPermissionDesc:
      "อัปโหลดรูปภาพและแนบไฟล์ โดยไม่มีการสแกนรูปภาพส่วนตัว",
    contactsPermission: "ผู้ติดต่อ",
    contactsPermissionDesc: "ซิงก์เพื่อนในระบบโดยไม่ส่งคำเชิญรบกวน",
    notificationsPermission: "การแจ้งเตือน",
    notificationsPermissionDesc: "รับการแจ้งเตือนข้อความและสายโทรสำคัญ",

    // Main App & Chat
    messages: "ข้อความสนทนา",
    allChats: "ทั้งหมด",
    myChats: "แชทส่วนตัว",
    family: "ครอบครัว",
    work: "ทำงาน",
    channels: "ชุมชน/ช่อง",
    yourStory: "สตอรี่ของคุณ",
    noteToSelf: "บันทึกถึงตัวเอง (Note to Self)",
    pinnedChats: "แชทที่ปักหมุด",
    typeMessage: "พิมพ์ข้อความ....",
    sendMessage: "ส่งข้อความ",
    reply: "ตอบกลับ",
    voiceNote: "โน้ตเสียง",
    recording: "กำลังบันทึกเสียง...",
    securedSessionActive: "เข้ารหัส E2EE Signal Protocol สมบูรณ์",
    messageDelivered: "ส่งแล้ว",
    messageRead: "อ่านแล้ว",
    viewOnceMedia: "สื่อประเภทดูได้ครั้งเดียว (View Once)",

    // Group & Call
    createGroup: "สร้างกลุ่ม/ชุมชนใหม่",
    groupName: "ชื่อกลุ่ม",
    groupDescription: "คำอธิบายกลุ่ม",
    members: "สมาชิก",
    addMembers: "เพิ่มสมาชิก",
    admin: "ผู้ดูแลระบบ",
    owner: "เจ้าของ",
    call: "โทร",
    videoCall: "วิดีโอคอล",
    calling: "กำลังโทรออก...",
    incomingCall: "สายเรียกเข้า...",
    endedCall: "วางสายแล้ว",
    mute: "ปิดเสียง",
    speaker: "ลำโพง",
    endCall: "วางสาย",

    // Stories & Status
    storiesTitle: "สตอรี่ & สถานะ",
    addStory: "เพิ่มสตอรี่ใหม่",
    views: "การรับชม",

    // Settings & Account
    settings: "การตั้งค่า",
    account: "บัญชีและการยืนยัน",
    privacySecurity: "ความเป็นส่วนตัวและความปลอดภัย",
    notifications: "การแจ้งเตือนและเสียง",
    storageBackup: "การจัดเก็บและสำรองข้อมูล",
    helpAbout: "ความช่วยเหลือและเกี่ยวกับ",
    backupNow: "สำรองข้อมูลตอนนี้",
    backupEncrypted: "สำรองข้อมูลเข้ารหัสบน Cloud",
    exportHistory: "ส่งออกประวัติแชท (JSON)",
    logout: "ออกจากระบบ",
    deleteAccount: "ลบบัญชีถาวร",

    // Status / Alert
    success: "สำเร็จ",
    error: "เกิดข้อผิดพลาด",
    copiedToClipboard: "คัดลอกลงคลิปบอร์ดแล้ว",
  },
  en: {
    // Branding & Common
    appName: "Tirak Chat",
    appTagline: "Encrypted & Intimate Community Chat",
    appDescription:
      "A secure and intimate community messaging platform designed for meaningful connections.",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    skip: "Skip",
    next: "Next",
    continue: "Continue",
    search: "Search...",
    searchPlaceholder: "Search chats, members, or messages...",
    online: "Online",
    offline: "Offline",
    typing: "typing...",
    activeNow: "Active Now",
    lastSeen: "Last seen",

    // Onboarding
    welcome: "Welcome to Tirak Chat",
    getStarted: "Get Started",
    learnMore: "Learn More",
    login: "Sign In",
    register: "Create Account",
    militaryGradeProtection: "Military Grade Protection",
    zeroKnowledge: "Zero-Knowledge Architecture",
    noMetaData: "No Meta-Data Tracking",
    seamlessSync: "Seamless Sync",

    // Language Selection
    chooseLanguage: "Choose your interface language",
    chooseLanguageSub:
      "Select a language to tailor your experience across the Tirak Chat ecosystem.",
    confirmSelection: "Confirm Selection",
    changeLaterNotice: "You can change this later in Settings",

    // Privacy Overview
    privacyManifestoTitle: "Privacy is not an option, it’s a promise.",
    privacyManifestoDesc:
      "We use world-class encryption to ensure that your data remains yours. Tirak Chat cannot read, see, or share your private conversations.",
    e2eeTitle: "End-to-End Encryption",
    e2eeDesc:
      "Your messages are locked with a unique key that only you and the recipient hold.",
    zeroKnowledgeTitle: "Zero Knowledge Architecture",
    zeroKnowledgeDesc:
      "Even we don’t have the keys. Your metadata is anonymized and stripped of identifiers.",
    biometricLockTitle: "Biometric Lock",
    biometricLockDesc: "Add a secondary layer of hardware-based security.",
    localStorageTitle: "Local Storage Keys",
    localStorageDesc: "Your keys never leave your physical device.",
    autoErasureTitle: "Auto-Erasure Messages",
    autoErasureDesc: "Messages vanish after being read, by your command.",
    iUnderstand: "I Understand",

    // Register & OTP
    enterPhone: "Enter Phone Number",
    enterPhoneSub:
      "We will send a 6-digit verification code to confirm your device.",
    phoneNumber: "Phone Number",
    fullName: "Full Name",
    fullNamePlaceholder: "E.g. Julian Sterling",
    usernameLabel: "Username (@username)",
    usernamePlaceholder: "your_username",
    acceptTerms: "I accept the Terms of Service and Privacy Policy",
    receivePromos: "Receive security alerts and system update notices",
    alreadyHaveAccount: "Already have an account?",
    verifyAccount: "Verify your account",
    otpSentNotice: "We've sent a 6-digit verification code to",
    didNotReceiveCode: "Didn't receive the code?",
    resendIn: "Resend in",
    resendCode: "Resend Code",
    verifySecurely: "Verify Securely",
    needAssistance: "Need Assistance?",

    // Profile & Security Setup
    setupProfile: "Create Profile",
    setupProfileSub:
      "Set up your identity in the Tirak Chat ecosystem. Your profile is encrypted.",
    tapToUploadAvatar: "TAP TO UPLOAD AVATAR",
    professionalHeadline: "Professional Headline / About",
    completeSetup: "Complete Setup",
    secureAccessTitle: "Secure Access",
    secureAccessSub: "Create a personal PIN to encrypt your secure vault.",
    useBiometrics: "Biometric Login",
    useBiometricsSub: "Use FaceID / TouchID for faster access",

    // Permissions & Contacts
    personalControlTitle: "Personal Control.",
    personalControlSub: "Configure how Tirak Chat interacts with your device.",
    cameraPermission: "Camera",
    cameraPermissionDesc:
      "Required for secure video verification and profile photos.",
    photosPermission: "Photos",
    photosPermissionDesc:
      "Allows uploading photos without scanning your private library.",
    contactsPermission: "Contacts",
    contactsPermissionDesc:
      "Sync network to find trusted connections without unsolicited invites.",
    notificationsPermission: "Notifications",
    notificationsPermissionDesc:
      "Critical alerts regarding account security and incoming calls.",

    // Main App & Chat
    messages: "Messages",
    allChats: "All",
    myChats: "Direct",
    family: "Family",
    work: "Work",
    channels: "Channels",
    yourStory: "Your Story",
    noteToSelf: "Note to Self",
    pinnedChats: "Pinned Chats",
    typeMessage: "Message...",
    sendMessage: "Send",
    reply: "Reply",
    voiceNote: "Voice Note",
    recording: "Recording...",
    securedSessionActive: "E2EE Signal Session Active",
    messageDelivered: "Delivered",
    messageRead: "Read",
    viewOnceMedia: "View Once Media",

    // Group & Call
    createGroup: "Create Group / Community",
    groupName: "Group Name",
    groupDescription: "Group Description",
    members: "Members",
    addMembers: "Add Members",
    admin: "Admin",
    owner: "Owner",
    call: "Call",
    videoCall: "Video Call",
    calling: "Calling...",
    incomingCall: "Incoming Call...",
    endedCall: "Call Ended",
    mute: "Mute",
    speaker: "Speaker",
    endCall: "End Call",

    // Stories & Status
    storiesTitle: "Stories & Status",
    addStory: "Add New Story",
    views: "Views",

    // Settings & Account
    settings: "Settings",
    account: "Account & Verification",
    privacySecurity: "Privacy & Security",
    notifications: "Notifications & Sound",
    storageBackup: "Storage & Encrypted Backup",
    helpAbout: "Help & About",
    backupNow: "Backup Now",
    backupEncrypted: "Encrypted Cloud Backup",
    exportHistory: "Export Chat History (JSON)",
    logout: "Sign Out",
    deleteAccount: "Delete Account",

    // Status / Alert
    success: "Success",
    error: "Error",
    copiedToClipboard: "Copied to clipboard",
  },
};

export function getTranslation(
  lang: Language,
  key: keyof (typeof translations)["en"],
): string {
  const dictionary = translations[lang] || translations["th"];
  return (
    (dictionary as Record<string, string>)[key] ||
    translations["en"][key] ||
    key
  );
}
