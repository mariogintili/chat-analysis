'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startTime: Sequelize.INTEGER,
      endTime: Sequelize.INTEGER,
      interactionId: Sequelize.STRING,
      agentId: Sequelize.STRING,
      queue: Sequelize.STRING,
      sourceCategory: Sequelize.STRING,
      customerName: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      conversation: Sequelize.JSON,
      exitSurvey: Sequelize.TEXT,
      prechatSurvey: Sequelize.TEXT,
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
