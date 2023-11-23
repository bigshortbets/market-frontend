export const truncateAddress = (address: string): string => {
  return `${address.substring(0, 3)}...${address.substring(
    address.length - 3
  )}`;
};
