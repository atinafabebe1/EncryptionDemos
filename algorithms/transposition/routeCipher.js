function fillMatrixWithSpaces(matrix, rows, cols) {
  //fill matrix to decryption purpose
  for (var i = 0; i < rows; i++) {
    var row = [];
    for (var j = 0; j < cols; j++) {
      row.push('*');
    }
    matrix.push(row);
  }
  return matrix;
}

function fillMatrix(input, rows, cols) {
  //enter the input in matrix of 2*2
  var length = input.length;
  var matrix = [];
  fillMatrixWithSpaces(matrix, rows, cols);
  let index = 0;

  for (var j = 0; j < cols; j++) {
    for (var i = 0; i < rows; i++) {
      if (index < length) {
        matrix[i][j] = input.charAt(index);
        index++;
      } else {
        break;
      }
    }
  }
  return matrix;
}

function printMatrix(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    var rowString = '';
    for (var j = 0; j < matrix[i].length; j++) {
      rowString += matrix[i][j] + ' ';
    }
    console.log(rowString);
  }
}

export function encrypt(plaintext, row, col) {
  var matrix = fillMatrix(plaintext, row, col);
  let encryptedText = '';
  var dir = 1;
  var downCn = col - 1;
  var rightCn = 0;
  var leftCn = row - 1;
  var upCn = 0;
  //printMatrix(matrix);

  while (true) {
    if (dir === 1) {
      //down
      for (var i = rightCn; i <= leftCn; i++) {
        encryptedText += matrix[i][downCn];
      }
      if (downCn === upCn) {
        break;
      }
      downCn--;
      dir = 2;
      continue;
    } else if (dir === 2) {
      //left
      for (var i = downCn; i >= upCn; i--) {
        encryptedText += matrix[leftCn][i];
      }
      if (leftCn === rightCn) {
        break;
      }
      leftCn--;
      dir = 3;
      continue;
    } else if (dir === 3) {
      //up
      for (var i = leftCn; i >= rightCn; i--) {
        encryptedText += matrix[i][upCn];
      }
      if (downCn === upCn) {
        break;
      }
      upCn++;
      dir = 4;
      continue;
    } else if (dir === 4) {
      //right
      for (var i = upCn; i <= downCn; i++) {
        encryptedText += matrix[rightCn][i];
      }
      if (leftCn === rightCn) {
        break;
      }
      rightCn++;
      dir = 1;
      continue;
    }
  }

  return encryptedText;
}

export function decrypt(encrypted, rows, cols) {
  var matrix = [];
  fillMatrixWithSpaces(matrix, rows, cols);
  var index = 0;
  var dir = 1;
  var downCn = cols - 1;
  var rightCn = 0;
  var leftCn = rows - 1;
  var upCn = 0;
  var result = '';

  while (true) {
    if (dir === 1) {
      //down
      for (var i = rightCn; i <= leftCn; i++) {
        matrix[i][downCn] = encrypted.charAt(index++);
      }
      if (downCn === upCn) {
        break;
      }
      downCn--;
      dir = 2;
      continue;
    } else if (dir === 2) {
      //left
      for (var i = downCn; i >= upCn; i--) {
        matrix[leftCn][i] = encrypted.charAt(index++);
      }
      if (leftCn === rightCn) {
        break;
      }
      leftCn--;
      dir = 3;
      continue;
    } else if (dir === 3) {
      //up
      for (var i = leftCn; i >= rightCn; i--) {
        matrix[i][upCn] = encrypted.charAt(index++);
      }
      if (downCn === upCn) {
        break;
      }
      upCn++;
      dir = 4;
      continue;
    } else if (dir === 4) {
      //right
      for (var i = upCn; i <= downCn; i++) {
        matrix[rightCn][i] = encrypted.charAt(index++);
      }
      if (leftCn === rightCn) {
        break;
      }
      rightCn++;
      dir = 1;
      continue;
    }
  }
  //printMatrix(matrix);
  for (var j = 0; j < matrix[0].length; j++) {
    for (var i = 0; i < matrix.length; i++) {
      var value = matrix[i][j];
      result += value;
    }
  }

  return result.replace(/\*/g, '');
}

// var input = "Kill the queen of england";
// let row = 5;
// let col = 6;
// var encrypted = encrypteRoute(input, row, col);
// console.log("Encrypted: " + encrypted);
// let decrypted = decryptRoute(encrypted, row, col);
// console.log("Decrypted: " + decrypted);
