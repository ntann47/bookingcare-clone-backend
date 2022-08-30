"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
     
      contentHTML: {
        type: Sequelize.TEXT("long"),
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
         allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
         allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Markdowns");
  },
};
