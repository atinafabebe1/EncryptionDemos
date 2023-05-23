function generateKeyTable(key) {
  const keyTable = [];
  const keySet = new Set();
  let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

  // Remove duplicate characters from the key and add them to the key set
  key = key.toUpperCase().replace(/J/g, 'I');
  key = key.replace(/[^A-Z]/g, '');
  key = Array.from(new Set(key)); // Remove duplicate characters
  key = key.join('');

  // Generate the key table
  let row = [];
  key.split('').forEach((char) => {
    if (!keySet.has(char)) {
      row.push(char);
      keySet.add(char);
      if (row.length === 5) {
        keyTable.push(row);
        row = [];
      }
    }
  });

  // Add remaining alphabet characters to the key table
  alphabet.split('').forEach((char) => {
    if (!keySet.has(char)) {
      row.push(char);
      if (row.length === 5) {
        keyTable.push(row);
        row = [];
      }
    }
  });

  return keyTable;
}

function generatePairs(message) {
  const pairs = [];
  let i = 0;
  message = message.toUpperCase().replace(/J/g, 'I');
  message = message.replace(/[^A-Z]/g, '');

  while (i < message.length) {
    let pair = message[i];
    if (i === message.length - 1 || pair === message[i + 1]) {
      pair += 'X';
      i++;
    } else {
      pair += message[i + 1];
      i += 2;
    }
    pairs.push(pair);
  }

  return pairs;
}

export function encrypt(message, key) {
  console.log(message, key);
  const keyTable = generateKeyTable(key);
  const pairs = generatePairs(message);
  let playFairEncryptedMessage = '';

  pairs.forEach((pair) => {
    const [char1, char2] = pair;
    let row1, col1, row2, col2;

    keyTable.forEach((row, rowIndex) => {
      const colIndex1 = row.indexOf(char1);
      if (colIndex1 !== -1) {
        row1 = rowIndex;
        col1 = colIndex1;
      }

      const colIndex2 = row.indexOf(char2);
      if (colIndex2 !== -1) {
        row2 = rowIndex;
        col2 = colIndex2;
      }
    });

    let playFairEncryptedPair = '';
    if (row1 === row2) {
      // Same row
      playFairEncryptedPair += keyTable[row1][(col1 + 1) % 5];
      playFairEncryptedPair += keyTable[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      // Same column
      playFairEncryptedPair += keyTable[(row1 + 1) % 5][col1];
      playFairEncryptedPair += keyTable[(row2 + 1) % 5][col2];
    } else {
      // Different row and column
      playFairEncryptedPair += keyTable[row1][col2];
      playFairEncryptedPair += keyTable[row2][col1];
    }

    playFairEncryptedMessage += playFairEncryptedPair;
  });

  return playFairEncryptedMessage;
}

export function decrypt(ciphertext, key) {
  const keyTable = generateKeyTable(key);
  const pairs = generatePairs(ciphertext);
  let decryptedMessage = '';

  pairs.forEach((pair) => {
    const [char1, char2] = pair;
    let row1, col1, row2, col2;

    keyTable.forEach((row, rowIndex) => {
      const colIndex1 = row.indexOf(char1);
      if (colIndex1 !== -1) {
        row1 = rowIndex;
        col1 = colIndex1;
      }

      const colIndex2 = row.indexOf(char2);
      if (colIndex2 !== -1) {
        row2 = rowIndex;
        col2 = colIndex2;
      }
    });

    let decryptedPair = '';
    if (row1 === row2) {
      // Same row
      decryptedPair += keyTable[row1][(col1 + 4) % 5];
      decryptedPair += keyTable[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      // Same column
      decryptedPair += keyTable[(row1 + 4) % 5][col1];
      decryptedPair += keyTable[(row2 + 4) % 5][col2];
    } else {
      // Different row and column
      decryptedPair += keyTable[row1][col2];
      decryptedPair += keyTable[row2][col1];
    }

    decryptedMessage += decryptedPair;
  });

  // Remove unnecessary 'X' characters
  if (ciphertext.endsWith('X')) {
    decryptedMessage = decryptedMessage.slice(0, -1);
  }

  return decryptedMessage.toLowerCase();
}
