const Sequelize           = require('sequelize');
const moment              = require('moment');
const Promise             = require("bluebird");
const data                = require('../out/parsed.json');
const DB                  = require('../app/db.js');
const Conversation        = require('../app/models/conversation.js');
const parseConversation   = require('../app/utils/parse-conversation.js');
const LENGTH_OF_TIMESTAMP = 11;

// TODO: extract these fns to a separate, namespaced file
let extractFirstName = (string) => string.split(' ')[0];
let buildParseCoversationOptions = (row) => {
  let opts = {};
  opts.agentName         = extractFirstName(row.agent);
  opts.clientName        = row['customer-name'];
  opts.agentLabelLength  = opts.agentName.length + LENGTH_OF_TIMESTAMP;
  opts.clientLabelLength = row['customer-name'].length + LENGTH_OF_TIMESTAMP;
  return opts;
};

DB.sync().then(() => {
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
}).then(() => DB.close());
