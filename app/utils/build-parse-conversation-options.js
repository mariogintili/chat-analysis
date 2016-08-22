const TIMESTAMP_LENGTH = require('../constants/timestamp-length.js');

var buildParseConversationOptions = (row) => {
  let opts = {};
  opts.agentName         = extractFirstName(row.agent);
  opts.clientName        = row['customer-name'];
  opts.agentLabelLength  = opts.agentName.length + TIMESTAMP_LENGTH;
  opts.clientLabelLength = row['customer-name'].length + TIMESTAMP_LENGTH;
  return opts;
};

module.exports = buildParseConversationOptions;
