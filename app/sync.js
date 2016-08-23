const fs                 = require('fs');
const { pipe, forEach }  = require('ramda');
const createXlsxSheet    = require('../app/utils/create-xlsx-sheet.js');
const processSheetByRow  = require('../app/utils/process-sheet-by-row.js');
const filterForXlsxFiles = require('../app/utils/filter-for-xlsx-files.js');

forEach(pipe(createXlsxSheet, processSheetByRow), filterForXlsxFiles(fs.readdirSync('data')).slice(0,1));
