import axios from 'axios';

export interface MintData {
  userAddress: string;
  signature: string;
}

export interface isMintedData {
  userAddress: string;
}

export const bridgeApi = {
  getDeposits: async ({ queryKey }: any) => {
    const [, address] = queryKey;
    return axios.get(
      `https://signature-store.bigsb.network/data?type=deposits&status=all&address=${address}`
    );
  },
  mint: async (obj: MintData) => {
    return axios.post(`https://signature-store.bigsb.network/mints/mint`, obj);
  },
  isMinted: async (obj: isMintedData) => {
    return axios.get(`https://signature-store.bigsb.network/mints/minted`, {
      params: obj,
    });
  },
  available: async (obj: isMintedData) => {
    return axios.get(
      `https://signature-store.bigsb.network/mints/availablemint`,
      {
        params: obj,
      }
    );
  },
  bigsbMint: async (obj: MintData) => {
    return axios.post(
      `https://signature-store.bigsb.network/mints/bigsbmint`,
      obj
    );
  },
};
