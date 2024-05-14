import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { ChatMessage, ChatMessageProps } from './ChatMessage';
import { useAccount } from 'wagmi';
import { truncateAddress } from '@/utils/truncateAddress';
import { FaSearch } from 'react-icons/fa';
import { exampleMessages } from './mockedData';
import { useAtom } from 'jotai';
import { chosenInterlocutorAtom } from '@/store/store';

export const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(exampleMessages);
  const [inputVal, setInputVal] = useState<string>('');
  const [chosenInterlocutor, setChosenInterlocutor] = useAtom(
    chosenInterlocutorAtom
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputVal.trim() !== '') {
      const message: ChatMessageProps = { author: 'user', value: inputVal };
      const newArr = [...messages, message];
      setMessages(newArr);
      setInputVal('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const { address } = useAccount();
  return (
    <div
      className='w-full h-full flex pt-4'
      style={{ height: 'calc(100vh - 229px)' }}
    >
      <div className='w-[200px]  h-full border-r border-[#444650] border-t'>
        <div className='w-full px-2 my-4'>
          <div className='mb-4'>
            <p className='font-semibold text-tetriary'>
              <span className='font-bold text-[#87DAA4]'>P2P</span> Chat
            </p>
          </div>
          <div className='w-full bg-[#23252E] h-[32px] rounded-[100px] flex justify-between items-center mb-3'>
            <input
              placeholder='Search'
              type='text'
              className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
            />
            <div className='pr-3 text-tetriary text-sm'>
              <FaSearch />
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <p className='text-[10px] text-tetriary px-2'>All messages</p>
        </div>
        <div className='w-full border-b border-[#444650] text-tetriary flex justify-between p-2 items-center cursor-pointer'>
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
        </div>
      </div>
      <div className='flex-grow h-full border-t border-[#444650] flex flex-col  justify-between'>
        <div className='flex flex-col justify-between h-full'>
          <div className='h-[56px] border-b border-[#444650] flex items-center justify-between px-3'>
            <div className='flex items-center gap-1.5'>
              <div className='h-4 w-4 rounded-full bg-white'></div>
              <p className='text-tetriary text-sm'>
                {truncateAddress(chosenInterlocutor)}
              </p>
            </div>
            <div>
              <p className='text-[10px] text-tetriary'>
                PnL with Opponent:{' '}
                <span className='font-bold text-[#87DAA4]'>
                  +400.50 $DOLLARS
                </span>
              </p>
            </div>
          </div>
          <div className='flex-1 overflow-auto pb-[16px]'>
            <div className=' flex flex-col p-3 first:mt-2'>
              {messages.map((message, key) => (
                <ChatMessage
                  author={message.author}
                  key={key}
                  value={message.value}
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
              <button
                className='pr-3 text-tetriary'
                onClick={handleSendMessage}
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
