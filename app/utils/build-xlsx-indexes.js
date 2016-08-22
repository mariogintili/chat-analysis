const A_TO_Z       = require('../constants/a-to-z.js');
const xlsxMapping  = require('../../config/sheet-mappings.json');
const { headers }  = xlsxMapping;

const AVERAGE_END_OF_HEADERS = 10;
const TARGET_HEADER = 'Start Time';

const _getRowIndexes = (sheet) => {
  let firstCell, lastCell;

  A_TO_Z.some((letter) => {
    for (let i = 0;AVERAGE_END_OF_HEADERS >= i; i++) {
      let key = `${letter}${i}`;

      if ((sheet[key] !== undefined) && sheet[key].v === TARGET_HEADER) {
        firstCell = `${letter}${i + 1}`;
      }
    }

    return firstCell;
  });

  let firstCellIndex = Number(firstCell.split('')[1]);
  let columnName = firstCell.split('')[0];

  while (!lastCell) {
    let key = `${columnName}${firstCellIndex}`;

    if (sheet[key] === undefined) {
      lastCell = `${columnName}${firstCellIndex - 1}`;
    }

    firstCellIndex++;
  }

  console.log(JSON.stringify([firstCell, lastCell], null, '\t'));
};


var buildXlsxIndexes = (sheet) => {
  _getRowIndexes(sheet);
  // let indexes = _getStartAndEndIndexes(sheet);
  // let rows    = [];

  // for (let i = indexes[0]; indexes[1] >= 1; i++) {
  //   rows.push(Object.keys(headers).map(key => `${key}${i}`));
  // }

  // return rows;
};

module.exports = buildXlsxIndexes;
