'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Memberships",
      [
        {
          membership: "Casual",
          price: 120
        },
        {
          membership: "Standard",
          price: 1750
        },
        {
          membership: "Premium",
          price: 2200
        },
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "TeeTimes";
    return queryInterface.bulkDelete(
      options,
      {
        price,
      },
      {}
    );
  },
};