let selectedKey;
let sortedKey;
let sortedKeyPos;

function doProcessOnKeyCT(myKey) {
  selectedKey = myKey;
  sortedKeyPos = new Array(selectedKey.length);
  sortedKey = Array.from(selectedKey);
  let min, i, j;
  const originalKey = Array.from(selectedKey);
  let temp;
  for (i = 0; i < selectedKey.length; i++) {
    min = i;
    for (j = i; j < selectedKey.length; j++) {
      if (sortedKey[min] > sortedKey[j]) {
        min = j;
      }
    }
    if (min !== i) {
      temp = sortedKey[i];
      sortedKey[i] = sortedKey[min];
      sortedKey[min] = temp;
    }
  }

  for (i = 0; i < selectedKey.length; i++) {
    for (j = 0; j < selectedKey.length; j++) {
      if (originalKey[i] === sortedKey[j]) {
        sortedKeyPos[i] = j;
      }
    }
  }
}

function encryptionCT(plainText, myKey) {
  doProcessOnKeyCT(myKey);
  let min, i, j, k;
  const originalKey = Array.from(selectedKey);
  let temp;
  let row = Math.floor(plainText.length / selectedKey.length);
  const extrabit = plainText.length % selectedKey.length;
  const exrow = extrabit === 0 ? 0 : 1;
  let rowtemp = -1,
    coltemp = -1;
  const totallen = (row + exrow) * selectedKey.length;
  const pmat = new Array(row + exrow);
  const encry = new Array(totallen);
  let tempcnt = -1;
  row = 0;
  for (i = 0; i < totallen; i++) {
    coltemp++;
    if (i < plainText.length) {
      if (coltemp === selectedKey.length) {
        row++;
        coltemp = 0;
      }
      pmat[row] = pmat[row] || new Array(selectedKey.length);
      pmat[row][coltemp] = plainText.charAt(i);
    } else {
      pmat[row][coltemp] = '*';
    }
  }
  let len = -1;
  for (i = 0; i < selectedKey.length; i++) {
    for (k = 0; k < selectedKey.length; k++) {
      if (i === sortedKeyPos[k]) {
        break;
      }
    }
    for (j = 0; j <= row; j++) {
      len++;
      encry[len] = pmat[j][k];
    }
  }
  const p1 = encry.join('');

  return p1;
}

function decryptionCT(s, myKey) {
  doProcessOnKeyCT(myKey);
  let min, i, j, k;
  const key = Array.from(selectedKey);
  const encry = Array.from(s);
  let temp;
  const row = Math.floor(s.length / selectedKey.length);
  const pmat = new Array(row);
  let tempcnt = -1;
  for (i = 0; i < selectedKey.length; i++) {
    for (k = 0; k < selectedKey.length; k++) {
      if (i === sortedKeyPos[k]) {
        break;
      }
    }
    for (j = 0; j < row; j++) {
      tempcnt++;
      pmat[j] = pmat[j] || new Array(selectedKey.length);
      pmat[j][k] = encry[tempcnt];
    }
  }
  const p1 = [];
  k = 0;
  for (i = 0; i < row; i++) {
    for (j = 0; j < selectedKey.length; j++) {
      if (pmat[i][j] !== '*') {
        p1[k++] = pmat[i][j];
      }
    }
  }
  p1[k++] = '\0';
  return p1.join('');
}

let keyKey = 'megabuck';
const s = encryptionCT('WE ARE DISCOVERED FLEE AT ONCE', keyKey);
console.log(s);
console.log(decryptionCT(s, keyKey));

module.exports = {
  encryptionCT,
  decryptionCT
};
