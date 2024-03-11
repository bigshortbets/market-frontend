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
      'MarketApi_margin_data',
      hexToLittleEndian(nToHex(BigInt(selectedMarketId))) +
        (await convertToU8a(convertToSS58(address))).substring(2)
    );

    const result = api.createType(
      '(Balance, Option<(Balance, LiquidationStatus)>)',
      res
    );

    const jsonData = (result.toJSON() as [number, [number, string]?]) ?? [];

    const margin = jsonData[0];
    const requiredDepositOption = jsonData[1];

    let requiredDeposit = '0';
    let liquidationStatus = 'None';

    if (requiredDepositOption) {
      requiredDeposit = requiredDepositOption[0].toString();
      liquidationStatus = requiredDepositOption[1];
    }

    const formattedMargin = scaleNumber(Number(margin.toString()));
    const formattedRequiredDeposit = scaleNumber(
      Number(requiredDeposit.toString())
    );

    return {
      margin: formattedMargin,
      requiredDeposit: formattedRequiredDeposit,
      liquidationStatus: liquidationStatus,
    };
  } catch (error) {
    console.error('Error fetching margin information:', error);
    throw error;
  }
}
