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
          item: "nineHoles",
          price: 30
        },
        {
          item: "eighteenHoles",
          price: 50
        },
        {
          item: "cartSeat",
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
      {}
    );
  },
};