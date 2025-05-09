'use strict';
const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  errors: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  user: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  purchaseId: {
    type: DataTypes.UUID,
  },
  quantity: {
    type: DataTypes.INTEGER,
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
    return connection.define('purchase_result', attributes);
  },
  attributes,
};