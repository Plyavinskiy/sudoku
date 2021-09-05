module.exports = function solveSudoku(matrix) {

  const matrixLength = matrix.length;
  const squareSize = Math.sqrt(matrixLength);

  function getPosition(matrix) {
    for (let i = 0; i < matrixLength; i++) {
      for (let j = 0; j < matrixLength; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }

    return null;
  }

  function checkRow(matrix, row, value) {
    for (let i = 0; i < matrixLength; i++) {
      if (matrix[row][i] === value) {
        return false;
      }
    }

    return true;
  }

  function checkColumn(matrix, column, value) {
    for (let i = 0; i < matrixLength; i++) {
      if (matrix[i][column] === value) {
        return false;
      }
    }

    return true;
  }

  function checkSquare(matrix, row, column, value) {
    const rowOfSquare = Math.floor(row / squareSize) * squareSize;
    const columnOfSquare = Math.floor(column / squareSize) * squareSize;
    const horizontalLength = rowOfSquare + squareSize;
    const verticalLength = columnOfSquare + squareSize;

    for (let i = rowOfSquare; i < horizontalLength; i++) {
      for (let j = columnOfSquare; j < verticalLength; j++) {
        if (matrix[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  function validate(matrix, position, value) {
    const [row, column] = position;

    return checkRow(matrix, row, value)
      && checkColumn(matrix, column, value)
      && checkSquare(matrix, row, column, value);
  }

  function solve() {
    const position = getPosition(matrix);

    if (!position) {
      return true;
    }

    for (let i = 1; i <= matrixLength; i++) {
      const value = i;
      const isValid = validate(matrix, position, value);

      if (isValid) {
        const [x, y] = position;
        matrix[x][y] = value;

        const isSolved = solve();

        if (isSolved) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }

    return false;
  }

  solve();

  return matrix;
}
