import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove duplicate attributes
const removeDuplicates = (html) => {
  return html.replace(/<([a-zA-Z0-9_]+)([^>]*)>/g, (match, tag, attrs) => {
    let seen = new Set();
    let newAttrs = attrs.replace(/([a-zA-Z0-9_]+)(=\{[^}]*\}|="[^"]*"|='[^']*'|\s)?/g, (attrMatch, attrName) => {
      if (seen.has(attrName)) return '';
      seen.add(attrName);
      return attrMatch;
    });
    return `<${tag}${newAttrs}>`;
  });
};

content = removeDuplicates(content);

// Also remove currentUser from components that complain
content = content.replace(/currentUser=\{currentUser\}\s*(?=\/?>|\w+=)/g, (match, offset, full) => {
  // If the component is one of the newly created ones, we remove it.
  // Actually we can just leave it if we update their props in the component files.
  return match;
});

fs.writeFileSync('src/App.tsx', content);
