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
  bigsbPrice: number | undefined;
}

export const PrizesModal = ({
  isModalOpened,
  handleCloseModal,
  bigsbPrice,
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
                  <div className='gap-2.5 flex flex-col'>
                    <h2 className='mb-3 text-sm'>
                      {`Total Prize Pool: 50,000 BigSB
                      (${
                        bigsbPrice && Number(50_000 * bigsbPrice).toFixed(2)
                      }$)`}
                    </h2>
                    <p className='text-xs'>{`1st place: 10,000 BigSB (${
                      bigsbPrice && Number(10_000 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`2nd place: 8,000 BigSB (${
                      bigsbPrice && Number(8_000 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`3rd place: 6,000 BigSB (${
                      bigsbPrice && Number(6_000 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`4th place: 4,000 BigSB (${
                      bigsbPrice && Number(4_000 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`5th place: 2,000 BigSB (${
                      bigsbPrice && Number(2_000 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`Places 6-10: 700 BigSB (${
                      bigsbPrice && Number(700 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`Places 11-15: 500 BigSB (${
                      bigsbPrice && Number(500 * bigsbPrice).toFixed(2)
                    }$)`}</p>
                    <p className='text-xs'>{`Places 16-50: 400 BigSB (${
                      bigsbPrice && Number(400 * bigsbPrice).toFixed(2)
                    }$)`}</p>
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
