import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds, PushAPI } from '@pushprotocol/restapi';
import React from 'react';
import { metisGoerli } from 'viem/chains';
import { ImCheckmark } from 'react-icons/im';

interface ChatRequestProps {
  chatUser: PushAPI;
  request: IFeeds;
}

export const ChatRequestPanel = ({ request, chatUser }: ChatRequestProps) => {
  const did = request.did.split(':');

  const acceptRequest = async () => {
    const res = await chatUser.chat.accept(did[1]);
  };
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center'
      onClick={() => console.log(request)}
    >
      <div className='flex flex-col '>
        <p className='text-[12px]'>{truncateAddress(did[1])}</p>
        <p className='text-[10px]'>{request.msg.messageContent}</p>
      </div>
      <button onClick={acceptRequest}>
        <ImCheckmark />
      </button>
    </div>
  );
};
