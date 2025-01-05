const crypto = require('crypto');
const { User } = require('../models');

// Generate a unique referral code
exports.generateReferralCode = async () => {
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    const existing = await User.findOne({ where: { referralCode } });
    isUnique = !existing;
  }

  return referralCode;
};
