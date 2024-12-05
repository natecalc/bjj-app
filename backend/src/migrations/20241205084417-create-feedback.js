"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("feedback", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      gymId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "gyms",
          key: "id",
        },
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      positives: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      improvements: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("feedback");
  },
};
