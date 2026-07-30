import fs from 'fs';
let lang = fs.readFileSync('src/screens/LanguageScreen.tsx', 'utf8');

const lastImport = lang.lastIndexOf('import ');
const semi = lang.indexOf(';', lastImport) + 1;

const before = lang.substring(0, semi);
let after = lang.substring(semi);

// Remove the dangling `  onSelectLanguage: (lang: Language) => void;` completely
after = after.replace(/^\s*onSelectLanguage:\s*\(lang:\s*Language\)\s*=>\s*void;/m, '');

// The interface `interface LanguageScreenProps {` should be in `after` or we can just ensure it is well formed.
if (!after.includes('interface LanguageScreenProps')) {
  after = `\n\ninterface LanguageScreenProps {\n  onSelectLanguage: (lang: Language) => void;\n  activeLanguage: Language;\n  onNavigate?: (screen: ScreenId) => void;\n  currentUser?: UserProfile | null;\n  isOnboarded?: boolean;\n}\n` + after;
}

fs.writeFileSync('src/screens/LanguageScreen.tsx', before + after);
