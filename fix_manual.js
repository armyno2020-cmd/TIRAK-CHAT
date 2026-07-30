import fs from 'fs';
let content = fs.readFileSync('src/screens/LanguageScreen.tsx', 'utf8');
content = content.replace(/  onSelectLanguage: \(lang: Language\) => void;\ninterface LanguageScreenProps \{/g, 'interface LanguageScreenProps {\n  onSelectLanguage: (lang: Language) => void;');
fs.writeFileSync('src/screens/LanguageScreen.tsx', content);

let media = fs.readFileSync('src/screens/MediaViewerModal.tsx', 'utf8');
media = media.replace(/  isOpen: boolean;\ninterface MediaViewerModalProps \{/g, 'interface MediaViewerModalProps {\n  isOpen: boolean;');
// Wait, MediaViewerModal might have different props hanging. Let's just wrap everything up to export const in the interface if it's broken.
// Or just check what's dangling.
