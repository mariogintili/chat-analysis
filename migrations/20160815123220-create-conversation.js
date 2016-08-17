'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startTime: Sequelize.STRING,
      endTime: Sequelize.STRING,
      interactionId: Sequelize.STRING,
      agentId: Sequelize.STRING,
      queue: Sequelize.STRING,
      sourceCategory: Sequelize.STRING,
      customerName: Sequelize.STRING,
      conversation: Sequelize.TEXT,
      exitSurvey: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('conversations');
  }
};
