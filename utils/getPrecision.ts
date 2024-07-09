export function getPrecision(num: number): number {
  if (!isFinite(num)) {
    throw new Error('Input must be a finite number');
  }

  const numStr = num.toString();
  const decimalIndex = numStr.indexOf('.');

  if (decimalIndex === -1) {
    return 0;
  }

  return numStr.length - decimalIndex - 1;
}
