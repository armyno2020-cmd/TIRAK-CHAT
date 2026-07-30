import fs from 'fs';
import path from 'path';

const dir = 'src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const getHeaderTitle = (fileName) => {
  const map = {
    'WelcomeScreen.tsx': 'ยินดีต้อนรับ',
    'AccountScreen.tsx': 'บัญชีของฉัน',
    'AddFriendScreen.tsx': 'เพิ่มเพื่อน',
    'ArchitectureDiagramsScreen.tsx': 'โครงสร้างระบบ',
    'ArchivedChatsScreen.tsx': 'แชทที่เก็บถาวร',
    'BackupScreen.tsx': 'สำรองข้อมูล',
    'BlockedContactsScreen.tsx': 'ผู้ติดต่อที่ถูกบล็อก',
    'CallHistoryScreen.tsx': 'ประวัติการโทร',
    'ChatDetailScreen.tsx': 'แชท',
    'ChatListScreen.tsx': 'ข้อความ',
    'ContactSyncScreen.tsx': 'ซิงค์รายชื่อ',
    'CreateGroupScreen.tsx': 'สร้างกลุ่มใหม่',
    'DataUsageScreen.tsx': 'การใช้ข้อมูล',
    'FriendProfileScreen.tsx': 'โปรไฟล์เพื่อน',
    'GlobalSearchScreen.tsx': 'ค้นหา',
    'GroupInfoScreen.tsx': 'ข้อมูลกลุ่ม',
    'HelpScreen.tsx': 'ความช่วยเหลือ',
    'LanguageScreen.tsx': 'ภาษา',
    'LinkedDevicesScreen.tsx': 'อุปกรณ์ที่เชื่อมต่อ',
    'MyQRCodeScreen.tsx': 'คิวอาร์โค้ดของฉัน',
    'NotificationSettingsScreen.tsx': 'การแจ้งเตือน',
    'OfficialAccountScreen.tsx': 'บัญชีทางการ',
    'OTPVerificationScreen.tsx': 'ยืนยันรหัส OTP',
    'PermissionsScreen.tsx': 'สิทธิ์การเข้าถึง',
    'PrivacyIntroScreen.tsx': 'ความเป็นส่วนตัว',
    'PrivacySettingsScreen.tsx': 'การตั้งค่าความเป็นส่วนตัว',
    'ProfileSetupScreen.tsx': 'ตั้งค่าโปรไฟล์',
    'QRScannerScreen.tsx': 'สแกนคิวอาร์โค้ด',
    'RegisterScreen.tsx': 'ลงทะเบียน',
    'ReportFeedbackScreen.tsx': 'รายงานปัญหา',
    'SecuritySetupScreen.tsx': 'ความปลอดภัย',
    'StarredMessagesScreen.tsx': 'ข้อความที่ติดดาว',
    'StoriesScreen.tsx': 'สตอรี่',
    'TwoStepVerificationScreen.tsx': 'การยืนยันแบบสองขั้นตอน',
  };
  return map[fileName] || 'NEWFOUND';
};

const getBackButtonDest = (fileName) => {
  const rootScreens = ['WelcomeScreen.tsx', 'ChatListScreen.tsx', 'CallHistoryScreen.tsx', 'StoriesScreen.tsx', 'AccountScreen.tsx'];
  if (rootScreens.includes(fileName)) return null; // No back button for root tabs
  if (fileName === 'ChatDetailScreen.tsx') return 'chat_list';
  if (fileName === 'GroupInfoScreen.tsx') return 'chat_detail';
  if (fileName === 'AddFriendScreen.tsx') return 'chat_list';
  return 'account'; // default fallback for settings pages
};

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const title = getHeaderTitle(file);
  const backDest = getBackButtonDest(file);
  
  // Make sure ArrowLeft is imported if backDest exists
  if (backDest && !content.includes('ArrowLeft')) {
    content = content.replace(/import \{([^}]+)\} from 'lucide-react'/, (m, p1) => {
      return `import { ArrowLeft, ${p1} } from 'lucide-react'`;
    });
  }

  const backButtonHtml = backDest 
    ? `\n          <button onClick={() => onNavigate && onNavigate('${backDest}')} className="p-2 -ml-2 rounded-full hover:bg-white/40 transition-colors text-[#1b1b1d]">\n            <ArrowLeft className="w-6 h-6" />\n          </button>`
    : '';

  const newHeader = `<header className="fixed top-4 left-4 right-4 rounded-full bg-[#fcf8fb]/80 backdrop-blur-[30px] border border-white/20 shadow-sm flex justify-between items-center px-6 py-2 z-50 mx-auto max-w-4xl">
        <div className="flex items-center gap-3">${backButtonHtml}
          <span className="font-th-heading text-[20px] text-[#7e5356] font-bold tracking-tighter">${title}</span>
        </div>
      </header>`;
      
  // Replace the old <header> block.
  content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);
  
  fs.writeFileSync(path.join(dir, file), content);
}
