const fs                 = require('fs');
const createXlsxSheet    = require('../app/utils/create-xlsx-sheet.js');
const processSheetByRow  = require('../app/utils/process-sheet-by-row.js');
const filterForXlsxFiles = require('../app/utils/filter-for-xlsx-files.js');
const { pipe, forEach, splitEvery }  = require('ramda');

let groupsOfFiles    = splitEvery(3, filterForXlsxFiles(fs.readdirSync('data')).sort());
let createAndProcess = pipe(createXlsxSheet, processSheetByRow);

forEach((fileList) => forEach(createAndProcess, fileList), groupsOfFiles);
