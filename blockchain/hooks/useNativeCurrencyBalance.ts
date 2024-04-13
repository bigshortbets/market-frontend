import { useBalance } from 'wagmi';
import { bigshortbetsTokenAddress } from '../constants';

export const useNativeCurrencyBalance = (address: string | undefined) => {
  const { data, isLoading, isError, queryKey, refetch } = useBalance({
    address: address as `0x${string}` | undefined,
    token: bigshortbetsTokenAddress,
    chainId: 2137,
  });

  const formattedBalance = data?.formatted;

  return { data, isLoading, isError, formattedBalance, queryKey, refetch };
};
