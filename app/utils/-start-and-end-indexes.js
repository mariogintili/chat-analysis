const _startAndEndIndexes = (array) => {
  return array.map((cellIndex) => Number(cellIndex.replace(/\D/g,'')));
};

module.exports = _startAndEndIndexes;
