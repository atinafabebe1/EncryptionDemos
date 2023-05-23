export function encrypt(message, key) {
  var encryptedMessage = '';

  for (var i = 0; i < message.length; i++) {
    var char = message[i];

    // Skip non-alphabetic characters
    if (!char.match(/[A-Za-z]/)) {
      encryptedMessage += char;
      continue;
    }

    var isLowerCase = char === char.toLowerCase();
    var charCode = char.toUpperCase().charCodeAt(0);
    var keyCharCode = key[i % key.length].toUpperCase().charCodeAt(0);

    var encryptedCharCode = ((charCode - 65 + keyCharCode - 65) % 26) + 65;

    if (isLowerCase) {
      encryptedCharCode += 32; // Convert back to lowercase
    }

    encryptedMessage += String.fromCharCode(encryptedCharCode);
  }

  return encryptedMessage;
}

export function decrypt(encryptedMessage, key) {
  var decryptedMessage = '';

  for (var i = 0; i < encryptedMessage.length; i++) {
    var char = encryptedMessage[i];

    // Skip non-alphabetic characters
    if (!char.match(/[A-Za-z]/)) {
      decryptedMessage += char;
      continue;
    }

    var isLowerCase = char === char.toLowerCase();
    var charCode = char.toUpperCase().charCodeAt(0);
    var keyCharCode = key[i % key.length].toUpperCase().charCodeAt(0);

    var decryptedCharCode = ((charCode - 65 - keyCharCode + 26) % 26) + 65;

    if (isLowerCase) {
      decryptedCharCode += 32; // Convert back to lowercase
    }

    decryptedMessage += String.fromCharCode(decryptedCharCode);
  }

  return decryptedMessage;
}
