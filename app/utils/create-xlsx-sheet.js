const XLSX = require('xlsx');

const createXlsxSheet = (filename) => {
  let book;
  try {

    book = XLSX.readFile(`data/${filename}`);
    console.log(`data/${filename}`);

  } catch (e) {
    console.log('failed to read ' + filename);
  }

  if (book) {
    return book.Sheets[book.SheetNames[0]];
  }
};

module.exports = createXlsxSheet;
