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
import { formatEther, parseEther } from 'viem';
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
    ? `Claim Bonus ${currencySymbol}`
    : `Claim Free 10K ${currencySymbol}`;

  const buttonDisabled =
    !availableMintData || Number(availableMintData?.data?.availableMint) <= 0;
  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        {hasUserMinted && (
          <p className='text-sm font-semibold'>Claim Bonus {currencySymbol}</p>
        )}
        {!hasUserMinted && (
          <div>
            <p className='text-sm font-semibold text-secondary mb-2'>
              {/* Claim Free {currencySymbol} */} Welcome to the{' '}
              <span className='text-[#4ECB7D]'>
                BigShortBet$ Trading Competition!
              </span>
            </p>
            <p className='text-xs mb-1'>1.Connect your wallet.</p>
            <p className='text-xs mb-1'>2.Claim free funds.</p>
            <p className='text-xs mb-2'>3.Trade and win real prizes!</p>
          </div>
        )}
        <div className='mb-2'>
          <p className='text-xs mb-2'>
            {hasUserMinted ? (
              <span>
                Receive 5x the amount of BigSB held in your address, up to a
                maximum of{' '}
                <span className='font-semibold text-[#4ECB7D]'>
                  50,000 DOLARZ
                </span>
                .
              </span>
            ) : (
              <span>
                Claim{' '}
                <span className='text-[#4ECB7D] font-semibold'>
                  10,000 DOLARZ for free
                </span>{' '}
                to trade and compete for real prizes. This claim is available
                once per address.
              </span>
            )}
          </p>
          {!hasUserMinted && (
            <p className='text-xs'>
              To ensure fair play and a positive experience for all
              participants, the address claiming the funds must hold at least{' '}
              <a
                className='underline text-[#4ECB7D] font-semibold'
                href='https://app.uniswap.org/swap?use=V2&outputCurrency=0x131157c6760f78f7ddf877c0019eba175ba4b6f6'
                target='_blank'
              >
                1 BigSB token
              </a>
              .
            </p>
          )}

          {hasUserMinted && availableMintData && (
            <p className='text-xs font-semibold mt-4'>
              Bonus DOLARZ Available for Minting:{' '}
              {Number(
                formatEther(availableMintData?.data?.availableMint)
              ).toFixed(2)}
            </p>
          )}
          {hasUserMinted && (
            <p className='text-xs mt-2'>
              <a
                className='underline text-[#4ECB7D] font-semibold'
                href='https://app.uniswap.org/swap?use=V2&outputCurrency=0x131157c6760f78f7ddf877c0019eba175ba4b6f6'
                target='_blank'
              >
                Buy BigSB
              </a>{' '}
              to increase the amount of bonus DOLARZ available for minting.
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
