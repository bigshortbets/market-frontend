export function getPrecision(num: number): number {
  if (typeof num !== 'number' || !isFinite(num)) {
    return 0;
  }

  const numStr = num.toString();
  const decimalIndex = numStr.indexOf('.');

  if (decimalIndex === -1) {
    return 0;
  }

  return numStr.length - decimalIndex - 1;
}
