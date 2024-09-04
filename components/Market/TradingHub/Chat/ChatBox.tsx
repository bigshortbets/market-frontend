import { chosenInterlocutorAtom } from '@/store/store';
import { truncateAddress } from '@/utils/truncateAddress';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { exampleMessages } from './mockedData';
import { PushAPI } from '@pushprotocol/restapi';
import { IoSend } from 'react-icons/io5';
import { getAddressFromDid } from '@/utils/chat/getAddressFromDid';
import { useAnimate } from 'framer-motion';
import { fetchChatHistory } from '@/utils/chat/fetchChatHistory';

interface ChatBoxProps {
  chatUser: PushAPI;
  chosenDID: undefined | string;
}

export const ChatBox = ({ chatUser, chosenDID }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(exampleMessages);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<any>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /*  const handleSendMessage = () => {
    if (inputVal.trim() !== '') {
      const message: ChatMessageProps = { author: 'user', value: inputVal };
      const newArr = [...messages, message];
      setMessages(newArr);
      setInputVal('');
    }
  }; */

  const sendMessage = async () => {
    const to = getAddressFromDid(chosenDID!);
    setInputVal('');
    const res = await chatUser.chat.send(to, {
      type: 'Text',
      content: inputVal,
    });
    getHistory();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const getHistory = async () => {
    if (chosenDID) {
      try {
        const history = await fetchChatHistory(chatUser, chosenDID);
        if (history) {
          setHistory(history);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getHistory();
  }, [chosenDID]);

  return (
    <div
      className='flex-grow h-full border-t border-[#444650] flex flex-col  justify-between'
      onClick={() => console.log(history)}
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='h-[56px] border-b border-[#444650] flex items-center justify-between px-3'>
          <div className='flex items-center gap-1.5'>
            <div className='h-4 w-4 rounded-full bg-white'></div>
            {chosenDID && (
              <p className='text-tetriary text-sm'>
                {truncateAddress(getAddressFromDid(chosenDID))}
              </p>
            )}
          </div>
          <div>
            <p className='text-[10px] text-tetriary'>
              PnL with Opponent:{' '}
              <span className='font-bold text-[#87DAA4]'>+400.50 $DOLLARS</span>
            </p>
          </div>
        </div>
        <div className='flex-1 overflow-auto pb-[16px] no-scrollbar'>
          <div className=' flex flex-col-reverse p-3 first:mt-2'>
            {history &&
              history.length > 0 &&
              history.map((message: any) => (
                <ChatMessage
                  from={message.fromDID}
                  to={message.toDID}
                  message={message.messageContent}
                />
              ))}
          </div>
        </div>
        <div className='w-full px-3'>
          <div className='w-full bg-[#23252E] h-[42px] rounded-[100px] flex justify-between items-center mb-3'>
            <input
              onChange={(e) => setInputVal(e.target.value)}
              type='text'
              value={inputVal}
              onKeyPress={handleKeyPress}
              placeholder='Your message here'
              className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
            />
            <button className='pr-3 text-tetriary' onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
