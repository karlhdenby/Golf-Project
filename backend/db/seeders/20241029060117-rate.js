'use strict';
const { Rate } = require("../models")

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Rate.bulkCreate(
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