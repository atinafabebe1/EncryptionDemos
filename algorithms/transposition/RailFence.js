export function encrypt(plaintext, rails) {
  let ciphertext = '';
  let railMatrix = Array.from(Array(rails), () => new Array(plaintext.length).fill(0));
  let row = 0;
  let col = 0;
  let down = false;
  for (let i = 0; i < plaintext.length; i++) {
    let c = plaintext.charAt(i);
    railMatrix[row][col] = c;
    col++;
    if (row === 0 || row === rails - 1) {
      down = !down;
    }
    row += down ? 1 : -1;
  }
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < plaintext.length; j++) {
      if (railMatrix[i][j] !== 0) {
        ciphertext += railMatrix[i][j];
      }
    }
  }
  return ciphertext;
}

export function decrypt(ciphertext, rails) {
  const plaintextLength = ciphertext.length;
  const railMatrix = new Array(rails);
  for (let i = 0; i < rails; i++) {
    railMatrix[i] = new Array(plaintextLength).fill('');
  }

  let row = 0;
  let col = 0;
  let down = false;

  for (let i = 0; i < plaintextLength; i++) {
    railMatrix[row][col] = '*';
    col++;
    if (row === 0 || row === rails - 1) {
      down = !down;
    }
    row += down ? 1 : -1;
  }

  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < plaintextLength; j++) {
      if (railMatrix[i][j] === '*' && index < plaintextLength) {
        railMatrix[i][j] = ciphertext.charAt(index);
        index++;
      }
    }
  }

  let plaintext = '';
  row = 0;
  col = 0;
  down = false;

  for (let i = 0; i < plaintextLength; i++) {
    if (railMatrix[row][col] !== '*') {
      plaintext += railMatrix[row][col];
    }
    col++;
    if (row === 0 || row === rails - 1) {
      down = !down;
    }
    row += down ? 1 : -1;
  }

  return plaintext;
}

// let encrypted = encrypt('HELLO world', 4);
// console.log(encrypted);
// let decrypted = decrypt(encrypted, 4);
// console.log(decrypted);
