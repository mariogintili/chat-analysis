'use strict';

const fs           = require('fs');
const RSVP         = require('rsvp');
const XLSX         = require('xlsx');
const ObjectValues = require('object-values');

const asynchronously = function(fn, ...options) {
  return new RSVP.Promise((resolve, reject) => {
    return fn(options, (e, ...rest) => {
      e ? reject(e) : resolve(rest);
    });
  });
}

// TODO, get all transcripts rather than just one
const workbook = XLSX.readFile('data/transcript-20160810.xlsx');

const sheet    = workbook.Sheets[workbook.SheetNames[0]];
const rows     = [];
const headers  = {
  E: 'start-time',
  F: 'end-time',
  G: 'interaction-id',
  H: 'agent-id',
  J: 'agent',
  K: 'queue',
  L: 'source-category',
  M: 'customer-name',
  N: 'email',
  O: 'phone',
  P: 'chat-log',
  Q: 'exit-survey',
  R: 'prechat-survey'
};
const documentIds = ObjectValues(headers);
const out = [];


// Sheet relevant values
// This is because the data source doesn't have headers
// E-R
// 6-2169
const SHEET_RELEVANT_VALUES_LENGTH = 2169;
const INITIAL_SHEET_VALUE = 6;

for (let i = INITIAL_SHEET_VALUE; SHEET_RELEVANT_VALUES_LENGTH >= i; i++) {
  rows.push(Object.keys(headers).map(key => `${key}${i}`));
}

rows.forEach((row) => {
  let parsedDocument = {};

  row.forEach((cellId, i) => {
    let value = sheet[cellId];
    if (typeof value !== 'undefined' && value.v) {
      parsedDocument[documentIds[i]] = value.v;
    }
  });

  out.push(parsedDocument);
});

fs.writeFileSync('out/parsed.json', JSON.stringify(out, null, '\t'), 'utf8');
