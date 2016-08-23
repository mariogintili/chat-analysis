const fs                            = require('fs');
const Promise                       = require("bluebird");
const data                          = require('../out/parsed.json');
const DB                            = require('../app/db.js');
const Conversation                  = require('../app/models/conversation.js');
const parseConversation             = require('../app/utils/parse-conversation.js');
const buildParseConversationOptions = require('../app/utils/build-parse-conversation-options.js');
const { pipe, forEach }             = require('ramda');
const createXlsxSheet               = require('../app/utils/create-xlsx-sheet.js');
const processSheetByRow             = require('../app/utils/process-sheet-by-row.js');
const filterForXlsxFiles            = require('../app/utils/filter-for-xlsx-files.js');

let parseableFiles = filterForXlsxFiles(fs.readdirSync('data'));

forEach(pipe(createXlsxSheet, processSheetByRow), parseableFiles);

// DB.sync().then(() => {
//   return Promise.all(data.map((row) => {
//     var conversation = [];
//     parseConversation(row['chat-log'], conversation, buildParseCoversationOptions(row));
//     return Conversation.create({
//       startTime: row['start-time'],
//       endTime: row['end-time'],
//       interactionId: row['interaction-id'],
//       agentId: row['agent-id'],
//       queue: row.queue,
//       sourceCategory: row['source-category'],
//       customerName: row['customer-name'],
//       conversation: JSON.stringify(conversation),
//       exitSurvey: row['exit-survey'],
//     });
//   }));
// }).then(() => DB.close());
