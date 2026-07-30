import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const regexAccount = /<AccountScreen\s+onNavigate={navigateTo}\s+onOpenLanguageModal={\(\) => navigateTo\('language_select'\)}\s+onLogout={\(\) => {\s+setIsOnboarded\(false\);\s+navigateTo\('welcome'\);\s+}}\s+\/>/g;
let newContent = content.replace(regexAccount, "<AccountScreen onNavigate={navigateTo} />");

const regexProfile = /<ProfileSetupScreen\s+onNavigate={navigateTo}\s+onUpdateProfile={\(\) => {\s+const updated = { ...\w+, ...\w+ };\s+setCurrentUser\(updated\);\s+FirebaseService.saveUserProfile\(updated\);\s+}}\s+\/>/g;
newContent = newContent.replace(regexProfile, "<ProfileSetupScreen onNavigate={navigateTo} />");

const regexPerms = /<PermissionsScreen\s+onNavigate={navigateTo}\s+\/>/g;
newContent = newContent.replace(regexPerms, "<PermissionsScreen onNavigate={navigateTo} />");

fs.writeFileSync('src/App.tsx', newContent);
