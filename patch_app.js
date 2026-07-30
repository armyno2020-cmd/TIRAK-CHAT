import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Insert imports
if (!content.includes('MyQRCodeScreen')) {
  content = content.replace(
    /import { ArchitectureDiagramsScreen } from '\.\/screens\/ArchitectureDiagramsScreen';/,
    `import { ArchitectureDiagramsScreen } from './screens/ArchitectureDiagramsScreen';
import { MyQRCodeScreen } from './screens/MyQRCodeScreen';
import { QRScannerScreen } from './screens/QRScannerScreen';`
  );
}

// Insert routes
content = content.replace(
  /\{currentScreen === 'architecture_diagrams' && \([\s\S]*?\)\s*\}\s*<\/main>/,
  `{currentScreen === 'architecture_diagrams' && (
          <ArchitectureDiagramsScreen
            activeLanguage={activeLanguage}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'my_qrcode' && currentUser && (
          <MyQRCodeScreen
            currentUser={currentUser}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'qr_scanner' && currentUser && (
          <QRScannerScreen
            currentUser={currentUser}
            onNavigate={navigateTo}
          />
        )}
      </main>`
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated');
