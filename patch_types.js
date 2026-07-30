import fs from 'fs';

let content = fs.readFileSync('src/types.ts', 'utf8');

// Replace ScreenId type
content = content.replace(/export type ScreenId =[\s\S]*?export type MainTab/, `export type ScreenId =
  | 'welcome'
  | 'language_select'
  | 'privacy_intro'
  | 'register'
  | 'otp_verification'
  | 'profile_setup'
  | 'security_setup'
  | 'permissions'
  | 'contact_sync'
  | 'add_friend'
  | 'chat_list'
  | 'chat_detail'
  | 'group_info'
  | 'create_group'
  | 'call_active'
  | 'call_screen'
  | 'call_history'
  | 'stories_feed'
  | 'settings_notifications'
  | 'settings_privacy'
  | 'settings_backup'
  | 'settings_account'
  | 'settings_help'
  | 'my_qrcode'
  | 'qr_scanner'
  | 'architecture_diagrams';

export type MainTab`);

fs.writeFileSync('src/types.ts', content);
console.log('types.ts updated');
