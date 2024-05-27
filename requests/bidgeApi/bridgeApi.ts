import axios from 'axios';

export interface MintData {
  userAddress: string;
  signature: string;
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
};
