import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import React from 'react';
import { useAccount } from 'wagmi';

export interface ChatMessageProps {
  from: string;
  to: string;
  message: string;
}

export const ChatMessage = ({ from, to, message }: ChatMessageProps) => {
  const fromAddress = getAddressFromDid(from);
  const toAddress = getAddressFromDid(to);

  const { address } = useAccount();

  const isUserAuthor = address!.toLowerCase() === fromAddress.toLowerCase();
  return (
    <div
      className={`flex w-full ${
        isUserAuthor ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[210px] break-normal px-[16px] py-[8px] 
        mb-[16px]  rounded-tl-2xl rounded-tr-2xl ${
          isUserAuthor
            ? 'bg-[#87DAA4] rounded-bl-2xl'
            : 'bg-[#23252E] rounded-br-2xl'
        }`}
      >
        <p
          className={`break-words text-xs ${
            isUserAuthor ? 'text-black' : 'text-tetriary'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
