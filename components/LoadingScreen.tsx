import React from 'react';
import { WhaleLoading } from './WhaleLoading';

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-primary-bg">
      <div className="animate-pulse">
        <WhaleLoading />
      </div>
    </div>
  );
};
