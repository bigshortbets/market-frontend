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

interface ChatInterfaceProps {
  chatUser: PushAPI;
}

export const ChatInterface = ({ chatUser }: ChatInterfaceProps) => {
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

  const sendMessage = async () => {
    const to = '0xF5616697dBDEE95BEb29412d84a68a98b4b24642';
    const res = await chatUser!.chat.send(to, {
      type: 'Text',
      content: 'witam',
    });
    console.log(res);
  };

  return (
    <div className='flex pt-4 h-full'>
      <ChatManager chatUser={chatUser} />
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
          <div className='flex-1 overflow-auto pb-[16px] no-scrollbar'>
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
              <button className='pr-3 text-tetriary' onClick={sendMessage}>
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
