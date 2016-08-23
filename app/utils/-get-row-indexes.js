const A_TO_Z = require('../constants/a-to-z.js');
const AVERAGE_END_OF_HEADERS = require('../constants/average-end-of-headers.js');
const TARGET_HEADERS = require('../constants/target-headers.js');

const _getRowIndexes = (sheet) => {
  let firstCell, lastCell;

  A_TO_Z.some((letter) => {
    for (let i = 0;AVERAGE_END_OF_HEADERS >= i; i++) {
      let key = `${letter}${i}`;

      if ((sheet[key] !== undefined) && TARGET_HEADERS.includes(sheet[key].v)) {
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

  return [firstCell, lastCell];
};

module.exports = _getRowIndexes;
