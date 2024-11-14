"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "TeeTimes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        time: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        players: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        open: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "TeeTimes";
    return queryInterface.dropTable(options);
  },
};
