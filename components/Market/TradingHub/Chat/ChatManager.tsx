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
import { IoMdAdd } from 'react-icons/io';

interface ChatManagerProps {
  chatUser: PushAPI;
  handleSetChosenDID: (did: string) => void;
  chats: undefined | IFeeds[];
  getChats: () => Promise<void>;
  streamData: any;
  initialChatsLoading: boolean;
  chosenDID: undefined | string;
}

export const ChatManager = ({
  chats,
  chatUser,
  handleSetChosenDID,
  getChats,
  streamData,
  initialChatsLoading,
  chosenDID,
}: ChatManagerProps) => {
  const [chatManagerState, setChatManagerState] = useState<
    'requests' | 'chats'
  >('chats');
  const [requests, setRequests] = useState<undefined | IFeeds[]>(undefined);
  const [addUserInputValue, setAddUserInputValue] = useState<string>('');

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
        <div className='w-full bg-[#23252E] h-[32px] rounded-md flex justify-between items-center mb-5'>
          <input
            onChange={(e) => setAddUserInputValue(e.target.value)}
            type='text'
            value={addUserInputValue}
            className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
          />
          <div className='pr-3 flex items-center'>
            <button
              className='text-tetriary'
              onClick={() => handleSetChosenDID(`eip155:${addUserInputValue}`)}
            >
              <IoMdAdd />
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
          {chatManagerState === 'chats' && (
            <div>
              {initialChatsLoading ? (
                <div className='flex justify-center'>
                  <ReactLoading
                    type='spin'
                    height={32}
                    width={32}
                    color='#444650'
                  />
                </div>
              ) : chats && chats.length > 0 ? (
                chats.map((chat) => (
                  <ChatChatPanel
                    key={chat.chatId}
                    chat={chat}
                    handleSetChosenDID={handleSetChosenDID}
                    chosenDID={chosenDID}
                  />
                ))
              ) : (
                <p className='text-tetriary text-xs text-center'>
                  You don't have any conversations
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
