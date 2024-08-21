import { bridgeAbi } from '@/blockchain/bridgeAbi';
import {
  bridgeDepoChainId,
  bridgeDepoContract,
  marketContract,
} from '@/blockchain/constants';
import { identityAbi } from '@/blockchain/identityAbi';
import { handleBlockchainError } from '@/utils/handleBlockchainError';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { stringToHex } from 'viem';
import { useWriteContract } from 'wagmi';

export const useSetIdentity = (nickname: string) => {
  const { writeContract, error, data, isSuccess, isPending } =
    useWriteContract();

  const notifText = `Nickname has been set successfuly. Wait for wallet confirmation.`;

  const identityInfo = {
    additional: [],
    display: {
      hasData: true,
      value: stringToHex(nickname),
    },
    legal: {
      hasData: false,
      value: '0x',
    },
    web: {
      hasData: false,
      value: '0x',
    },
    riot: {
      hasData: false,
      value: '0x',
    },
    email: {
      hasData: false,
      value: '0x',
    },
    hasPgpFingerprint: false,
    pgpFingerprint: '0x',
    image: {
      hasData: false,
      value: '0x',
    },
    twitter: {
      hasData: false,
      value: '0x',
    },
  };

  const write = () =>
    writeContract({
      address: '0x0000000000000000000000000000000000000818',
      abi: identityAbi,
      functionName: 'setIdentity',
      args: [identityInfo],
    });

  useEffect(() => {
    if (error) {
      handleBlockchainError(error.stack!);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(notifText, {
        duration: 4000,
      });
    }
  }, [isSuccess]);

  return { write, isPending };
};
