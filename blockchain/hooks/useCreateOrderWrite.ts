import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { OrderSideEnum } from '@/components/Market/OrderManager/OrderManager';
import toast from 'react-hot-toast';
import { tradingHubStateAtom } from '@/components/Market/TradingHub/TradingHub';
import { handleBlockchainError } from '@/utils/handleBlockchainError';

export const useCreateOrderWrite = (
  price: number,
  quantity: number,
  side: OrderSideEnum
) => {
  const [, setTradingHubState] = useAtom(tradingHubStateAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: 'create_order',
    args: [
      BigInt(selectedMarketId),
      parseEther(price.toString()),
      quantity,
      side,
    ],
    onError(error) {
      handleBlockchainError(error.stack!);
    },

    onSuccess() {
      toast.success('Order created!', {
        duration: 4000,
      });
      setTradingHubState('orders');
    },
  });

  return { data, isLoading, isSuccess, write };
};
