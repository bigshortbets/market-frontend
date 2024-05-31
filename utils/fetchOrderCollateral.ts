import { getApiInstance } from '@/blockchain/polkadotApi';
import { hexToLittleEndian } from './hexToLittleEndian';
import { nToHex } from '@polkadot/util';
import { convertToSS58 } from './convertToSS58';
import { convertToU8a } from './convertToU8a';

export async function fetchOrderCollateral(
  address: string,
  orderId: string,
  addressConverted: boolean = false
) {
  try {
    const api = await getApiInstance();
    const addressPayload = addressConverted
      ? (await convertToU8a(address)).substring(2)
      : (await convertToU8a(convertToSS58(address))).substring(2);

    const res = await api.rpc.state.call(
      'MarketApi_margin',
      hexToLittleEndian(nToHex(BigInt(orderId))) + addressPayload
    );

    const balance = api.createType('Balance', res);
    return Number(balance.toString());
  } catch (error) {
    console.error('Error fetching margin information:', error);
    throw error;
  }
}
