import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { SideLabel } from '../SideLabel';
import { NumericFormat } from 'react-number-format';
import { PositionWithSide } from '@/types/positionTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';

interface ClosePositionModalProps {
  handleCloseModal: () => void;
  isModalOpened: boolean;
  position: PositionWithSide;
  profitLoss: number;
}

export const ClosePositionModal = ({
  handleCloseModal,
  isModalOpened,
  position,
  profitLoss,
}: ClosePositionModalProps) => {
  const details = getMarkeDetails(position.market.ticker);
  return (
    <>
      <Transition appear show={isModalOpened} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-[350px] transform overflow-hidden  bg-[#191B24] border-[#444650] border rounded-[10px] p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-white'
                  >
                    Create close order
                  </Dialog.Title>

                  <div className='flex justify-between mt-6'>
                    <p className='text-sm font-semibold'>Market</p>
                    {details && (
                      <div className='flex items-center gap-1'>
                        <p className='text-sm'>{details?.name}</p>
                        <Image
                          className='rounded-full'
                          src={details?.path}
                          alt='Logo'
                          width={14}
                          height={14}
                        />
                      </div>
                    )}
                  </div>
                  <div className='flex justify-between items-center mt-4'>
                    <p className='text-sm font-semibold'>Ticker</p>
                    <p className='text-sm'>{position.market.ticker}</p>
                  </div>
                  <div className='flex justify-between mt-4 items-center'>
                    <p className='text-sm font-semibold'>Side</p>
                    <SideLabel side={'LONG'} />
                  </div>
                  <div className='flex justify-between mt-4 items-center'>
                    <p className='text-sm font-semibold'>
                      Position profit/loss
                    </p>
                    <p
                      className={`${
                        profitLoss < 0
                          ? 'text-red-500 text-sm'
                          : 'text-[#73D391] font-semibold text-sm'
                      }`}
                    >
                      -5.00 USDC
                    </p>
                  </div>
                  <div className='flex justify-between mt-6 items-center'>
                    <p className='text-sm font-semibold'>Price</p>
                    <NumericFormat
                      className='rounded-lg bg-[#23252E] w-[100px] py-1.5 px-2 close-position-input text-xs outline-none'
                      placeholder='Price to close'
                      allowNegative={false}
                      value={0}
                    />
                  </div>

                  <div className='flex justify-between mt-3 items-center'>
                    <div className='flex items-baseline gap-1.5'>
                      <p className='text-sm font-semibold'>Quantity </p>
                      <p className='text-[10px] tex231t-tetriary'>1/4</p>
                    </div>
                    <NumericFormat
                      className='rounded-lg bg-[#23252E] w-[100px] py-1.5 px-2 close-position-input text-xs outline-none'
                      placeholder='Quantity'
                      allowNegative={false}
                      value={1}
                      min={1}
                      max={4}
                    />
                  </div>
                  <button
                    className={`disabled:bg-gray-400 bg-[#D26D6C] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-2.5 mt-5`}
                  >
                    Create close order
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
