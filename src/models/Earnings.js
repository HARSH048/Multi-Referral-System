const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');

const Earnings = sequelize.define(
  'Earnings',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    referredBy: {
      type: DataTypes.UUID,
      allowNull: true, // Can be null for self-earning
      references: {
        model: User,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING, // e.g., 'self', 'Level 1', or 'Level 2'
      allowNull: false,
    },
    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    calculatedProfit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Earnings;
