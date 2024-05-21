import axios from 'axios';

export const bridgeApi = {
  getDeposits: async ({ queryKey }: any) => {
    const [, address] = queryKey;
    return axios.get(
      `https://signature-store.bigsb.network/data?type=deposits&status=all&address=${address}`
    );
  },
};
