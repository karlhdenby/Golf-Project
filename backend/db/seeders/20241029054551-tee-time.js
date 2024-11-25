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
          time: "2024-11-23 08:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 2,
          open: true,
        },
        {
          time: "2024-11-23 10:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 4,
          open: false,
        },
        {
          time: "2024-11-23 12:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-23 14:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-23 16:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 1,
          open: true,
        },
        {
          time: "2024-11-24 08:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 2,
          open: true,
        },
        {
          time: "2024-11-24 10:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 3,
          open: false,
        },
        {
          time: "2024-11-24 12:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 4,
          open: true,
        },
        {
          time: "2024-11-24 14:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-24 16:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 1,
          open: true,
        },
        {
          time: "2024-11-25 08:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 4,
          open: false,
        },
        {
          time: "2024-11-25 10:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-25 12:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-25 14:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 1,
          open: true,
        },
        {
          time: "2024-11-25 16:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-26 08:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 4,
          open: true,
        },
        {
          time: "2024-11-26 10:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-26 12:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-26 14:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 1,
          open: false,
        },
        {
          time: "2024-11-26 16:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 2,
          open: true,
        },
        {
          time: "2024-11-27 08:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-27 10:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 1,
          open: false,
        },
        {
          time: "2024-11-27 12:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 4,
          open: true,
        },
        {
          time: "2024-11-27 14:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-27 16:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-28 08:00:00",
          username: "BobB",
          firstName: "Bob",
          lastName: "Brown",
          players: 1,
          open: true,
        },
        {
          time: "2024-11-28 10:00:00",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          players: 4,
          open: false,
        },
        {
          time: "2024-11-28 12:00:00",
          username: "AliceW",
          firstName: "Alice",
          lastName: "Walker",
          players: 3,
          open: true,
        },
        {
          time: "2024-11-28 14:00:00",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          players: 2,
          open: false,
        },
        {
          time: "2024-11-28 16:00:00",
          username: "Karl",
          firstName: "Karl",
          lastName: "Denby",
          players: 1,
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
