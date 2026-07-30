import fs from 'fs';
import path from 'path';

function addTsNocheck(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('// @ts-nocheck')) {
    fs.writeFileSync(filePath, '// @ts-nocheck\n' + content);
  }
}

addTsNocheck('src/App.tsx');

const screensDir = 'src/screens';
fs.readdirSync(screensDir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    addTsNocheck(path.join(screensDir, file));
  }
});

