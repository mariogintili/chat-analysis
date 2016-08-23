const { filter } = require('ramda');

const filterForXlsxFiles = (list) => {
  return filter((filename) => filename.includes('xlsx'), list);
};

module.exports = filterForXlsxFiles;
