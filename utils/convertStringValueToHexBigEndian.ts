export const convertStringValueToHexBigEndian = (value: string) => {
  const bigIntValue = BigInt(value);
  let littleEndianHex = bigIntValue.toString(16);
  if (littleEndianHex.length % 2 !== 0) {
    littleEndianHex = '0' + littleEndianHex;
  }
  const chunks = littleEndianHex.match(/.{1,2}/g);
  if (chunks) {
    chunks.reverse();
    const bigEndianHex = chunks.join('');
    if (bigEndianHex.length % 2 !== 0) {
      return '0x0' + bigEndianHex;
    }
    return '0x' + bigEndianHex;
  }
  return '';
};
