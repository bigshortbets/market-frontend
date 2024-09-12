import axios from 'axios';

export interface MatchAddress {
  userAddress: string;
}

const API_KEY = 'XBo)bi_qaUlK]N{gn5)i'; // Should be in ENVs

export const addressMatcherApi = {
  matchAddress: async (obj: MatchAddress) => {
    return axios.post(
      'https://auth-address-service.vercel.app/user/login',
      obj,
      {
        headers: {
          accept: 'application/json',
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
  },
  geth160Address: async ({ queryKey }: any) => {
    const [, address] = queryKey;
    return axios.get(
      `https://auth-address-service.vercel.app/user/ss58/${address}`
    );
  },
};
