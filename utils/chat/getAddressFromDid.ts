export const getAddressFromDid = (did: string): string => {
  const splited = did.split(':');
  return splited[1];
};
