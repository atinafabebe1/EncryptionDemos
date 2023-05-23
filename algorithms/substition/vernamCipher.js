export function encrypt(plaintext, key) {
  if (plaintext.length !== key.length) {
    console.log(plaintext.length);
    console.log(key.length);
    throw new Error('Plaintext and key must have the same length.');
  }

  let ciphertext = '';

  for (let i = 0; i < plaintext.length; i++) {
    let plaintextCharCode = plaintext.charCodeAt(i);
    let keyCharCode = key.charCodeAt(i);
    let encryptedCharCode = (plaintextCharCode ^ keyCharCode) % 256;
    let encryptedChar = String.fromCharCode(encryptedCharCode);
    ciphertext += encryptedChar;
  }

  return ciphertext;
}

export function decrypt(ciphertext, key) {
  if (ciphertext.length !== key.length) {
    throw new Error('Ciphertext and key must have the same length.');
  }

  let plaintext = '';

  for (let i = 0; i < ciphertext.length; i++) {
    let ciphertextCharCode = ciphertext.charCodeAt(i);
    let keyCharCode = key.charCodeAt(i);
    let decryptedCharCode = (ciphertextCharCode ^ keyCharCode) % 256;
    let decryptedChar = String.fromCharCode(decryptedCharCode);
    plaintext += decryptedChar;
  }

  return plaintext;
}

// Example usage
// let plaintext = 'Hello,world!';
// let key = 'SecretKey122';

// try {
// Encryption
//   let encryptedText = encrypt(plaintext, key);
//   console.log('Encrypted: ' + encryptedText);

// Decryption
//   let decryptedText = decrypt(encryptedText, key);
//   console.log('Decrypted: ' + decryptedText);
// } catch (error) {
//   console.error(error.message);
// }
