import Big from 'big.js';

export const scaleNumber = (amount: string | number, scale: number = 18) => {
  if (typeof amount !== 'string' && isNaN(amount)) {
    return '0';
  }
  const multiplier = new Big(10).pow(scale);
  const result = new Big(amount).div(multiplier);
  return result.toString();
};
