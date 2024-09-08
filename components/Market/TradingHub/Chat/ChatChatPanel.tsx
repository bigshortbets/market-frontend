import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds } from '@pushprotocol/restapi';
import { formatDistance } from 'date-fns';
import React from 'react';
import { useAccount } from 'wagmi';

interface ChatChatProps {
  chat: IFeeds;
  handleSetChosenDID: (did: string) => void;
}

export const ChatChatPanel = ({ chat, handleSetChosenDID }: ChatChatProps) => {
  const { address } = useAccount();
  const did = chat.did.split(':');
  const when = formatDistance(chat.intentTimestamp, new Date());
  const lastSender = chat.intentSentBy
    ? getAddressFromDid(chat.intentSentBy)
    : undefined;

  const amISender = lastSender?.toLowerCase() === address?.toLowerCase();
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between px-2 py-4 items-center cursor-pointer'
      onClick={() => handleSetChosenDID(chat.did)}
    >
      <div className='flex flex-col gap-1'>
        <p className='text-[14px]'>{truncateAddress(did[1])}</p>
        <p className='text-[12px]'>{`${amISender ? 'You:' : ''} ${
          chat.msg.messageContent
        }`}</p>
      </div>
      <p className='text-[11px]'>{when} ago</p>
    </div>
  );
};
