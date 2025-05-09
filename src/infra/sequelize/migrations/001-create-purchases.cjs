'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'purchases',

      {
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
    await queryInterface.dropTable('purchases');
  },
};