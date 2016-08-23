const { map, forEach } = require('ramda');
const DB           = require('../db.js');
const Promise      = require('bluebird');
const Conversation = require('../models/conversation.js');

const parseConversation = require('./parse-conversation.js');
const buildParseConversationOptions = require('./build-parse-conversation-options.js');

const fetchValues = (sheet) => {
  return (cellIndex) => {
    if (sheet[cellIndex] && sheet[cellIndex].v) {
      return sheet[cellIndex].v;
    } else {
      return null;
    }
  };
};

const insertRow = ([startTime, endTime, interactionId, agentId, agentName, queue, sourceCategory, customerName, conversationString, exitSurvey]) => {
  let conversation = [];
  parseConversation(conversationString, conversation, buildParseConversationOptions([agentName, customerName]));
};

const writeCell = (sheet) => {
  return (arrayOfCellIndexes) => insertRow(map(fetchValues(sheet), arrayOfCellIndexes));
};

module.exports = writeCell;
