const XLSX = require('xlsx');

var createXlsxSheet = (filename) => {
  let book;
  try {

    book = XLSX.readFile(filename);
  } catch (e) {
    console.log('failed to read ' + filename);
  }

  if (book) {
    return book.Sheets[book.SheetNames[0]];
  }
};

module.exports = createXlsxSheet;
