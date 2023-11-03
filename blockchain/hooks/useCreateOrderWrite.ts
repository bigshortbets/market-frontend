import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { OrderSideEnum } from '@/components/Market/OrderManager/OrderManager';
import toast from 'react-hot-toast';

export const useCreateOrderWrite = (
  price: number,
  quantity: number,
  side: OrderSideEnum
) => {
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
      toast.error('Error!', {
        duration: 4000,
      });
    },

    onSuccess() {
      toast.success('Order created!', {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
