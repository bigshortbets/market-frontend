import { blake2AsHex, encodeAddress } from '@polkadot/util-crypto';
import { CHAIN_PREFIX } from '../blockchain/constants';

export const convertToSS58 = (h160Addr: string) => {
  const addressBytes = Buffer.from(h160Addr.slice(2), 'hex');
  const prefixBytes = Buffer.from('evm:');
  const convertBytes = Uint8Array.from(
    Buffer.concat([prefixBytes, addressBytes])
  );
  const finalAddressHex = blake2AsHex(convertBytes, 256);
  return encodeAddress(finalAddressHex, CHAIN_PREFIX.ss58);
};
