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
          item: "TaylorMade Golf Set",
          price: 1200
        },
        
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Rates";
    return queryInterface.bulkDelete(
      options,
      {
        username: "Karl",
      },
      {}
    );
  },
};