'use strict';
const { UsersInDb } = require('./Users.json');

module.exports = {
  up: async (queryInterface) => {

    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.bulkDelete('users', null, {
        transaction,
      });
      await queryInterface.bulkInsert(
        'users',
        UsersInDb,
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface) => {

    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.bulkDelete('users', null, {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
