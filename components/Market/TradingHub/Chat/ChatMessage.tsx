import React from 'react';

export interface ChatMessageProps {
  author: MessageAuthorType;
  value: string;
}

export type MessageAuthorType = 'user' | 'interlocutor';

export const ChatMessage = ({ author, value }: ChatMessageProps) => {
  return (
    <div
      className={`flex w-full ${author === 'user' && 'justify-end'} ${
        author === 'interlocutor' && 'justify-start'
      }`}
    >
      <div
        className={`max-w-[50%] break-normal px-[16px] py-[8px] 
        mb-[16px]  ${
          author === 'user' &&
          'rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-[#87DAA4]'
        } ${
          author === 'interlocutor' &&
          'rounded-br-2xl rounded-tr-2xl rounded-tl-2xl bg-[#23252E]'
        }`}
      >
        <p
          className={`break-words text-xs ${
            author === 'user' ? 'text-black' : 'text-tetriary'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};
