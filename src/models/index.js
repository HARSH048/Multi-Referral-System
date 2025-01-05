const User = require('./User');
const Earnings = require('./Earnings');

// One user can have multiple earnings
User.hasMany(Earnings, { foreignKey: 'userId' });
Earnings.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(User, { foreignKey: 'referredBy', as: 'Referrals' });

module.exports = { User, Earnings };
