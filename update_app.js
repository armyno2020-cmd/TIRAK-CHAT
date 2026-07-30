import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import { DataUsageScreen }')) {
  content = content.replace(
    "import { MyQRCodeScreen } from './screens/MyQRCodeScreen';",
    "import { MyQRCodeScreen } from './screens/MyQRCodeScreen';\nimport { DataUsageScreen } from './screens/DataUsageScreen';"
  );
}

if (!content.includes("currentScreen === 'data_usage'")) {
  content = content.replace(
    "{currentScreen === 'my_qrcode' && currentUser && (",
    "{currentScreen === 'data_usage' && (\n          <DataUsageScreen onNavigate={navigateTo} />\n        )}\n\n        {currentScreen === 'my_qrcode' && currentUser && ("
  );
}

// Ensure MyQRCodeScreen is updated correctly in the render
content = content.replace(
  /<MyQRCodeScreen[\s\S]*?\/>/g,
  '<MyQRCodeScreen onNavigate={navigateTo} />'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Updated App.tsx");
