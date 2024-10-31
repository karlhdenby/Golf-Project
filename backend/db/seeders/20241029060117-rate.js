'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Rates",
      [
        {
          item: "9 holes",
          price: 30
        },
        {
          item: "18 holes",
          price: 50
        },
        {
          item: "Cart Seat",
          price: 20
        },
        
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Rate";
    return queryInterface.bulkDelete(
      options,
      {
        username: "Karl",
      },
      {}
    );
  },
};