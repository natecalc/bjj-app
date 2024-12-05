"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("feedback", [
      {
        id: "323e4567-e89b-12d3-a456-426614174000",
        gymId: "123e4567-e89b-12d3-a456-426614174000",
        rating: 5,
        positives: ["Clear instruction", "Good energy"],
        improvements: ["More drilling time"],
        comment: "Great class today, really enjoyed the position details",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "423e4567-e89b-12d3-a456-426614174000",
        gymId: "123e4567-e89b-12d3-a456-426614174000",
        rating: 4,
        positives: ["Good pace", "Helpful details"],
        improvements: ["More sparring rounds"],
        comment: "Would love to have more rounds at the end",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("feedback", null, {});
  },
};
