import * as caesarCipher from './algorithms/substition/caesarCipher.js';
import * as hillCipher from './algorithms/substition/hillCipher.js';
import * as affineCipher from './algorithms/substition/affineCipher.js';
import * as multiplicativeCipher from './algorithms/substition/multiplicativeCipher.js';
import * as playFairCipher from './algorithms/substition/playFairCipher.js';
import * as vernamCipher from './algorithms/substition/vernamCipher.js';
import * as vigenereCipher from './algorithms/substition/vigenereCipher.js';
import * as columTranspostion from './algorithms/transposition/ColumTranspostion.js';
import * as railFence from './algorithms/transposition/RailFence.js';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('encrypt-btn').addEventListener('click', encryptText);
  document.getElementById('decrypt-btn').addEventListener('click', decryptText);
});

function createKey(selectedAlgorithm, keyInput) {
  switch (selectedAlgorithm) {
    case 'caesar':
      return parseInt(keyInput);
    case 'hill':
      // Parse the key input as an array of numbers
      return keyInput.split(',').map(Number);
    case 'affine':
      // Parse the key input as an object with 'a' and 'b' properties
      const [a, b] = keyInput.split(',');
      return { a: parseInt(a), b: parseInt(b) };
    case 'multiplicative':
      return parseInt(keyInput);
    case 'playfair':
      return keyInput;
    case 'vernam':
      return keyInput;
    case 'vigenere':
      return keyInput;
    case 'railfence':
      return parseInt(keyInput);
    case 'columnTransposition':
      return keyInput;
    default:
      return null;
  }
}

function encryptText() {
  var inputText = document.getElementById('input-text').value;
  var keyInput = document.getElementById('key').value;
  var algorithmSelect = document.getElementById('algorithm-select');
  var selectedAlgorithm = algorithmSelect.value;

  var encryptedText;
  var key = createKey(selectedAlgorithm, keyInput);

  if (key === null) {
    encryptedText = 'Invalid algorithm selected.';
  } else {
    switch (selectedAlgorithm) {
      case 'caesar':
        encryptedText = caesarCipher.encrypt(inputText, key);
        break;
      case 'hill':
        encryptedText = hillCipher.encrypt(inputText, key);
        break;
      case 'affine':
        console.log(key);
        encryptedText = affineCipher.encrypt(inputText, key.a, key.b);
        break;
      case 'multiplicative':
        encryptedText = multiplicativeCipher.encrypt(inputText, key);
        break;
      case 'playfair':
        encryptedText = playFairCipher.encrypt(inputText, key);
        break;
      case 'vernam':
        encryptedText = vernamCipher.encrypt(inputText, key);
        break;
      case 'vigenere':
        encryptedText = vigenereCipher.encrypt(inputText, key);
        break;
      case 'railfence':
        console.log(inputText, key);
        encryptedText = railFence.encrypt(inputText, key);
        break;
      case 'columnTransposition':
        encryptedText = columTranspostion.encrypt(inputText, key);
        break;
      default:
        encryptedText = 'Invalid algorithm selected.';
    }
  }

  // Display the encrypted text
  var outputElement = document.getElementById('output');
  outputElement.innerHTML = '<strong>Encrypted Text:</strong> ' + encryptedText;
}

function decryptText() {
  var inputText = document.getElementById('input-text').value;
  var keyInput = document.getElementById('key').value;
  var algorithmSelect = document.getElementById('algorithm-select');
  var selectedAlgorithm = algorithmSelect.value;

  var decryptedText;
  var key = createKey(selectedAlgorithm, keyInput);

  if (key === null) {
    decryptedText = 'Invalid algorithm selected.';
  } else {
    switch (selectedAlgorithm) {
      case 'caesar':
        decryptedText = caesarCipher.decrypt(inputText, key);
        break;
      case 'hill':
        decryptedText = hillCipher.decrypt(inputText, key);
        break;
      case 'affine':
        decryptedText = affineCipher.decrypt(inputText, key.a, key.b);
        break;
      case 'multiplicative':
        decryptedText = multiplicativeCipher.decrypt(inputText, key);
        break;
      case 'playfair':
        decryptedText = playFairCipher.decrypt(inputText, key);
        break;
      case 'vernam':
        decryptedText = vernamCipher.decrypt(inputText, key);
        break;
      case 'vigenere':
        decryptedText = vigenereCipher.decrypt(inputText, key);
        break;
      case 'railfence':
        decryptedText = railFence.decrypt(inputText, key);
        break;
      case 'columnTransposition':
        decryptedText = columTranspostion.decrypt(inputText, key);
        break;
      default:
        decryptedText = 'Invalid algorithm selected.';
    }
  }

  // Display the decrypted text
  var outputElement = document.getElementById('output');
  outputElement.innerHTML = '<strong>Decrypted Text:</strong> ' + decryptedText;
}
