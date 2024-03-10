import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api';

let apiInstance: ApiPromise | null = null;

export async function getApiInstance() {
  if (!apiInstance) {
    const wsProvider = new WsProvider('wss://test-market.bigsb.network');
    apiInstance = await ApiPromise.create({ provider: wsProvider });
  }
  return apiInstance;
}
