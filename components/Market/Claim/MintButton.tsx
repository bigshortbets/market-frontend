import { MintData, bridgeApi } from '@/requests/bidgeApi/bridgeApi';
import { currencySymbol, mintMessage } from '@/blockchain/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import { useAccount, useSignMessage } from 'wagmi';
import { formatEther } from 'viem';

interface MintButtonProps {
  buttonText: string;
  handleAction: () => void;
  mintLoading: boolean;
  hasMinted: boolean;
  disabled: boolean;
}

export const MintButton = ({
  handleAction,
  buttonText,
  mintLoading,
  hasMinted,
  disabled,
}: MintButtonProps) => {
  const { address } = useAccount();

  const text = address ? buttonText : 'Connect wallet';
  return (
    <button
      className={` ${
        hasMinted ? 'bg-[#4CC9F0]' : 'bg-[#4ECB7D]'
      } rounded-lg text-[13px] font-semibold  text-black w-full h-[43.5px] flex items-center justify-center disabled:bg-gray-400 ${
        hasMinted && !disabled && 'animate-pulse'
      }`}
      onClick={handleAction}
      disabled={!address}
    >
      {mintLoading ? (
        <ReactLoading type='spin' height={20} width={20} color='black' />
      ) : (
        text
      )}
    </button>
  );
};
