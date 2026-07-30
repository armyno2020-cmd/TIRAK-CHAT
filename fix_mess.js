import fs from 'fs';
import path from 'path';

const fixInjectedExport = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  // the script injected:
  // export const ${screenName}: React.FC<any> = (props) => {\n  const { ... } = props || {};\n  return (
  const regex = /export const [A-Za-z0-9_]+: React\.FC<any> = \(props\) => \{\s+const \{[^}]+\} = props \|\| \{\};\s+return \(/g;
  content = content.replace(regex, 'return (');
  fs.writeFileSync(file, content);
};

fixInjectedExport('src/screens/CallOverlay.tsx');
fixInjectedExport('src/screens/GroupCallLayout.tsx');
fixInjectedExport('src/screens/LanguageScreen.tsx');
fixInjectedExport('src/screens/MediaViewerModal.tsx');
fixInjectedExport('src/screens/SecuritySetupScreen.tsx');

