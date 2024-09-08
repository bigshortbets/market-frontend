import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ChatManagerTab } from './ChatManagerTab';
import { fetchChatRequests } from '@/utils/chat/fetchChatRequests';
import { IFeeds, PushAPI } from '@pushprotocol/restapi';
import { ChatRequestPanel } from './ChatRequestPanel';
import { fetchChatChats } from '@/utils/chat/fetchChatChats';
import { ChatChatPanel } from './ChatChatPanel';
import { useAtom } from 'jotai';
import ReactLoading from 'react-loading';
import { IoSend } from 'react-icons/io5';

interface ChatManagerProps {
  chatUser: PushAPI;
  handleSetChosenDID: (did: string) => void;
  chats: undefined | IFeeds[];
  getChats: () => Promise<void>;
  streamData: any;
}

export const ChatManager = ({
  chats,
  chatUser,
  handleSetChosenDID,
  getChats,
  streamData,
}: ChatManagerProps) => {
  const [chatManagerState, setChatManagerState] = useState<
    'requests' | 'chats'
  >('chats');
  const [requests, setRequests] = useState<undefined | IFeeds[]>(undefined);
  const [addUserInputValue, setAddUserInputValue] = useState<string>();

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

  useEffect(() => {
    getRequests();
    getChats();
  }, []);

  useEffect(() => {
    getRequests();
    getChats();
  }, [/* chatManagerState */ streamData]);

  return (
    <div className='w-[350px]  h-full border-r border-[#444650] border-t'>
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
      <div className='w-full px-2'>
        <div className='w-full bg-[#23252E] h-[32px] rounded-[100px] flex justify-between items-center mb-3'>
          <input
            /* disabled={!chosenDID} */
            /* onChange={(e) => setInputVal(e.target.value)}
              type='text'
              value={inputVal}
              onKeyPress={handleKeyPress} */
            /*  placeholder={placeholder} */
            className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
          />
          <div className='pr-3 flex items-center'>
            <button className='text-tetriary' /* onClick={sendMessage} */>
              <IoSend />
            </button>
          </div>
        </div>
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
