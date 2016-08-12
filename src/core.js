'use strict';


const fs   = require('fs');
const RSVP = require('rsvp');

const asynchronously = function(fn, ...options) {
  return new RSVP.Promise((resolve, reject) => {
    return fn(...options, (e, ...else) => {
      e ? reject(e) : resolve(...else);
    });
  });
}

asynchronously(fs.stat, '/tmp/whatever').then().catch();
