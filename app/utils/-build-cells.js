const { map } = require('ramda');

const _buildCells = (index, keys) => {
  return map((key) => `${key}${index}`, keys);
};

module.exports = _buildCells;
