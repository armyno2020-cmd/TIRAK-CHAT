const fs = require('fs');
let content = fs.readFileSync('firebase-applet-config.json', 'utf8');
const config = JSON.parse(content);
config.recaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // standard test key or dummy
fs.writeFileSync('firebase-applet-config.json', JSON.stringify(config, null, 2));
