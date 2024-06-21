import React, { useEffect, useState } from 'react';
import { MintButton } from './MintButton';
import { currencySymbol, mintMessage } from '@/blockchain/constants';
import { useAccount, useSignMessage } from 'wagmi';
import { MintData, bridgeApi } from '@/requests/bidgeApi/bridgeApi';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { formatEther } from 'viem';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';

interface ClaimProps {
  hasUserMinted: boolean;
  setHasUserMinted: (val: boolean) => void;
  refetchIsMinted: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}

export const Claim = ({
  hasUserMinted,
  setHasUserMinted,
  refetchIsMinted,
}: ClaimProps) => {
  const [mintLoading, setMintLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const {
    signMessage,
    data: signMessageData,
    status: mintStatus,
  } = useSignMessage();

  const mintMutation = useMutation({
    mutationFn: bridgeApi.mint,
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        duration: 4000,
      });
      setMintLoading(false);
    },
    onSuccess: (data) => {
      console.log(data);
      setMintLoading(false);
      setHasUserMinted(true);
      refetchIsMinted();
      refetchAvailableMintData();
      setMintLoading(false);
      toast.success('Mint successful', {
        duration: 4000,
      });
    },
  });

  const obj = { userAddress: address as string };

  const bigsbMintMutation = useMutation({
    mutationFn: bridgeApi.bigsbMint,
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        duration: 4000,
      });
      setMintLoading(false);
    },
    onSuccess: (data) => {
      console.log(data);
      setMintLoading(false);
      setHasUserMinted(true);
      refetchIsMinted();
      refetchAvailableMintData();
      setMintLoading(false);
      toast.success('Mint successful', {
        duration: 4000,
      });
    },
  });

  const { data: availableMintData, refetch: refetchAvailableMintData } =
    useQuery({
      queryKey: ['available'],
      queryFn: () => bridgeApi.available(obj),
    });

  useEffect(() => {
    if (mintStatus === 'pending') {
      setMintLoading(true);
    }
    if (mintStatus === 'success') {
      const payload = {
        signature: signMessageData,
        userAddress: address as string,
      };
      if (hasUserMinted) {
        bigsbMintMutation.mutate(payload);
      } else {
        mintMutation.mutate(payload);
      }
    }
    if (mintStatus === 'error') {
      setMintLoading(false);
    }
  }, [mintStatus]);

  useEffect(() => {
    refetchIsMinted();
  }, []);

  const handleMint = () => {
    signMessage({ message: mintMessage });

    /* console.log(formatEther(availableMintData?.data?.availableMint)); */
  };

  const buttonText = hasUserMinted
    ? `Claim Bonus $BigSB ${currencySymbol}`
    : `Claim Free 10K ${currencySymbol}`;

  const buttonDisabled =
    !availableMintData || Number(availableMintData?.data?.availableMint) <= 0;
  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Claim Free {currencySymbol}
        </p>
        <div className='mb-2'>
          <p className='text-xs mb-2'>
            {hasUserMinted
              ? 'Receive 10x the amount of BigSB held in your address, up to a maximum of 200,000 DOLARZ.'
              : `Claim 10,000 DOLARZ to participate in the trading competition. This can be done once per address.`}
          </p>
          <p className='text-xs'>
            For security reasons, only addresses with at least one transaction
            on the Ethereum mainnet are eligible.
          </p>
          {hasUserMinted && availableMintData && (
            <p className='text-xs font-semibold mt-4'>
              Available $BigSB Mint: {availableMintData?.data?.availableMint}{' '}
              {currencySymbol}
            </p>
          )}
        </div>
        <MintButton
          disabled={buttonDisabled}
          handleAction={handleMint}
          buttonText={buttonText}
          mintLoading={mintLoading}
          hasMinted={hasUserMinted}
        />
      </div>
      {!address && (
        <FinanceManagerWarning error='Connect your wallet to claim funds.' />
      )}
    </div>
  );
};
