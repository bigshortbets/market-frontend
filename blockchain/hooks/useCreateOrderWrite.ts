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
  side: OrderSideEnum,
  margin: number
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const { writeContract, error, data } = useWriteContract();

  const notifText = `Order is being placed. A wallet notification will confirm once the process is complete.`;

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
        margin,
      ],
    });
  }, [selectedMarketId, price, quantity, side, margin, writeContract]);

  useEffect(() => {
    if (error) {
      console.log(error);
      console.log(margin);
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
