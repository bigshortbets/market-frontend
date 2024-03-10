import { getApiInstance } from '@/blockchain/polkadotApi';
import { hexToLittleEndian } from './hexToLittleEndian';
import { nToHex } from '@polkadot/util';

import { convertToSS58 } from './convertToSS58';
import { scaleNumber } from './scaleNumber';
import { convertToU8a } from './convertToU8a';

export async function fetchMarginInfo(
  address: string,
  selectedMarketId: string
) {
  try {
    const api = await getApiInstance();
    const res = await api.rpc.state.call(
      'MarketApi_margin_with_collateral',
      hexToLittleEndian(nToHex(BigInt(selectedMarketId))) +
        (await convertToU8a(convertToSS58(address))).substring(2)
    );

    const result = api.createType('(Balance, Balance)', res);
    const [margin, collateral] = [result[0].toString(), result[1].toString()];
    const formattedMargin = scaleNumber(BigInt(margin).toString());
    const formattedCollateral = scaleNumber(BigInt(collateral).toString());
    return { margin: formattedMargin, collateral: formattedCollateral };
  } catch (error) {
    console.error('Error fetching margin information:', error);
    throw error;
  }
}
