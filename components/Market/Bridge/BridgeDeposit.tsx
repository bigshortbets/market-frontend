import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import { bridgeDepoChainId, mainnetUSDC } from '@/blockchain/constants';
import { useBridgeDepoAllowance } from '@/blockchain/hooks/bridge/useBridgeDepoAllowance';
import { useSetBridgeDepoAllowance } from '@/blockchain/hooks/bridge/useSetBridgeDepoAllowance';
import { useStartDepoProcess } from '@/blockchain/hooks/bridge/useStartDepoProcess';

export const BridgeDeposit = () => {
  const [amount, setAmount] = useState<number>(1);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { address } = useAccount();
  const { allowance } = useBridgeDepoAllowance(address!);
  const { write } = useSetBridgeDepoAllowance();
  const { write: writeStartDepo } = useStartDepoProcess(amount);
  const isAllowance = allowance != BigInt(0);

  const { data: mainnetUSDCData } = useBalance({
    address: address,
    chainId: bridgeDepoChainId,
    token: mainnetUSDC,
    watch: true,
  });

  const handleAction = () => {
    if (chain!.id != bridgeDepoChainId) {
      switchNetwork?.(bridgeDepoChainId);
    }
    if (chain!.id === bridgeDepoChainId && !isAllowance) {
      write?.();
    }
    if (chain!.id === bridgeDepoChainId && isAllowance) {
      writeStartDepo?.();
    }
    console.log(allowance);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex  justify-start text-secondary items-center gap-3 mb-2`}
      >
        <div className={`flex items-center gap-1 order-1`}>
          <Image
            className="rounded-full"
            src={'/market-logos/ETH.svg'}
            alt={'Ethereum Logo'}
            width={16}
            height={16}
          />
          <p className="text-sm font-semibold">Ethereum</p>
        </div>
        <div className="text-lg order-2">
          <FaLongArrowAltRight />
        </div>
        <div className={`flex items-center gap-1 order-3`}>
          <Image
            className="rounded-full"
            src={'/market-logos/BIGSB.svg'}
            alt={'Ethereum Logo'}
            width={16}
            height={16}
          />
          <p className="text-sm font-semibold">BigShortBets</p>
        </div>
      </div>

      <div className="flex flex-col mb-2">
        <label
          htmlFor="orderPriceInput"
          className="ml-1 mb-1 text-xs text-secondary font-semibold"
        >
          Amount
        </label>
        <div className="relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-2">
          <NumericFormat
            allowNegative={false}
            id={'orderPriceInput'}
            className="text-right outline-none  w-[85%] bg-[#23252E]"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
          <span className="absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs">
            USDC
          </span>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-[#000211] flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Summary
        </p>
        <div className="flex flex-col gap-3 ">
          <div className="flex justify-between items-center font-semibold  text-xs text-tetriary ">
            <p>Your mainnet USDC</p>
            <p>{mainnetUSDCData?.formatted} USDC</p>
          </div>
          <div className="flex justify-between items-center font-semibold  text-xs text-tetriar ">
            <p>Amount</p>
            <p>{amount.toFixed(2)} USDC</p>
          </div>
        </div>

        <button
          onClick={handleAction}
          className={` bg-[#4ECB7D] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {address &&
            chain!.id != bridgeDepoChainId &&
            'Connect to Ethereum mainnet'}
          {address &&
            chain!.id === bridgeDepoChainId &&
            !isAllowance &&
            'Set allowance'}
          {address &&
            chain!.id === bridgeDepoChainId &&
            isAllowance &&
            'Deposit'}
        </button>
      </div>
    </div>
  );
};
