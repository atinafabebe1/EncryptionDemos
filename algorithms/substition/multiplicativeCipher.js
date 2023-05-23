export function encrypt(message, key) {
  var encryptedMessage = '';

  for (var i = 0; i < message.length; i++) {
    var charCode = message.charCodeAt(i);

    // Skip non-alphabetic characters
    if (charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122) {
      encryptedMessage += message.charAt(i);
      continue;
    }

    var isLowerCase = false;

    if (charCode >= 97) {
      charCode -= 32;
      isLowerCase = true;
    }

    var encryptedCharCode = (((charCode - 65) * key) % 26) + 65;

    if (isLowerCase) {
      encryptedCharCode += 32; // Convert back to lowercase
    }

    encryptedMessage += String.fromCharCode(encryptedCharCode);
  }

  return encryptedMessage;
}

export function decrypt(encryptedMessage, key) {
  // Calculate the modular multiplicative inverse of the key
  var inverseKey = -1;

  for (var i = 0; i < 26; i++) {
    if ((key * i) % 26 === 1) {
      inverseKey = i;
      break;
    }
  }

  if (inverseKey === -1) {
    console.log('Invalid key. Modular multiplicative inverse does not exist.');
    return;
  }

  var decryptedMessage = '';

  for (var i = 0; i < encryptedMessage.length; i++) {
    var charCode = encryptedMessage.charCodeAt(i);

    // Skip non-alphabetic characters
    if (charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122) {
      decryptedMessage += encryptedMessage.charAt(i);
      continue;
    }

    var isLowerCase = false;

    if (charCode >= 97) {
      charCode -= 32; // Convert lowercase to uppercase
      isLowerCase = true;
    }

    var decryptedCharCode = ((charCode - 65) * inverseKey) % 26;

    decryptedCharCode += 65;

    if (isLowerCase) {
      decryptedCharCode += 32; // Convert back to lowercase
    }

    decryptedMessage += String.fromCharCode(decryptedCharCode);
  }

  return decryptedMessage;
}
