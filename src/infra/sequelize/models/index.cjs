const config = require('../config/config.cjs');
const sequelize = config.connection;

const Purchase = require('./purchase.cjs').connect(sequelize);
const User = require('./user.cjs').connect(sequelize);
const PurchaseResult = require('./purchaseResult.cjs').connect(sequelize);

module.exports = {
  Purchase,
  User,
  PurchaseResult,
};