const Sequelize = require('sequelize');
const DB        = require('../db.js');

const Conversation = DB.define('conversations', {
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

module.exports = Conversation;
