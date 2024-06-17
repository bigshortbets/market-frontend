import { useBalance } from 'wagmi';
import { bigshortbetsTokenAddress } from '../constants';

export const useNativeCurrencyBalance = (address: string | undefined) => {
  const { data, isLoading, isError, queryKey, refetch } = useBalance({
    address: address as `0x${string}` | undefined,
    chainId: 2136,
  });

  const formattedBalance = data?.formatted;

  return { data, isLoading, isError, formattedBalance, queryKey, refetch };
};
