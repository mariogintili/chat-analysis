const { range,
        map,
        forEach }  = require('ramda');

const xlsxMapping         = require('../../config/sheet-mappings.json');
const { headers }         = xlsxMapping;
const _getRowIndexes      = require('../utils/-get-row-indexes.js');
const _startAndEndIndexes = require('../utils/-start-and-end-indexes.js');
const indexToCells        = require('../utils/index-to-cells.js');

const writeCell = (sheet) => {
  return (indexCollection) => {
    let row = [];

    forEach((cellIndex) => {
      if (sheet[cellIndex]) {
        row.push(sheet[cellIndex].v);
      }
    }, indexCollection);
  }
};

const processSheetByRow = (sheet) => {
  let [
        firstCell,
        lastCell
      ]  = _getRowIndexes(sheet);

  let [
        firstIndex,
        lastIndex
      ] = _startAndEndIndexes([firstCell, lastCell]);

  let keys = Object.keys(headers);

  forEach(writeCell(sheet), map(indexToCells(keys), range(firstIndex, lastIndex)));
};

module.exports = processSheetByRow;
