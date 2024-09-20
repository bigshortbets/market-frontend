import React from 'react';
import { ProfileStateType } from './ProfileContainer';

interface ProfileTabProps {
  value: ProfileStateType;
  profileState: ProfileStateType;
  setProfileState: (val: ProfileStateType) => void;
}

export const ProfileTab = ({
  value,
  profileState,
  setProfileState,
}: ProfileTabProps) => {
  const isActive = value === profileState;
  return (
    <button
      onClick={() => setProfileState(value)}
      className={`${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      } flex-1 flex items-center justify-center rounded-lg font-semibold text-xs py-2 capitalize`}
    >
      {value}
    </button>
  );
};
