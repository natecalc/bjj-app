"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("gyms", [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Absolute MMA St Kilda",
        email: "stkilda@absolutemma.com.au",
        password: "hashedpassword123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174000",
        name: "Absolute MMA Melbourne CBD",
        email: "cbd@absolutemma.com.au",
        password: "hashedpassword123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("gyms", null, {});
  },
};
