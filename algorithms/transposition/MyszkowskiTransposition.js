function sortStringWithPositions(str) {
  // Convert the string to an array of characters
  var charArray = str.split('');

  // Create an array to store the original positions of characters
  var positionsArray = [];
  for (var i = 0; i < charArray.length; i++) {
    positionsArray[i] = i;
  }

  // Sort the character array using loops
  for (var i = 1; i < charArray.length; i++) {
    var key = charArray[i];
    var posKey = positionsArray[i];
    var j = i - 1;

    while (j >= 0 && charArray[j] > key) {
      charArray[j + 1] = charArray[j];
      positionsArray[j + 1] = positionsArray[j];
      j--;
    }

    charArray[j + 1] = key;
    positionsArray[j + 1] = posKey;
  }

  // Convert the sorted character array back to a string
  var sortedString = charArray.join('');

  return positionsArray;
}

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

function printMatrix(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    var rowString = '';
    for (var j = 0; j < matrix[i].length; j++) {
      rowString += matrix[i][j] + ' ';
    }
    console.log(rowString);
  }
}

export function encrypt(input, key) {
  console.log(input, key);
  let positionOfSorted = sortStringWithPositions(input);
  //fill matrix
  var length = input.length;
  var cols = key.length;
  var rows = Math.ceil(length / cols);
  //var matrix = new Array(rows);
  var matrix = [];
  var result = '';
  let index = 0;

  fillMatrixWithSpaces(matrix, rows, cols);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (index < length) {
        matrix[i][j] = input.charAt(index);
        index++;
      } else {
        matrix[i][j] = '*';
      }
    }
  }
  // printMatrix(matrix);
  // console.log(positionOfSorted);

  //change matrix to string
  for (var j = 0; j < positionOfSorted.length; j++) {
    var column = positionOfSorted[j];

    for (var i = 0; i < matrix.length; i++) {
      var char = matrix[i][column];
      result += char;
    }
  }
  return result;
}

export function decrypt(input, key) {
  let positionOfSorted = sortStringWithPositions(input);
  var length = input.length;
  let cols = key.length;
  let rows = Math.ceil(length / cols);
  var result = '';
  let decMatrix = [];
  let charString = positionOfSorted.join('');
  let k = 0;
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
  // printMatrix(matrix);
  //repostion columns with decrypted
  fillMatrixWithSpaces(decMatrix, rows, cols);
  for (var j = 0; j < positionOfSorted.length; j++) {
    var column = charString.indexOf(j);

    for (var i = 0; i < matrix.length; i++) {
      //build array
      decMatrix[i][k] = matrix[i][column];
    }
    k++;
  }
  //return build string;
  for (var i = 0; i < decMatrix.length; i++) {
    var row = decMatrix[i];
    result += row.join('');
  }
  return result.replace(/\*/g, '');
}

// var inputString = "TOMATO";
// var plainText = "WE ARE DISCOVERED FLEE AT ONCE";
// var encResult = encryptMyszko(plainText,inputString);
// console.log(encResult);
// let decResult = decryptionMyszko(encResult,inputString);
// console.log(decResult);
