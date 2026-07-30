import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// A generic regex to find <ScreenName ...> and inject activeLanguage and currentUser if they are missing
content = content.replace(/<([A-Z][a-zA-Z0-9]*Screen)\s/g, (match, p1) => {
  return `<${p1} activeLanguage={activeLanguage} currentUser={currentUser} `;
});

// Also fix BottomNavBar
content = content.replace(/<BottomNavBar\s/g, "<BottomNavBar activeLanguage={activeLanguage} ");

// Fix the missing onUpdateProfile for ProfileSetupScreen since App.tsx has it inline?
// Actually I removed onUpdateProfile from ProfileSetupScreen. Let's make sure it's not passing it.
content = content.replace(/onUpdateProfile=\{\(\) => \{[^}]*\}\}/g, "");
content = content.replace(/onSavePin=\{\(pin, bio\) => \{[^}]*\}\}/g, "");
content = content.replace(/onSavePermissions=\{\(\) => \{\}\}/g, "");
content = content.replace(/onOpenLanguageModal=\{\(\) => navigateTo\('language_select'\)\}/g, "");
content = content.replace(/onLogout=\{\(\) => \{[^}]*\}\}/g, "");

fs.writeFileSync('src/App.tsx', content);
