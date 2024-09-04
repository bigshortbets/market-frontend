import { useEthersSigner } from '@/blockchain/ethers';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { exampleMessages } from './mockedData';
import { useAtom } from 'jotai';
import { chatUserAtom, chosenInterlocutorAtom } from '@/store/store';
import { FaSearch } from 'react-icons/fa';
import { truncateAddress } from '@/utils/truncateAddress';
import { IoSend } from 'react-icons/io5';
import { fetchChatRequests } from '@/utils/chat/fetchChatRequests';
import { chatSendMessage } from '@/utils/chat/chatSendMessage';
import { ChatManager } from './ChatManager';
import { PushAPI } from '@pushprotocol/restapi';
import { ChatBox } from './ChatBox';

interface ChatInterfaceProps {
  chatUser: PushAPI;
}

export const ChatInterface = ({ chatUser }: ChatInterfaceProps) => {
  const [chosenDID, setChosenDID] = useState<undefined | string>(undefined);

  const handleSetChosenDID = (did: string) => {
    setChosenDID(did);
  };
  return (
    <div className='flex pt-4 h-full'>
      <ChatManager
        chatUser={chatUser}
        handleSetChosenDID={handleSetChosenDID}
      />
      <ChatBox chatUser={chatUser} chosenDID={chosenDID} />
    </div>
  );
};
