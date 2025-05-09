'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'users',

      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};