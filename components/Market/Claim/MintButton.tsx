import { MintData, bridgeApi } from '@/requests/bidgeApi/bridgeApi';
import { mintMessage } from '@/blockchain/constants';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import { useAccount, useSignMessage } from 'wagmi';

export const MintButton = () => {
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
    },
  });
  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const { address } = useAccount();
  useEffect(() => {
    if (mintStatus === 'pending') {
      setMintLoading(true);
    }
    if (mintStatus === 'success') {
      const payload: MintData = {
        signature: signMessageData,
        userAddress: address as string,
      };
      mintMutation.mutate(payload);
    }
    if (mintStatus === 'error') {
      setMintLoading(false);
    }
  }, [mintStatus]);

  const handleMint = () => {
    signMessage({ message: mintMessage });
  };
  return (
    <button
      className='bg-[#4ECB7D] rounded-lg text-[13px] font-semibold  text-black w-full h-[43.5px] flex items-center justify-center disabled:bg-gray-400'
      onClick={handleMint}
    >
      {mintLoading ? (
        <ReactLoading type='spin' height={20} width={20} color='black' />
      ) : (
        'Claim DOLAR$'
      )}
    </button>
  );
};
