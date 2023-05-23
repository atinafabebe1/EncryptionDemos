function getDeterminant(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

// Function to calculate the modular inverse of a number
function getModularInverse(num, modulus) {
  num = ((num % modulus) + modulus) % modulus; // Ensure positive value
  for (let x = 1; x < modulus; x++) {
    if ((num * x) % modulus === 1) {
      return x;
    }
  }
  return 1;
}

export function encrypt(plaintext, key) {
  const matrixKey = [
    [key[0], key[1]],
    [key[2], key[3]]
  ];

  // Convert plaintext to uppercase and remove non-alphabetic characters
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  const plaintextLength = plaintext.length;

  // Padding the plaintext if necessary
  if (plaintextLength % 2 !== 0) {
    plaintext += 'X';
  }

  const ciphertext = [];
  let currentIndex = 0;
  for (let i = 0; i < plaintextLength; i += 2) {
    const pair1 = plaintext.charCodeAt(i) - 65; // Convert character to ASCII and shift to 0-25
    const pair2 = plaintext.charCodeAt(i + 1) - 65;
    const result = [(matrixKey[0][0] * pair1 + matrixKey[0][1] * pair2) % 26, (matrixKey[1][0] * pair1 + matrixKey[1][1] * pair2) % 26];

    ciphertext[currentIndex] = String.fromCharCode(result[0] + 65); // Convert back to character
    ciphertext[currentIndex + 1] = String.fromCharCode(result[1] + 65);

    currentIndex += 2;
  }

  return ciphertext.join('');
}

// Function to decrypt ciphertext using Hill cipher
export function decrypt(ciphertext, key) {
  const matrixKey = [
    [key[0], key[1]],
    [key[2], key[3]]
  ];

  const determinant = getDeterminant(matrixKey);
  const modularInverse = getModularInverse(determinant, 26);

  // Calculate the adjugate of the key matrix
  const adjugate = [
    [matrixKey[1][1], -matrixKey[0][1]],
    [-matrixKey[1][0], matrixKey[0][0]]
  ];

  // Calculate the inverse of the key matrix
  const inverse = [];
  for (let i = 0; i < 2; i++) {
    inverse[i] = [];
    for (let j = 0; j < 2; j++) {
      let value = adjugate[i][j] * modularInverse;
      value = ((value % 26) + 26) % 26; // Ensure positive value
      inverse[i][j] = value;
    }
  }

  const ciphertextLength = ciphertext.length;
  const plaintext = [];
  let spaceCount = 0; // Track the number of spaces encountered
  for (let i = 0; i < ciphertextLength; i += 2) {
    if (ciphertext[i] === ' ') {
      plaintext.push(' ');
      spaceCount++;
    } else {
      const pair1 = ciphertext.charCodeAt(i) - 65;
      const pair2 = ciphertext.charCodeAt(i + 1) - 65;
      const result = [(inverse[0][0] * pair1 + inverse[0][1] * pair2) % 26, (inverse[1][0] * pair1 + inverse[1][1] * pair2) % 26];

      const char1 = String.fromCharCode(result[0] + 65);
      const char2 = String.fromCharCode(result[1] + 65);

      // Check if the original plaintext character was lowercase
      if (ciphertext[i].toLowerCase() === ciphertext[i]) {
        plaintext.push(char1.toLowerCase());
        plaintext.push(char2.toLowerCase());
      } else {
        plaintext.push(char1);
        plaintext.push(char2);
      }
    }
  }

  // Add any trailing spaces back to the plaintext
  for (let i = 0; i < spaceCount; i++) {
    plaintext.push(' ');
  }

  // Remove any trailing 'X' if necessary
  if (plaintext[plaintext.length - 1] === 'X') {
    plaintext.pop();
  }

  return plaintext.join('');
}

// Example usage
// const plaintext = 'This isx a trail';
// const key = [3, 2, 5, 7];

// const ciphertext = hillEncrypt(plaintext, key);
// console.log('Ciphertext:', ciphertext);

// const decryptedText = hillDecrypt(ciphertext, key);
// console.log('Decrypted text:', decryptedText);
