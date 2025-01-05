const { User } = require("../models");
const { calculateEarnings, getEarningWithId } = require("../services/earningsService");

// Record a purchase and distribute profits
exports.recordPurchase = async (req, res, next) => {
  try {
    const { userId, amount } = req.body;

    if (amount <= 1000) {
      return res
        .status(400)
        .json({ message: "Purchase amount must exceed 1000." });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Calculate earnings
    const earnings = await calculateEarnings(userId, amount);

    res.status(201).json({ message: "Earnings distributed.", earnings });
  } catch (err) {
    next(err);
  }
};

exports.earningsRecordWithId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const earnings = await getEarningWithId(id);
    return res.status(200).json(earnings)
  } catch (error) {
    next(error);
  }
};
