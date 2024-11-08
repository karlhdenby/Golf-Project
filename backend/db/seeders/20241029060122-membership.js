'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Membership } = require("../models")

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Membership.bulkCreate(
      [
        {
          membership: "casual",
          price: 1200
        },
        {
          membership: "standard",
          price: 1750
        },
        {
          membership: "premium",
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
      {}
    );
  },
};