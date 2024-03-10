/* import { useEffect, useState } from 'react';
import { hexToLittleEndian } from '@/utils/hexToLittleEndian';
import { nToHex } from '@polkadot/util';
import { convertToSS58 } from '@/utils/convertToSS58';
import { ApiPromise, WsProvider } from '@polkadot/api';

const provider = new WsProvider('wss://rpc.polkadot.io');

const LUT_HEX_4b = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];
const LUT_HEX_8b = new Array(0x100);
for (let n = 0; n < 0x100; n++) {
  LUT_HEX_8b[n] = `${LUT_HEX_4b[(n >>> 4) & 0xf]}${LUT_HEX_4b[n & 0xf]}`;
}

export const bufferToHex = (buffer: Uint8Array) => {
  buffer = new Uint8Array(buffer);
  let out = '';
  for (let idx = 0, edx = buffer.length; idx < edx; idx++) {
    out += LUT_HEX_8b[buffer[idx]];
  }
  return '0x' + out.toLocaleLowerCase();
};

export const convertToU8a = async (value: string) => {
  const api = await ApiPromise.create({ provider });
  const decodedAddress = api.createType('AccountId', value);

  const u8aRepresentation = decodedAddress.toU8a(true);
  return bufferToHex(u8aRepresentation);
};

const useGetDeposit = (
  marketId: string,
  address: string | undefined,
  refetchTrigger: number
) => {
  const [depositRes, setDepositRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchDeposit = async () => {
      if (!marketId || !address) {
        setDepositRes(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://test-market.bigsb.network`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: marketId,
            jsonrpc: '2.0',
            method: 'state_call',
            params: [
              'MarketApi_margin',
              hexToLittleEndian(nToHex(BigInt(marketId))) +
                (await convertToU8a(convertToSS58(address))).substring(2),
            ],
          }),
        });

        const result = await response.json();

        if (isSubscribed) {
          setDepositRes(result);
          setLoading(false);
        }
      } catch (e: any) {
        if (isSubscribed) {
          console.error(e);
          setError(e);
          setLoading(false);
        }
      }
    };

    fetchDeposit();

    return () => {
      isSubscribed = false;
    };
  }, [marketId, address, refetchTrigger]);

  return { depositRes, loading, error };
};

export default useGetDeposit;
 */
