'use strict';

const Sequelize          = require('sequelize');
const moment             = require('moment');
const Promise            = require("bluebird");
const data               = require('../out/parsed.json');
const { development }    = require('../config/config.json');
const sequelize          = new Sequelize(development.database, development.username, development.password, { host: development.host, dialect: development.dialect });

// utils
const LENGTH_OF_TIMESTAMP = 11;
let toUnixTimestamp  = (string) => moment(string).valueOf();
let extractFirstName = (string) => string.split(' ')[0];
let buildParseCoversationOptions = (row) => {
  let opts = {};

  opts.agentName         = extractFirstName(row.agent);
  opts.clientName        = row['customer-name'];
  opts.agentLabelLength  = opts.agentName.length + LENGTH_OF_TIMESTAMP;
  opts.clientLabelLength = row['customer-name'].length + LENGTH_OF_TIMESTAMP;
  return opts;
};

const Conversation = sequelize.define('conversations', {
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

var parseConversation = function(str, store, options) {
  let tuples = [];
  let string = String(str);
  let indexOfAgent  = string.indexOf(options.agentName);
  let indexOfClient = string.indexOf(options.clientName);
  let isSupport = indexOfClient > indexOfAgent;

  if (isSupport) {
    tuples.push(options.agentLabelLength);
    tuples.push(indexOfClient);
  } else {
    tuples.push(options.clientLabelLength);
    tuples.push(indexOfAgent);
  }

  let message = string.slice(tuples[0], tuples[1]);

  if ((0 > indexOfClient && message === '') || (0 > indexOfAgent && message === '')) {
    return;
  } else {
    store.push({ isSupport: isSupport, text: message });
    parseConversation(string.slice(tuples[1], string.length), store, options);
  }
};

sequelize.sync().then(() => {
  return Promise.all(data.map((row) => {
    var conversation = [];
    parseConversation(row['chat-log'], conversation, buildParseCoversationOptions(row));
    return Conversation.create({
      startTime: row['start-time'],
      endTime: row['end-time'],
      interactionId: row['interaction-id'],
      agentId: row['agent-id'],
      queue: row.queue,
      sourceCategory: row['source-category'],
      customerName: row['customer-name'],
      conversation: JSON.stringify(conversation),
      exitSurvey: row['exit-survey'],
    });
  }));
}).then(() => sequelize.close());


