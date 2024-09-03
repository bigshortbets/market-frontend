import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds } from '@pushprotocol/restapi';
import React from 'react';
import { metisGoerli } from 'viem/chains';

interface ChatRequestProps {
  request: IFeeds;
}

export const ChatRequestPanel = ({ request }: ChatRequestProps) => {
  const did = request.did.split(':');
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'
      onClick={() => console.log(request)}
    >
      <div className='flex flex-col '>
        <p className='text-[12px]'>{truncateAddress(did[1])}</p>
        <p className='text-[10px]'>{request.msg.messageContent}</p>
      </div>
      <p className='text-[10px]'>1 sec ago</p>
    </div>
  );
};
