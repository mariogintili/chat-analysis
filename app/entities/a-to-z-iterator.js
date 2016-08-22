const A_TO_Z = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function* AtoZIterator() {
  let index = -1;

  while (A_TO_Z.length >= index) {
    index++;
    yield A_TO_Z[index];
  }
}

module.exports = AtoZIterator;
