import { chosenInterlocutorAtom } from '@/store/store';
import { truncateAddress } from '@/utils/truncateAddress';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { PushAPI } from '@pushprotocol/restapi';
import { IoSend } from 'react-icons/io5';
import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import { useAnimate } from 'framer-motion';
import { fetchChatHistory } from '@/utils/chat/fetchChatHistory';
import ReactLoading from 'react-loading';
import toast from 'react-hot-toast';
import { ChatHistory } from '@/types/chatTypes';
import { useDisplayName } from '@/hooks/useDisplayName';
import { convertToSS58 } from '@/utils/convertToSS58';
import { decodeWord } from '@/utils/decodeLeaderboardWord';
import Link from 'next/link';

interface ChatBoxProps {
  chatUser: PushAPI;
  chosenDID: undefined | string;
  getChats: () => Promise<void>;
  streamData: any;
}

export const ChatBox = ({
  chatUser,
  chosenDID,
  getChats,
  streamData,
}: ChatBoxProps) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<ChatHistory[] | undefined>(undefined);
  const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);
  const [initialChatHistoryLoading, setInitialChatHistoryLoading] =
    useState<boolean>(false);

  /* const messagesEndRef = useRef<HTMLDivElement>(null); */

  const to = chosenDID && getAddressFromDid(chosenDID);

  const { displayName } = useDisplayName(to ? convertToSS58(to) : undefined);

  const getHistory = async () => {
    if (chosenDID) {
      try {
        const history = await fetchChatHistory(chatUser, chosenDID);
        if (history) {
          setHistory(history);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setInitialChatHistoryLoading(false);
      }
    }
  };

  useEffect(() => {
    if (chosenDID) {
      setInitialChatHistoryLoading(true);
      getHistory();
    }
  }, [chosenDID]);

  const sendMessage = async () => {
    setSendMessageLoading(true);
    const to = getAddressFromDid(chosenDID!);
    try {
      const res = await chatUser.chat.send(to, {
        type: 'Text',
        content: inputVal,
      });
      setInputVal('');
    } catch (error) {
      console.error('Error while sending a message:', error);
      toast.error('Error while sending a message.', {
        duration: 1111,
      });
    } finally {
      setSendMessageLoading(false);
      getHistory();
      getChats();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      inputVal.trim().length > 0 &&
      !sendMessageLoading
    ) {
      sendMessage();
    }
  };

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when history changes or on first load
  useEffect(() => {
    scrollToBottom();
  }, [initialChatHistoryLoading]);

  useEffect(() => {
    getHistory();
  }, [/* chatManagerState */ streamData]);

  return (
    <div className='flex-1 h-full border-t border-[#444650] flex flex-col  justify-between w-full'>
      <div className='flex flex-col justify-between h-full'>
        <div className='h-[56px] border-b border-[#444650] flex items-center justify-between px-3'>
          <div className='flex items-center gap-1.5'>
            {/*   <div className='h-4 w-4 rounded-full bg-white'></div> */}
            {chosenDID && (
              <Link
                href={`profile/${convertToSS58(to!)}`}
                className='text-tetriary text-sm hover:underline'
              >
                {displayName
                  ? `${decodeWord(displayName)} (${truncateAddress(to!)})`
                  : truncateAddress(to!)}
              </Link>
            )}
            {}
          </div>
        </div>
        <div
          className='flex-1 custom-scroll overflow-auto'
          ref={scrollableDivRef}
        >
          {initialChatHistoryLoading ? (
            <div className='flex justify-center pt-4'>
              <ReactLoading
                type='spin'
                height={32}
                width={32}
                color='#444650'
              />
            </div>
          ) : (
            <div className=' flex flex-col-reverse p-3 first:mt-2'>
              {history &&
                history.length > 0 &&
                history.map((message) => (
                  <ChatMessage
                    from={message.fromDID}
                    to={message.toDID}
                    message={message.messageContent}
                  />
                ))}
              {history && history.length < 1 && (
                <p className='text-tetriary text-center'>
                  Write something to send request to the user!
                </p>
              )}
            </div>
          )}
        </div>
        <div className='w-full px-3'>
          <div className='w-full bg-[#23252E] h-[42px] rounded-[100px] flex justify-between items-center mb-3'>
            <input
              /* disabled={!chosenDID} */
              onChange={(e) => setInputVal(e.target.value)}
              type='text'
              value={inputVal}
              onKeyPress={handleKeyPress}
              /*  placeholder={placeholder} */
              className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
            />
            <div className='pr-3 flex items-center'>
              {sendMessageLoading ? (
                <ReactLoading
                  type='spin'
                  height={20}
                  width={20}
                  color='#444650'
                />
              ) : (
                <button
                  className='text-tetriary disabled:text-[#444650]'
                  onClick={sendMessage}
                  disabled={inputVal.trim().length < 1}
                >
                  <IoSend />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
