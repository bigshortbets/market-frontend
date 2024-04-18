import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { SideLabel } from '../SideLabel';
import { NumericFormat } from 'react-number-format';
import { PositionWithSide } from '@/types/positionTypes';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useClosePosition } from '@/blockchain/hooks/useClosePosition';
import { currencySymbol } from '@/blockchain/constants';

interface ClosePositionModalProps {
  handleCloseModal: () => void;
  isModalOpened: boolean;
  position: PositionWithSide;
}

export const ClosePositionModal = ({
  handleCloseModal,
  isModalOpened,
  position,
}: ClosePositionModalProps) => {
  const details = getMarkeDetails(position.market.ticker);

  const [price, setPrice] = useState(
    Number(position.market.oraclePrice.toString())
  );
  const [quantity, setQuantity] = useState(Number(position.quantityLeft));

  const { write: writeClosePosition, isSuccess } = useClosePosition(
    position.market.id,
    position.id,
    price,
    quantity
  );

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess]);

  const profitLoss =
    position.side === 'LONG'
      ? Number(quantity) *
        Number(position.market.contractUnit) *
        (Number(price) - Number(position.createPrice.toString()))
      : Number(quantity) *
        Number(position.market.contractUnit) *
        (Number(position.createPrice.toString()) - Number(price));
  return (
    <>
      <Transition appear show={isModalOpened} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center text-white">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[350px] transform overflow-hidden  bg-[#191B24] border-[#444650] border rounded-[10px] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Create close order
                    </Dialog.Title>
                    <button className="text-xl" onClick={handleCloseModal}>
                      <IoClose />
                    </button>
                  </div>

                  <div className="flex justify-between mt-6 items-center">
                    <p className="text-sm font-semibold">Market</p>
                    {details && (
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm">{details?.name}</p>
                        <Image
                          className="rounded-full"
                          src={details?.path}
                          alt="Logo"
                          width={14}
                          height={14}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm font-semibold">Ticker</p>
                    <p className="text-sm">{position.market.ticker}</p>
                  </div>
                  <div className="flex justify-between mt-4 items-center">
                    <p className="text-sm font-semibold">Side</p>
                    <SideLabel side={'LONG'} />
                  </div>
                  <div className="flex justify-between mt-4 items-center">
                    <p className="text-sm font-semibold">
                      Position profit/loss
                    </p>
                    <p
                      className={` font-semibold ${
                        profitLoss < 0
                          ? 'text-red-500 text-sm'
                          : 'text-[#73D391]  text-sm'
                      }`}
                    >
                      {profitLoss >= 0
                        ? `+${profitLoss.toFixed(2)}`
                        : profitLoss.toFixed(2)}{' '}
                      {currencySymbol}
                    </p>
                  </div>
                  <div className="flex justify-between mt-6 items-center">
                    <p className="text-sm font-semibold">Price</p>
                    <div className="relative w-[125px] bg-[#23252E] py-0.5  rounded-lg ">
                      <NumericFormat
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="rounded-lg bg-[#23252E] w-[60%] h-full close-position-input text-xs outline-none px-2"
                        placeholder="Price to close"
                        allowNegative={false}
                        value={price}
                      />
                      <div className="absolute right-2 top-[7px] text-[10px] text-tetriary">
                        {currencySymbol}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3 items-center">
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-sm font-semibold">Quantity </p>
                    </div>
                    <div className="relative w-[125px] bg-[#23252E] py-0.5  rounded-lg ">
                      <NumericFormat
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="rounded-lg bg-[#23252E] w-[60%] h-full close-position-input text-xs outline-none px-2"
                        placeholder="Quantity"
                        allowNegative={false}
                        value={quantity}
                        min={1}
                        max={4}
                      />
                      <div className="absolute right-2 top-[7px] text-[10px] text-tetriary">
                        {quantity}/{Number(position.quantityLeft)}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={
                      quantity < 1 || quantity > Number(position.quantityLeft)
                    }
                    onClick={() => writeClosePosition()}
                    className={`disabled:bg-gray-400 bg-[#D26D6C] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-2.5 mt-5 `}
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
