"use strict";

const { TeeTime } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await TeeTime.bulkCreate(
      [
        {
          time: "2024-11-05 14:00:00.000000",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-06 14:00:00.000000",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 2,
          open: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "TeeTimes";
    return queryInterface.bulkDelete(
      options,
      {
        username: "Karl",
      },
      {}
    );
  },
};
