const fs = require('fs');
let content = fs.readFileSync('src/screens/RegisterScreen.tsx', 'utf8');

const target = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsChecking(true);

    try {
      const formattedPhone = \`\${countryCode}\${phoneNumber.replace(/\\\\D/g, "")}\`;
      const existingUser =
        await FirebaseService.findUserByPhone(formattedPhone);
      if (existingUser && onExistingUserFound) {
        setTimeout(() => {
          onExistingUserFound(existingUser);
        }, 1000);
        return;
      }
    } catch (err) {
      console.warn("Duplicate check warning:", err);
    }

    setIsChecking(false);

    // Mock user creation for phone
    const mockUsername = \`user_\${phoneNumber.substring(0, 4)}\`;
    const mockName = \`User \${phoneNumber.substring(0, 4)}\`;
    onSavePhoneAndUsername(phoneNumber, countryCode, mockUsername, mockName);
    onNavigate("otp_verification");
  };`;

const replace = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsChecking(true);

    try {
      const formattedPhone = \`\${countryCode}\${phoneNumber.replace(/\\\\D/g, "")}\`;
      
      // Check if user already exists
      const existingUser = await FirebaseService.findUserByPhone(formattedPhone);
      if (existingUser && onExistingUserFound) {
        onExistingUserFound(existingUser);
        setIsChecking(false);
        return;
      }

      // Setup Recaptcha if not already done
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = FirebaseService.setupRecaptcha('recaptcha-container');
      }
      
      const confirmationResult = await FirebaseService.sendOtp(formattedPhone, (window as any).recaptchaVerifier);
      (window as any).confirmationResult = confirmationResult;

      setIsChecking(false);
      onSavePhoneAndUsername(phoneNumber, countryCode, "", "");
      onNavigate("otp_verification");

    } catch (err: any) {
      setIsChecking(false);
      alert("ไม่สามารถส่งรหัส OTP ได้ (Error): " + err.message);
    }
  };

  React.useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = FirebaseService.setupRecaptcha('recaptcha-container');
    }
  }, []);`;

content = content.replace(target, replace);
fs.writeFileSync('src/screens/RegisterScreen.tsx', content);
