import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds } from '@pushprotocol/restapi';
import React from 'react';

interface ChatChatProps {
  chat: IFeeds;
  handleSetChosenDID: (did: string) => void;
}

export const ChatChatPanel = ({ chat, handleSetChosenDID }: ChatChatProps) => {
  const did = chat.did.split(':');
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between px-2 py-4 items-center cursor-pointer'
      onClick={() => handleSetChosenDID(chat.did)}
    >
      <div className='flex flex-col '>
        <p className='text-[13px]'>{truncateAddress(did[1])}</p>
        <p className='text-[11px]'>{chat.msg.messageContent}</p>
      </div>
      <p className='text-[11px]'>1 sec ago</p>
    </div>
  );
};
