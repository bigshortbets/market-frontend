import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { useAccount, useWalletClient } from 'wagmi';
import { truncateAddress } from '@/utils/truncateAddress';
import { FaSearch } from 'react-icons/fa';
import { exampleMessages } from './mockedData';
import { useAtom } from 'jotai';
import { chatUserAtom, chosenInterlocutorAtom } from '@/store/store';
import { chatSendMessage } from '@/utils/chat/chatSendMessage';
import { useEthersSigner } from '@/blockchain/ethers';
import { initializeChatUser } from '@/utils/chat/initializeChatUser';
import { ChatInterface } from './ChatInterface';

export const ChatContainer = () => {
  const [chatUser, setChatUser] = useAtom(chatUserAtom);
  const signer = useEthersSigner();
  const initialize = async () => {
    const user = await initializeChatUser(signer);
    if (user) {
      setChatUser(user);
    }
  };

  return (
    <div
      className='w-full  h-[calc(100vh-320px)] md:h-[calc(100vh-230px)]'
      /*   style={{ height: 'calc(100vh - 229px)' }} */
    >
      {chatUser ? (
        <ChatInterface />
      ) : (
        <button onClick={initialize}>Initialize</button>
      )}
    </div>
  );
};

/* h-[calc(100vh-320px)] md:h-[calc(100vh-230px)] */
