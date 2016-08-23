const TIMESTAMP_LENGTH = require('../constants/timestamp-length.js');
const extractFirstName = require('./extract-first-name.js');

var buildParseConversationOptions = ([agentName, clientName]) => {
  let opts = {};
  opts.agentName         = extractFirstName(agentName);
  opts.clientName        = clientName;
  opts.agentLabelLength  = opts.agentName.length + TIMESTAMP_LENGTH;
  opts.clientLabelLength = clientName.length + TIMESTAMP_LENGTH;
  return opts;
};

module.exports = buildParseConversationOptions;
