export const hexToLittleEndian = (hexValue: any) => {
  hexValue = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
  const hexBytes = hexValue.match(/.{1,2}/g);
  const littleEndianBytes = hexBytes.reverse();
  return '0x' + littleEndianBytes.join('');
};
