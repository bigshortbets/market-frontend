import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds } from '@pushprotocol/restapi';
import React from 'react';

interface ChatChatProps {
  chat: IFeeds;
}

export const ChatChatPanel = ({ chat }: ChatChatProps) => {
  const did = chat.did.split(':');
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'
      onClick={() => console.log(chat)}
    >
      <div className='flex flex-col '>
        <p className='text-[12px]'>{truncateAddress(did[1])}</p>
        <p className='text-[10px]'>{chat.msg.messageContent}</p>
      </div>
      <p className='text-[10px]'>1 sec ago</p>
    </div>
  );
};
