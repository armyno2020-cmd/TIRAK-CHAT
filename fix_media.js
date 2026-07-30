import fs from 'fs';
let media = fs.readFileSync('src/screens/MediaViewerModal.tsx', 'utf8');
media = media.replace(/  isOpen: boolean;\n  mediaUrl: string;\n  onClose: \(\) => void;\n\}/g, 'interface MediaViewerModalProps {\n  isOpen: boolean;\n  mediaUrl: string;\n  onClose: () => void;\n}');
fs.writeFileSync('src/screens/MediaViewerModal.tsx', media);
