export const numberToCurrencyFormat = (amount: number, decimalPlaces: number) =>
  amount
    .toLocaleString('en', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true,
    })
    .replaceAll(',', ' ');

export const toFixedNoRounding = (num: number) => {
  return Number(num.toString().match(/^-?\d+(?:.\d{0,2})?/)![0]);
};
