import { useBalance } from 'wagmi';
import { bigshortbetsTokenAddress } from '../constants';

export const useNativeCurrencyBalance = (address: string | undefined) => {
  const { data, isLoading, isError } = useBalance({
    address: address as `0x${string}` | undefined,
    token: bigshortbetsTokenAddress,
    watch: true,
    chainId: 2137,
  });

  const formattedBalance = data?.formatted;

  return { data, isLoading, isError, formattedBalance };
};
