import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { NumericFormat } from 'react-number-format';
import { PositionWithSide } from '@/types/positionTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useClosePosition } from '@/blockchain/hooks/useClosePosition';
import { currencySymbol } from '@/blockchain/constants';

interface PrizeModalProps {
  handleCloseModal: () => void;
  isModalOpened: boolean;
}

export const PrizesModal = ({
  isModalOpened,
  handleCloseModal,
}: PrizeModalProps) => {
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
            <div className='flex min-h-full items-center justify-center p-4 text-center text-white'>
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
                  <div className='flex justify-between items-center mb-6'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-white'
                    >
                      Prizes 🎁
                    </Dialog.Title>
                    <button className='text-xl' onClick={handleCloseModal}>
                      <IoClose />
                    </button>
                  </div>
                  <div>
                    <p>
                      50-100 - 500szt bigsb razem 25k 51-6 - 1000szt bigsb razem
                      45k 5-2k 4- 4k 3-6k 2-8k 1-10k hmm razem 100k nagrod w
                      bigsb
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
