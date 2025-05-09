'use strict';
const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  user: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  // These timestamps aren't included in the domain model, they are handled by Sequelize. Configured in ../config/config.cjs
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

module.exports = {
  connect: (connection) => {
    return connection.define('purchase', attributes);
  },
  attributes,
};