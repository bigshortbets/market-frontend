import { useContractWrite } from 'wagmi';
import { marketContract } from '../constants';
import toast from 'react-hot-toast';
import { abi } from '../abi';

export const useCancelOrder = (marketId: string, orderId: string) => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: marketContract as `0x${string}`,
    abi: abi,
    functionName: 'cancel_order',
    args: [BigInt(marketId), BigInt(orderId)],
    onError(error) {
      toast.error('Error while canceling an order!', {
        duration: 4000,
      });
    },

    onSuccess() {
      toast.success('Order canceled!', {
        duration: 4000,
      });
    },
  });

  return { data, isLoading, isSuccess, write };
};
