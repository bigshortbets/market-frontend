import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const ChatManager = () => {
  return (
    <div className='w-[350px]  h-full border-r border-[#444650] border-t'>
      <div className='w-full px-2 my-4'>
        {/* Search bar */}

        {/* <div className='w-full bg-[#23252E] h-[32px] rounded-[100px] flex justify-between items-center mb-3'>
          <input
            placeholder='Search'
            type='text'
            className='w-[85%] outline-none bg-[#23252E] h-full rounded-[100px] pl-3 text-xs text-tetriary'
          />
          <div className='pr-3 text-tetriary text-sm'>
            <FaSearch />
          </div>
        </div> */}
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
  );
};
