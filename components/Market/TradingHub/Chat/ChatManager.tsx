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
import { useRouter } from 'next/router';

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
  const [chatsNumber, setChatsNumber] = useState<number>(0);
  const [requestsNumber, setRequestsNumber] = useState<number>(0);
  const router = useRouter();

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

  useEffect(() => {
    chats?.length ? setChatsNumber(Number(chats?.length)) : setChatsNumber(0);
    requests?.length
      ? setRequestsNumber(Number(requests?.length))
      : setRequestsNumber(0);
  }, [chats, requests]);

  const isValidEthereumAddress = (address: string): boolean => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  };

  const disabled = (address: string): boolean =>
    !isValidEthereumAddress(address);

  const handleAddUser = () => {
    handleSetChosenDID(`eip155:${addUserInputValue}`);
    setAddUserInputValue('');
    const { chat: _, ...query } = router.query;
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className='w-[350px]  h-full border-r border-[#444650] border-t overflow-auto no-scroll'>
      <p className='mx-2 my-3 font-semibold'>
        Chat <span className='text-bigsbgreen'>P2P</span>
      </p>
      <div className='flex gap-2 mx-2 my-3'>
        <ChatManagerTab
          isActive={chatManagerState === 'chats'}
          value='chats'
          toggleState={toggleState}
          numberValue={chatsNumber}
        />
        <ChatManagerTab
          isActive={chatManagerState === 'requests'}
          value='requests'
          toggleState={toggleState}
          numberValue={requestsNumber}
        />
      </div>
      {chatManagerState === 'chats' && (
        <div className='w-full px-2'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor='addUserInput' className='text-xs text-tetriary'>
              Provide valid EVM address to add user
            </label>

            <div className='w-full bg-[#23252E] h-[32px] rounded-md flex justify-between items-center mb-5 mt-1'>
              <input
                id='addUserInput'
                onChange={(e) => setAddUserInputValue(e.target.value)}
                type='text'
                value={addUserInputValue}
                className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-[10px] text-tetriary'
              />

              <div className='pr-3 flex items-center'>
                <button
                  disabled={disabled(addUserInputValue)}
                  className='text-bigsbgreen disabled:text-[#444650]'
                  onClick={handleAddUser}
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

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
