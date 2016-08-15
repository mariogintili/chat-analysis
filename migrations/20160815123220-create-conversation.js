'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('conversations', {
      id: Sequelize.INTEGER,
      'start-time': Sequelize.INTEGER,
      'end-time': Sequelize.INTEGER,
      'interaction-id': Sequelize.STRING,
      'agent-id': Sequelize.STRING,
      queue: Sequelize.STRING,
      'source-category': Sequelize.STRING,
      'customer-name': Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      conversation: Sequelize.JSON,
      'exit-survey': Sequelize.TEXT,
      'prechat-survey': Sequelize.TEXT
    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('conversations');
  }
};
