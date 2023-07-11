const otpGenerator = require("otp-generator");

module.exports.generateOtp = () => {
  let otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return otp;
};
