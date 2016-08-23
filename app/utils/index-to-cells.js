const _buildCells = require('./-build-cells.js');

const indexToCells = (keys) => {
  return (index) => _buildCells(index, keys);
};

module.exports = indexToCells;
