const Sequelize = require('sequelize');
const fs        = require('fs');
const moment    = require('moment');
const RSVP      = require('rsvp');
// const sequelize = new Sequelize('chat_analysis_development', 'mariogintili', null, {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// const data = require('../out/parsed.json');

// const asynchronously = function(fn, ...options) {
//   return new RSVP.Promise((resolve, reject) => {
//     return fn(options, (e, ...rest) => {
//       e ? reject(e) : resolve(rest);
//     });
//   });
// }

// const Conversation = sequelize.define('conversations', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   startTime: Sequelize.INTEGER,
//   endTime: Sequelize.INTEGER,
//   interactionId: Sequelize.STRING,
//   agentId: Sequelize.STRING,
//   queue: Sequelize.STRING,
//   sourceCategory: Sequelize.STRING,
//   customerName: Sequelize.STRING,
//   email: Sequelize.STRING,
//   phone: Sequelize.STRING,
//   conversation: Sequelize.JSON,
//   exitSurvey: Sequelize.TEXT,
//   prechatSurvey: Sequelize.TEXT,
//   createdAt: {
//     type: Sequelize.DATE
//   },
//   updatedAt: {
//     type: Sequelize.DATE
//   },
// });

// let toUnixTimestamp = (string) => {
//   return moment(string).valueOf();
// };


// RSVP.all(data.map((row) => {
//   return Conversation.create({
//     startTime: toUnixTimestamp(row.startTime),
//     endTime: toUnixTimestamp(row.endTime),
//     interactionId: row.interactionId,
//     agentId: row.interactionId,
//     queue: row.queue,
//     sourceCategory: row.sourceCategory,
//     customerName: row.customerName,
//     email: row.email,
//     conversation: parseConversation(row.conversation),
//     exitSurvey: row.exitSurvey,
//     prechatSurvey: row.exitSurvey,
//   });
// })).then(() => sequelize.close());

//


var text         = "Imran(07:20:03):Good morning. You’re through to Imran in the HomeCare Department. How can I help you today?\nVisitor--950439497-5260(07:21:07):Hi I had an appointment scheduled for Monday 15th but I've had to cancel as on the app it wouldn't let me reschedule? I was having the new hive system done.\nImran(07:22:33):You're\ncurrently through to the HomeCare Department. Unfortunately I wouldn't be able\nto look into that for you but we do have a team who would absolutely be able to\nhelp. They are unavailable on web chat at the moment but you can call our Hive team directly on 0800 980 8614\nImran(07:22:53):They are also available on chat from 8am at this link: <a\n  href=\"https://www.hivehome.com/contact-us\" target=\"_blank\">https://www.hivehome.com/contact-us</a>\nVisitor--950439497-5260(07:23:14):Online does not let me bo any appointments? Not even for a breskfoe\nVisitor--950439497-5260(07:23:27):Breakdown*\nImran(07:23:31):They will be able to re-book the appointment for you. I would have been able to amend it but as it's already cancelled, I wouldn't be able to book it back in. \nImran(07:24:04):Oh okay, that's strange. Try  <a\n  href=\"http://www.britishgas.co.uk/engineer\" target=\"_blank\">clicking here</a>\n and see if this link allows you to do it,.\nVisitor--950439497-5260(07:24:18):I understand but when I try and book a call out for something else it just says no appointment \nImran(07:26:21):Did that work at all?\nVisitor--950439497-5260(07:26:23):Nope. It says technical difficulties but this has been happening for over a week\nImran(07:26:59):Oh okay, our technical open at 8am so we would have to raise it to them. \nImran(07:27:19):They'll be available on chat or you can call on 0800 048 0505.\n";
var agentName    = "Imran";
var clientName   = "Visitor--950439497-5260";
const LENGTH_OF_TIMESTAMP = 11;

var parseConversation = function(string, store = [], isSupport = true, options) {
  let tuples = [0];
  if (isSupport) {
    tuples.push(options.agentName + LENGTH_OF_TIMESTAMP);
  } else {
    tuples.push(options.clientName + LENGTH_OF_TIMESTAMP);
  }

  console.log(string.length);

  if (string.length) {
    store.push({ isSupport: isSupport, text: string.slice(tuples[0], tuples[1]) });
    parseConversation(string.slice(tuples[1], string.length), store, !isSupport, options);
  } else {
    return true;
  }
};

var array = [];
var opts  = { agentName, clientName };

parseConversation(text, array, true, opts);

console.log(array);



