import { useState, useEffect, useCallback } from 'react';
import { useTransactionConfirmations, useWriteContract } from 'wagmi';
import { marketContract } from '../constants';
import { abi } from '../abi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '@/components/Market/Market';
import { parseEther } from 'viem';
import { OrderSideEnum } from '@/components/Market/OrderManager/OrderManager';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';

export const useCreateOrderWrite = (
  price: number,
  quantity: number,
  side: OrderSideEnum
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { writeContract, error, data } = useWriteContract();

  const notifText = `Order created! Wait for transaction confirmation.`;

  const write = useCallback(() => {
    setIsLoading(true);
    writeContract({
      address: marketContract,
      abi: abi,
      functionName: 'create_order',
      args: [
        BigInt(selectedMarketId),
        parseEther(price.toString()),
        quantity,
        side,
      ],
    });
  }, [selectedMarketId, price, quantity, side, writeContract]);

  useEffect(() => {
    if (error) {
      handleBlockchainError(error.stack!);
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(notifText, {
        duration: 4000,
      });
      setIsLoading(false);
    }
  }, [data]);

  /* Uncomment and use if transaction confirmation logic is needed
  const { data: confData } = useTransactionConfirmations({
    hash: data,
  });

  useEffect(() => {
    if (confData !== undefined && confData > 0) {
      toast.success(`Transaction confirmed! Tx hash: ${data}`);
    }
  }, [confData]);

  useEffect(() => {
    console.log(confData);
  }, [confData]);
  */

  return { write, isLoading };
};
