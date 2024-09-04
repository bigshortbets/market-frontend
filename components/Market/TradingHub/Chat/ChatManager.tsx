import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ChatManagerTab } from './ChatManagerTab';
import { fetchChatRequests } from '@/utils/chat/fetchChatRequests';
import { IFeeds, PushAPI } from '@pushprotocol/restapi';
import { ChatRequestPanel } from './ChatRequestPanel';
import { fetchChatChats } from '@/utils/chat/fetchChatChats';
import { ChatChatPanel } from './ChatChatPanel';

interface ChatManagerProps {
  chatUser: PushAPI;
  handleSetChosenDID: (did: string) => void;
}

export const ChatManager = ({
  chatUser,
  handleSetChosenDID,
}: ChatManagerProps) => {
  const [chatManagerState, setChatManagerState] = useState<
    'requests' | 'chats'
  >('chats');
  const [requests, setRequests] = useState<undefined | IFeeds[]>(undefined);
  const [chats, setChats] = useState<undefined | IFeeds[]>(undefined);

  const toggleState = () => {
    if (chatManagerState === 'chats') {
      setChatManagerState('requests');
    } else {
      setChatManagerState('chats');
    }
  };

  const getRequests = async () => {
    try {
      const fetchedRequests = await fetchChatRequests(chatUser);
      if (fetchedRequests) {
        setRequests(fetchedRequests);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getChats = async () => {
    try {
      const fetchedChats = await fetchChatChats(chatUser);
      if (fetchedChats) {
        setChats(fetchedChats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
    getChats();
  }, []);

  useEffect(() => {
    getRequests();
    getChats();
  }, [chatManagerState]);

  return (
    <div
      className='w-[350px]  h-full border-r border-[#444650] border-t'
      onClick={() => console.log(chats)}
    >
      <div className='flex gap-2 mx-2 my-3'>
        <ChatManagerTab
          isActive={chatManagerState === 'chats'}
          value='chats'
          toggleState={toggleState}
        />
        <ChatManagerTab
          isActive={chatManagerState === 'requests'}
          value='requests'
          toggleState={toggleState}
        />
      </div>
      {chatManagerState === 'requests' && (
        <div>
          {requests &&
            requests.length > 0 &&
            requests.map((request) => (
              <ChatRequestPanel request={request} chatUser={chatUser} />
            ))}
        </div>
      )}
      {chatManagerState === 'chats' && (
        <div>
          {chats &&
            chats.length > 0 &&
            chats.map((chat) => (
              <ChatChatPanel
                chat={chat}
                handleSetChosenDID={handleSetChosenDID}
              />
            ))}
        </div>
      )}
    </div>
  );
};

{
  /*  <div className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'>
        <div className='flex flex-col '>
          <p className='text-[12px]'>312...dds</p>
          <p className='text-[10px]'>messageee</p>
        </div>
        <p className='text-[10px]'>1 sec ago</p>
      </div>
      <div className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'>
        <div className='flex flex-col '>
          <p className='text-[12px]'>ddd...dds</p>
          <p className='text-[10px]'>hej</p>
        </div>
        <p className='text-[10px]'>2 mins ago</p>
      </div>
      <div className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'>
        <div className='flex flex-col '>
          <p className='text-[12px]'>aaa...dds</p>
          <p className='text-[10px]'>test</p>
        </div>
        <p className='text-[10px]'>1 hour ago</p>
      </div> */
}
