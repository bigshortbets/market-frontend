import { useCreateOrderWrite } from '@/blockchain/hooks/useCreateOrderWrite';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { currentBlockAtom, selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { EnrichedMarketType } from '@/types/marketTypes';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';
import { checkIfDivisible } from '@/utils/checkIfDivisible';

import { bigshortbetsChain } from '@/blockchain/chain';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { currencySymbol } from '@/blockchain/constants';
import { FinanceManagerInfo } from '../FinanceManager/FinanceManagerInfo';

export enum OrderSideEnum {
  LONG,
  SHORT,
}

interface OrderManagerProps {
  markets: EnrichedMarketType[];
}

export const OrderManager = ({ markets }: OrderManagerProps) => {
  const [price, setPrice] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSideOrder, setSelectedSideOrder] = useState<OrderSideEnum>(
    OrderSideEnum.LONG
  );

  const [currentBlock] = useAtom(currentBlockAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [isDivisibleByTickSize, setIsDivisibleByTickSize] = useState(
    checkIfDivisible(price, Number(selectedMarket?.tickSize.toString()!))
  );

  const { isClosed: isMarketClosed } = calculateMarketClosing(
    currentBlock!,
    Number(selectedMarket?.lifetime)
  );

  const { address, chain } = useAccount();

  const { formattedBalance } = useNativeCurrencyBalance(address);

  const { write: writeShortOrder } = useCreateOrderWrite(
    price,
    quantity,
    OrderSideEnum.SHORT
  );
  const { write: writeLongOrder } = useCreateOrderWrite(
    price,
    quantity,
    OrderSideEnum.LONG
  );

  const orderCost =
    (Number(selectedMarket?.initialMargin) / 100) *
    (Number(selectedMarket?.oraclePrice) *
      quantity *
      Number(selectedMarket?.contractUnit));

  const orderValue = price * quantity * Number(selectedMarket?.contractUnit);

  const isBsbNetwork = chain?.id === bigshortbetsChain.id;

  const isActionDisabled =
    !address ||
    isMarketClosed ||
    price === 0 ||
    orderCost + 50 > Number(formattedBalance) ||
    !isDivisibleByTickSize ||
    quantity === 0 ||
    selectedMarket?.oraclePrice === null;

  useEffect(() => {
    selectedMarket?.oraclePrice &&
      setPrice(Number(selectedMarket?.oraclePrice.toString()));
  }, [selectedMarketId]);

  useEffect(() => {
    const res = checkIfDivisible(
      price,
      Number(selectedMarket?.tickSize.toString()!)
    );

    setIsDivisibleByTickSize(res);
  }, [price]);

  const handleWriteOrder = () => {
    if (!address) {
      open();
      return;
    }
    if (address && !isBsbNetwork) {
      switchToBigShortBetsChain();
      return;
    }
    if (selectedSideOrder === OrderSideEnum.LONG) {
      writeLongOrder();
    }
    if (selectedSideOrder === OrderSideEnum.SHORT) {
      writeShortOrder();
    }
  };

  const noMarkets = markets.length < 1;

  return (
    <div className='p-2.5 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Order
        </p>
        <div className='flex flex-col'>
          <label
            htmlFor='orderPriceInput'
            className='ml-1 mb-1 text-xs text-secondary font-semibold'
          >
            Price
          </label>
          <div className='relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-6'>
            <NumericFormat
              allowNegative={false}
              id={'orderPriceInput'}
              className='text-right outline-none  w-[85%] bg-[#23252E] '
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />

            <span className='absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs'>
              {currencySymbol}
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='quantityInput'
            className='ml-1 mb-1 text-xs text-secondary font-semibold'
          >
            Quantity
          </label>
          <div className='relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-2'>
            <NumericFormat
              allowNegative={false}
              id={'quantityInput'}
              className='text-right outline-none  w-[85%] bg-[#23252E]'
              onChange={(e) => setQuantity(Number(e.target.value))}
              decimalScale={0}
              value={quantity}
            />
            <span className='absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs'>
              UNIT
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2 '>
        <div
          className={`${
            selectedSideOrder === OrderSideEnum.LONG
              ? 'text-[#87DAA4] border border-[#87DAA4]'
              : 'text-tetriary border border-[#23252E]'
          } flex-1   bg-[#23252E] py-2 flex flex-col items-center rounded-lg cursor-pointer `}
          onClick={() => setSelectedSideOrder(OrderSideEnum.LONG)}
        >
          <p className=' text-[13px] font-semibold'>Buy</p>
          <p className=' text-[10px]'>Long</p>
        </div>
        <div
          className={`${
            selectedSideOrder === OrderSideEnum.SHORT
              ? 'text-[#E4ADAC] border border-[#E4ADAC]'
              : 'text-tetriary border border-[#23252E]'
          } flex-1   bg-[#23252E] py-2 flex flex-col items-center rounded-lg cursor-pointer `}
          onClick={() => setSelectedSideOrder(OrderSideEnum.SHORT)}
        >
          <p className=' text-[13px] font-semibold'>Sell</p>
          <p className='text-[10px]'>Short</p>
        </div>
      </div>
      <div className='p-2 rounded-lg bg-[#000211] flex flex-col gap-4'>
        <p className='text-sm font-semibold text-secondary leading-[24px]'>
          Summary
        </p>
        <div className='flex flex-col gap-2 '>
          <div className='flex justify-between items-center font-semibold text-[13px] text-secondary '>
            <div className='flex items-center gap-1'>
              <p>Order Cost</p>
              <a
                data-tooltip-id='order-cost-tooltip'
                data-tooltip-html={`Mandatory initial deposit, set at ${Number(
                  selectedMarket?.initialMargin
                )}%</br> of the contract value being traded.`}
              >
                <IoMdInformationCircle className='text-[#7F828F] text-sm ' />
              </a>
            </div>
            <p>
              {!noMarkets ? currencyFormatter.format(orderCost) : '-'}{' '}
              {currencySymbol}
            </p>
          </div>
          <div className='flex justify-between items-center font-semibold text-xs text-tetriary '>
            <div className='flex items-center gap-1'>
              <p>Order Value</p>
              <a
                data-tooltip-id='order-value-tooltip'
                data-tooltip-html={`Represents the total value of the underlying asset.</br> It considers the current price of the asset,</br> the quantity of contracts traded, and the</br> standardized units per contract.`}
              >
                <IoMdInformationCircle className='text-[#7F828F] text-sm ' />
              </a>
            </div>
            <p>
              {!noMarkets && selectedMarket?.oraclePrice != null
                ? currencyFormatter.format(orderValue)
                : '-'}{' '}
              {currencySymbol}
            </p>
          </div>
        </div>

        <button
          onClick={handleWriteOrder}
          disabled={isActionDisabled}
          className={`disabled:bg-gray-400 w-full rounded-lg ${
            address && isBsbNetwork
              ? selectedSideOrder === OrderSideEnum.LONG
                ? 'bg-[#87DAA4]'
                : 'bg-[#D26D6C]'
              : 'bg-[#4ECB7D]'
          } text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Place Order'}
          {address && isBsbNetwork && 'Place Order'}
          {address && !isBsbNetwork && 'Change Network'}
        </button>
      </div>
      {/* <FinanceManagerInfo value='Placing orders take your funds ' /> */}
      {!address && (
        <FinanceManagerWarning error='Connect your wallet to interact with the market.' />
      )}
      {address && Number(formattedBalance) === 0 && (
        <FinanceManagerWarning
          error={`Your wallet has no funds. Please add ${currencySymbol} to proceed with your order.`}
        />
      )}
      {address &&
        orderCost + 50 > Number(formattedBalance) &&
        Number(formattedBalance) > 0 &&
        Number(formattedBalance) > orderCost && (
          <FinanceManagerWarning
            error={`Your wallet balance is enough to cover the order cost, but an additional buffer of 50 ${currencySymbol} is required to cover potential gas in the future.`}
          />
        )}
      {address &&
        orderCost > Number(formattedBalance) &&
        Number(formattedBalance) > 0 && (
          <FinanceManagerWarning
            error={`The cost of your order exceeds your current wallet balance. Please add more funds to continue.`}
          />
        )}
      {address && selectedMarket?.oraclePrice === null && (
        <FinanceManagerWarning error='There is no oracle price for this market yet, placing orders is not available.' />
      )}
      {address && isMarketClosed && (
        <FinanceManagerWarning error='This market is already closed.' />
      )}
      {address && quantity === 0 && (
        <FinanceManagerWarning error='Your quantity value must be higher than 0.' />
      )}
      {!isDivisibleByTickSize &&
        !noMarkets &&
        selectedMarket?.oraclePrice != null && (
          <FinanceManagerWarning
            error={`Your price amount must be divisible by the tick size: (${selectedMarket?.tickSize.toString()!})`}
          />
        )}
      {noMarkets && (
        <FinanceManagerWarning error={`Currently no markets are available.`} />
      )}
      <Tooltip id='order-cost-tooltip' style={{ fontSize: '12px' }} />
      <Tooltip id='order-value-tooltip' style={{ fontSize: '12px' }} />
    </div>
  );
};
