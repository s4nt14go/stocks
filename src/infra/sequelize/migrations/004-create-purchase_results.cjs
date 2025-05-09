'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'purchase_results',

      {
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