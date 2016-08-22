const fs                            = require('fs');
const Sequelize                     = require('sequelize');
const moment                        = require('moment');
const Promise                       = require("bluebird");
const data                          = require('../out/parsed.json');
const DB                            = require('../app/db.js');
const Conversation                  = require('../app/models/conversation.js');
const parseConversation             = require('../app/utils/parse-conversation.js');
const extractFirstName              = require('../app/utils/extract-first-name.js');
const buildParseConversationOptions = require('../app/utils/build-parse-conversation-options.js');
const R                             = require('ramda');
const createXlsxSheet               = require('../app/utils/create-xlsx-sheet.js');
const buildXlsxIndexes              = require('../app/utils/build-xlsx-indexes.js');

// const AVERAGE_END_OF_HEADERS        = 10;
// const TARGET_HEADER                 = 'Start Time';
// let sheet = createXlsxSheet('data/Transcript-20160810.xlsx');

// let firstOne;
// let lastOne;

// A_TO_Z.some((letter) => {
//   for (let i = 0;AVERAGE_END_OF_HEADERS >= i; i++) {
//     let key = `${letter}${i}`;

//     if ((sheet[key] !== undefined) && sheet[key].v === TARGET_HEADER) {
//       firstOne = `${letter}${i + 1}`;
//       console.log(firstOne);
//     }
//   }

//   return firstOne;
// });

// let lastOneIndex = Number(firstOne.split('')[1]);
// let columnName = firstOne.split('')[0];

// while (!lastOne) {
//   let key = `${columnName}${lastOneIndex}`;

//   if (sheet[key] === undefined) {
//     lastOne = `${columnName}${lastOneIndex - 1}`;
//     console.log(lastOne);
//   }

//   lastOneIndex++;
// }

let parseableFiles = fs.readdirSync('data').filter((filename) => filename.includes('xlsx')).map((filename) => {
  return `data/${filename}`;
});

// console.log(parseableFiles);
parseableFiles.map(createXlsxSheet).forEach(buildXlsxIndexes);

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
