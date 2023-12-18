import { useAtom } from 'jotai';
import React from 'react';
import { UIConfigurationAtom } from './Market';

export const UIConfiguration = () => {
  const [UIConfiguration, setUIConfiguration] = useAtom(UIConfigurationAtom);
  const handleToggleConfiguration = () => {
    setUIConfiguration((prevState) =>
      prevState === 'HubOrder' ? 'OrderHub' : 'HubOrder'
    );
  };
  return (
    <button onClick={handleToggleConfiguration}>
      <div
        className={`h-[28px] flex items-center gap-[4px] ${
          UIConfiguration === 'HubOrder' ? 'flex-rw' : 'flex-row-reverse'
        }`}
      >
        <div className="h-full w-[35px] rounded bg-[#23252E]"></div>
        <div className="h-full w-[15px] rounded bg-[#23252E]"></div>
      </div>
    </button>
  );
};
