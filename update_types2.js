import fs from 'fs';

let content = fs.readFileSync('src/types.ts', 'utf8');

const newScreenIds = `export type ScreenId =
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
  | 'data_usage'
  | 'starred_messages'
  | 'linked_devices'
  | 'report_feedback'
  | 'friend_profile'
  | 'official_account'
  | 'archived_chats'
  | 'global_search'
  | 'blocked_contacts'
  | 'two_step_verification'
  | 'architecture_diagrams';`;

content = content.replace(/export type ScreenId =[\s\S]*?;/, newScreenIds);
fs.writeFileSync('src/types.ts', content);
