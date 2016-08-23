const A_TO_Z         = require('../constants/a-to-z.js');
const xlsxMapping    = require('../../config/sheet-mappings.json');
const _getRowIndexes = require('../utils/-get-row-indexes.js');

const { headers }    = xlsxMapping;
const { range,
        splitEvery,
        map,
        forEach,
        pipe }  = require('ramda');


const _getStartAndEndIndexes = (array) => {
  return array.map((cellIndex) => Number(cellIndex.replace(/\D/g,'')));
};

const _buildCells = (index, keys) => {
  return keys.map((key) => `${key}${index}`);
};

const indexToCells = (keys) => {
  return (index) => _buildCells(index, keys);
};

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

var processSheetByRow = (sheet) => {
  let [
        firstCell,
        lastCell
      ]  = _getRowIndexes(sheet);

  let [
        firstIndex,
        lastIndex
      ] = _getStartAndEndIndexes([firstCell, lastCell]);

  let keys = Object.keys(headers);

  forEach(writeCell(sheet), map(indexToCells(keys), range(firstIndex, lastIndex)));
};

module.exports = processSheetByRow;
