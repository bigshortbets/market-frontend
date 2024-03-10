import { getApiInstance } from '@/blockchain/polkadotApi';

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

const bufferToHex = (buffer: Uint8Array) => {
  buffer = new Uint8Array(buffer);
  let out = '';
  for (let idx = 0, edx = buffer.length; idx < edx; idx++) {
    out += LUT_HEX_8b[buffer[idx]];
  }
  return '0x' + out.toLocaleLowerCase();
};

export const convertToU8a = async (address: string) => {
  const api = await getApiInstance();
  const decodedAddress = api.createType('AccountId', address);

  const u8aRepresentation = decodedAddress.toU8a(true);
  return bufferToHex(u8aRepresentation);
};
