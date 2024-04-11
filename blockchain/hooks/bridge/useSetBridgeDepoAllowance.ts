import {
  MAX_ALLOWANCE,
  bridgeDepoContract,
  mainnetUSDC,
} from '@/blockchain/constants';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import toast from 'react-hot-toast';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';

export const useSetBridgeDepoAllowance = () => {
  const { write } = useContractWrite({
    address: mainnetUSDC,
    abi: erc20ABI,
    functionName: 'approve',
    args: [bridgeDepoContract, BigInt(MAX_ALLOWANCE)],
    onError(error) {
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
