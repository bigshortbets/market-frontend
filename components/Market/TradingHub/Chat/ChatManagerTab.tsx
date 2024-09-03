import React from 'react';

interface ChatManagerTabProps {
  isActive: boolean;
  value: 'chats' | 'requests';
  toggleState: () => void;
}

export const ChatManagerTab = ({
  isActive,
  value,
  toggleState,
}: ChatManagerTabProps) => {
  return (
    <button
      disabled={isActive}
      onClick={toggleState}
      className={`${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      } py-2 flex items-center justify-center text-[12px] font-semibold flex-1 rounded-lg cursor-pointer capitalize`}
    >
      {value}
    </button>
  );
};
