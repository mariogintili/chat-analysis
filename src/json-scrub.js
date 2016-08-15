const fs   = require('fs');
const RSVP = require('rsvp');

const asynchronously = function(context, fn, ...options) {
  return new RSVP.Promise((resolve, reject) => {
    return fn(options, (e, ...rest) => {
      e ? reject(e) : resolve(rest);
    });
  });
}

const headers = [
                  "start-time",
                  "end-time",
                  "interaction-id",
                  "agent-id",
                  "agent",
                  "queue",
                  "source-category",
                  "customer-name",
                  "email",
                  "phone",
                  "chat-log",
                  "exit-survey",
                  "prechat-survey"
                ];

asynchronously(fn, fn.readFile, 'out/parsed.json').then((file) => {

});

