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
    store.push({ isSupport, text: message });
    parseConversation(string.slice(tuples[1], string.length), store, options);
  }
};

module.exports = parseConversation;
