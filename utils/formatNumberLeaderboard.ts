export const formatNumberLeaderboard = (number: number): string => {
  // Ensure the number has exactly two decimal places
  const fixedNumber = Number(number.toFixed(2));

  // Format the number with commas and ensure two decimal places
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fixedNumber);
};
