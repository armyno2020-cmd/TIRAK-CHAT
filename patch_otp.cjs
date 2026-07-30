const fs = require('fs');
let content = fs.readFileSync('src/screens/OTPVerificationScreen.tsx', 'utf8');

content = content.replace(
  `import { Language, ScreenId } from "../types";`,
  `import { Language, ScreenId } from "../types";\nimport { FirebaseService } from "../services/firebaseService";`
);

const target = `  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.join("").length === 6) {
      triggerHaptic("success");
      onNavigate("profile_setup");
    }
  };`;

const replace = `  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      try {
        const confirmationResult = (window as any).confirmationResult;
        if (confirmationResult) {
          const userProfile = await FirebaseService.verifyOtp(confirmationResult, code);
          triggerHaptic("success");
          onNavigate("profile_setup");
        } else {
          // Fallback if no confirmation result (for mock/dev)
          triggerHaptic("success");
          onNavigate("profile_setup");
        }
      } catch (err: any) {
        alert("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่ (Error: " + err.message + ")");
      }
    }
  };`;

content = content.replace(target, replace);
fs.writeFileSync('src/screens/OTPVerificationScreen.tsx', content);
