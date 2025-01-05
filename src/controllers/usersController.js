const {User} = require('../models/index')
const { generateReferralCode } = require('../utils/validators');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, referredBy } = req.body;
    let referralCode = null;

    // Validate referral code limit
    if (referredBy) {
      const referrer = await User.findOne({ where: { id: referredBy } });
      if (!referrer) return res.status(400).json({ message: 'Invalid referral code.' });
      if (referrer.referralCount >= 8) return res.status(400).json({ message: 'Referral limit exceeded.' });
       referralCode = await generateReferralCode();
    }

    // Create user
    const user = await User.create({ name, email, referredBy, referralCode });

    // Increment referral count for the referrer
    if (referredBy) {
      const referrer = await User.findOne({ where: { id: referredBy } });
      await referrer.increment('referralCount');
    }

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
