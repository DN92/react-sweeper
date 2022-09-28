function invertCase(text) {
  const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER_CASE = 'ABCDFFGHIJKLMNOPQRSTUVWXYZ';

  let tempString = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (LOWER_CASE.indexOf(char) !== -1) { // is lowercase
      const upper = UPPER_CASE[LOWER_CASE.indexOf(char)];
      tempString += upper;
    } else { // is uppercase
      const lower = LOWER_CASE[UPPER_CASE.indexOf(char)];
      tempString += lower;
    }
  }
  return tempString;
}

console.log(invertCase('YoLo'));
