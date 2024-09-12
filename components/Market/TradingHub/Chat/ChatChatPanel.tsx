import { useDisplayName } from '@/hooks/useDisplayName';
import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import { convertToSS58 } from '@/utils/convertToSS58';
import { decodeWord } from '@/utils/decodeLeaderboardWord';
import { truncateAddress } from '@/utils/truncateAddress';
import { IFeeds } from '@pushprotocol/restapi';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { useAccount } from 'wagmi';

interface ChatChatProps {
  chat: IFeeds;
  handleSetChosenDID: (did: string) => void;
  chosenDID: undefined | string;
}

export const ChatChatPanel = ({
  chat,
  handleSetChosenDID,
  chosenDID,
}: ChatChatProps) => {
  const { address } = useAccount();
  const hisAddress = getAddressFromDid(chat.did);

  const when = formatDistance(chat.intentTimestamp, new Date());
  const lastSender = chat.intentSentBy
    ? getAddressFromDid(chat.msg.fromDID)
    : undefined;

  const { displayName } = useDisplayName(convertToSS58(hisAddress));
  const router = useRouter();

  const hisDisplay = displayName
    ? `${decodeWord(displayName)} (${truncateAddress(hisAddress)})`
    : truncateAddress(hisAddress);

  const amISender = lastSender?.toLowerCase() === address?.toLowerCase();

  const isPanelOpened = chosenDID === chat.did;

  const handleClick = () => {
    handleSetChosenDID(chat.did);

    const { chat: _, ...query } = router.query;
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };
  return (
    <div
      className={`w-full border-b border-[#444650]   flex justify-between px-2 py-4 items-center cursor-pointer ${
        isPanelOpened ? 'bg-[#444650] text-white ' : 'text-tetriary '
      }`}
      onClick={handleClick}
    >
      <div className='flex flex-col gap-1'>
        <p className='text-[14px]'>{hisDisplay}</p>
        <p className='text-[12px]'>{`${amISender ? 'You:' : ''} ${
          chat.msg.messageContent
        }`}</p>
      </div>
      <p className='text-[11px]'>{when} ago</p>
    </div>
  );
};
