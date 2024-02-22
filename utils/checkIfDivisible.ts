export const checkIfDivisible = (number: number, divisor: number): boolean => {
  function getMultiplier(num: number): number {
    const numStr = num.toString();
    const decimalPart = numStr.includes(".") ? numStr.split(".")[1] : "";
    return Math.pow(10, decimalPart.length);
  }

  const numberMultiplier = getMultiplier(number);
  const divisorMultiplier = getMultiplier(divisor);
  const commonMultiplier = Math.max(numberMultiplier, divisorMultiplier);

  const adjustedNumber = number * commonMultiplier;
  const adjustedDivisor = divisor * commonMultiplier;

  return adjustedNumber % adjustedDivisor === 0;
};
