"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Karl",
          email: "karlhdenby@gmail.com",
          phoneNumber: "360-941-9691",
          courseId: null,
          employee: true,
          rank: 5,
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    return queryInterface.bulkDelete(
      options,
      {
        username: "Karl",
      },
      {}
    );
  },
};
