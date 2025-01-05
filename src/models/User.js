const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  referralCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  referredBy: {
    type: DataTypes.UUID,
    allowNull: true, // Can be null for root users
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  referralCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      max: 8, // Limit of 8 direct referrals
    },
  },
}, {
  timestamps: true,
});

module.exports = User;
