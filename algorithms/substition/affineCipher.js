export function encrypt(message, a, b) {
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
      charCode -= 32; // Convert lowercase to uppercase
      isLowerCase = true;
    }

    var encryptedCharCode = (a * (charCode - 65) + b) % 26;
    encryptedCharCode += 65;

    if (isLowerCase) {
      encryptedCharCode += 32; // Convert back to lowercase
    }
    console.log(encryptedMessage);
    encryptedMessage += String.fromCharCode(encryptedCharCode);
  }

  return encryptedMessage;
}

export function decrypt(encryptedMessage, a, b) {
  console.log('message' + encryptedMessage);
  console.log('a' + a);
  console.log('b' + b);
  // Calculate the modular multiplicative inverse of a
  var inverseA = -1;

  for (var i = 0; i < 26; i++) {
    if ((a * i) % 26 === 1) {
      inverseA = i;
      break;
    }
  }

  if (inverseA === -1) {
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

    var decryptedCharCode = (inverseA * (charCode - 65 - b + 26)) % 26;

    if (decryptedCharCode < 0) {
      decryptedCharCode += 26;
    }

    decryptedCharCode += 65;

    if (isLowerCase) {
      decryptedCharCode += 32; // Convert back to lowercase
    }

    decryptedMessage += String.fromCharCode(decryptedCharCode);
  }

  return decryptedMessage;
}
