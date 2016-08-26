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

const insertRow = ([startTime, endTime, interactionId, agentId, agentName, queue, sourceCategory, customerName, _email, _phone, conversationString, exitSurvey]) => {
  let conversation = [];
  if (conversationString) {
    parseConversation(conversationString, conversation, buildParseConversationOptions([agentName, customerName]));
  }
  DB.sync().then(() => {
    Promise.resolve(Conversation.create({
      startTime,
      endTime,
      interactionId,
      agentId,
      agentName,
      queue,
      sourceCategory,
      customerName,
      conversation: JSON.stringify(conversation),
      exitSurvey
    }));
  });
};

const writeCell = (sheet) => {
  return (arrayOfCellIndexes) => {
    return insertRow(map(fetchValues(sheet), arrayOfCellIndexes));
  };
};

module.exports = writeCell;
