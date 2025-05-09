'use strict';
const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
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
    return connection.define('user', attributes);
  },
  attributes,
};