import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds, PushAPI } from '@pushprotocol/restapi';
import React from 'react';
import { metisGoerli } from 'viem/chains';
import { ImCheckmark } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import toast from 'react-hot-toast';

interface ChatRequestProps {
  chatUser: PushAPI;
  request: IFeeds;
}

export const ChatRequestPanel = ({ request, chatUser }: ChatRequestProps) => {
  const did = request.did.split(':');

  const acceptRequest = async () => {
    try {
      const res = await chatUser.chat.accept(did[1]);
      toast.success('Chat request has been accepted!', {
        duration: 4000,
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Error while accepting the request.', {
        duration: 4000,
      });
    }
  };

  const rejectRequest = async () => {
    const res = await chatUser.chat.reject(did[1]);
  };
  return (
    <div
      className='w-full border-b border-[#444650] text-tetriary flex justify-between py-3 px-2 items-center'
      /* onClick={() => console.log(request)} */
    >
      <div className='flex flex-col gap-2 '>
        <p className='text-sm'>{truncateAddress(did[1])}</p>
        <p className='text-sm'>{request.msg.messageContent}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <button
          onClick={acceptRequest}
          className='text-bigsbgreen text-xs hover:underline  font-semibold'
        >
          Accept
        </button>
        <button
          onClick={rejectRequest}
          className='text-red-700 text-xs hover:underline font-semibold'
        >
          Reject
        </button>
      </div>
    </div>
  );
};
