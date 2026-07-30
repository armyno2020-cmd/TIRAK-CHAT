import fs from 'fs';

for (const file of ['src/screens/AddFriendScreen.tsx', 'src/screens/MyQRCodeScreen.tsx', 'src/screens/QRScannerScreen.tsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/onNavigate\('account'\)/g, "onNavigate('settings_account')");
  fs.writeFileSync(file, content);
}
console.log('Screens fixed');
