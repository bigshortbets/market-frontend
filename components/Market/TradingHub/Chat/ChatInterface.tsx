import { useEthersSigner } from '@/blockchain/ethers';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { useAtom } from 'jotai';
import { chatUserAtom, chosenInterlocutorAtom } from '@/store/store';
import { FaSearch } from 'react-icons/fa';
import { truncateAddress } from '@/utils/truncateAddress';
import { IoSend } from 'react-icons/io5';
import { fetchChatRequests } from '@/utils/chat/fetchChatRequests';
import { chatSendMessage } from '@/utils/chat/chatSendMessage';
import { ChatManager } from './ChatManager';
import { IFeeds, PushAPI } from '@pushprotocol/restapi';
import { ChatBox } from './ChatBox';
import { fetchChatChats } from '@/utils/chat/fetchChatChats';
import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import { useRouter } from 'next/router';

interface ChatInterfaceProps {
  chatUser: PushAPI;
  streamData: any;
}

export const ChatInterface = ({ chatUser, streamData }: ChatInterfaceProps) => {
  const [chosenDID, setChosenDID] = useState<undefined | string>(undefined);
  const [chats, setChats] = useState<undefined | IFeeds[]>(undefined);
  const [initialChatsLoading, setInitialChatsLoading] = useState(true);
  const router = useRouter();

  const getChats = async () => {
    try {
      const fetchedChats = await fetchChatChats(chatUser);
      if (fetchedChats) {
        setChats(fetchedChats);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setInitialChatsLoading(false);
    }
  };

  const handleSetChosenDID = (did: string) => {
    setChosenDID(did);
  };

  useEffect(() => {
    const { chat } = router.query;
    if (typeof chat === 'string') {
      setChosenDID(`eip155:${chat}`);
    }
  }, [router.query]);
  return (
    <div className='flex pt-4 h-full'>
      <ChatManager
        streamData={streamData}
        chats={chats}
        getChats={getChats}
        chatUser={chatUser}
        handleSetChosenDID={handleSetChosenDID}
        chosenDID={chosenDID}
        initialChatsLoading={initialChatsLoading}
      />
      <ChatBox
        chatUser={chatUser}
        chosenDID={chosenDID}
        getChats={getChats}
        streamData={streamData}
      />
    </div>
  );
};
