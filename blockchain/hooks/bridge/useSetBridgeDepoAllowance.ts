/* import {
  MAX_ALLOWANCE,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';
import { erc20Abi } from 'viem';
import {  useContractWrite, usePrepareContractWrite, useWriteContract } from 'wagmi';

export const useSetBridgeDepoAllowance = () => {
  const { writeContract, isSuccess } = useWriteContract({
    address: mainnetUSDC,
    abi: erc20Abi,
    functionName: 'approve',
    args: [bridgeDepoContract, BigInt(MAX_ALLOWANCE)],
    onError(error : any) {
      handleBlockchainError(error.stack!);
    },
    onSuccess() {
      toast.success('Allowance has been set!', {
        duration: 4000,
      });
    },
  });

  return { write };
};
 */
