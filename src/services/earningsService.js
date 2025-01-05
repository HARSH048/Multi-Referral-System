const { User, Earnings } = require('../models');

// Calculate and distribute earnings
exports.calculateEarnings = async (userId, amount) => {
  const user = await User.findByPk(userId);

    const transactions = [];

    transactions.push(
      Earnings.create({
        userId: user.id,
        referredBy: null, // Self-earning
        amount,
        source: 'self',
        percentage: 0, // Self-purchases don't generate profit
        calculatedProfit: 0,
      })
    );

    // Direct referrer (Level 1 earning)
    if (user.referredBy) {
      const referrer = await User.findByPk(user.referredBy);
      if (referrer) {
        transactions.push(
          Earnings.create({
            userId: referrer.id,
            referredBy: user.id,
            amount,
            source: 'Level 1',
            percentage: 5,
            calculatedProfit: (amount * 5) / 100,
          })
        );
      }

      // Indirect referrer (Level 2 earning)
      if (referrer.referredBy) {
        const indirectReferrer = await User.findByPk(referrer.referredBy);
        if (indirectReferrer) {
          transactions.push(
            Earnings.create({
              userId: indirectReferrer.id,
              referredBy: referrer.id,
              amount,
              source: 'Level 2',
              percentage: 1,
              calculatedProfit: (amount * 1) / 100,
            })
          );
        }
      }
    }

    // Execute all transactions
    await Promise.all(transactions);
    return ({ message: 'Earnings recorded successfully.' });
};

exports.getEarningWithId = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Earnings, // Self earnings
        attributes: ['id', 'amount', 'source', 'calculatedProfit', 'createdAt'],
      },
      {
        model: User, // Level 1 referrals
        as: 'Referrals',
        include: [
          {
            model: Earnings, // Level 1 earnings
            attributes: ['id', 'amount', 'source', 'calculatedProfit', 'createdAt'],
          },
          {
            model: User, // Level 2 referrals
            as: 'Referrals',
            include: [
              {
                model: Earnings, // Level 2 earnings
                attributes: ['id', 'amount', 'source', 'calculatedProfit', 'createdAt'],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error('User not found.');
  }

  // Transform data into structured response
  const response = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    selfEarnings: user.Earnings || [],
    referrals: user.Referrals.map((level1Ref) => ({
      level: 1,
      user: {
        id: level1Ref.id,
        name: level1Ref.name,
        email: level1Ref.email,
      },
      earnings: level1Ref.Earnings || [],
      referrals: level1Ref.Referrals.map((level2Ref) => ({
        level: 2,
        user: {
          id: level2Ref.id,
          name: level2Ref.name,
          email: level2Ref.email,
        },
        earnings: level2Ref.Earnings || [],
      })),
    })),
  };

  return response;
};
