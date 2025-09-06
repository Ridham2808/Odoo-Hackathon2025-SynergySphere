// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate OTP with expiration time
export const generateOTPWithExpiry = (minutes = 5) => {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
  return { otp, expiresAt };
};

// Validate OTP format
export const isValidOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};
