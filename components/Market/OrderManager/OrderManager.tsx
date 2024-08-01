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
import { Tooltip } from 'react-tooltip';
import { currencySymbol } from '@/blockchain/constants';
import ReactLoading from 'react-loading';
import { checkIfBidenMarket } from '@/utils/checkIfBidenMarket';
import { Leverage } from './Leverage';

export enum OrderSideEnum {
  LONG,
  SHORT,
}

interface OrderManagerProps {
  markets: EnrichedMarketType[];
}

export const OrderManager = ({ markets }: OrderManagerProps) => {
  const [price, setPrice] = useState<string>('1');
  const [quantity, setQuantity] = useState<string>('1');
  const [margin, setMargin] = useState<number>(1);

  const [currentBlock] = useAtom(currentBlockAtom);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [isDivisibleByTickSize, setIsDivisibleByTickSize] = useState(
    checkIfDivisible(
      Number(price),
      Number(selectedMarket?.tickSize.toString()!)
    )
  );

  const { isClosed: isMarketClosed } = calculateMarketClosing(
    currentBlock!,
    Number(selectedMarket?.lifetime)
  );

  const { address, chain } = useAccount();
  const { formattedBalance } = useNativeCurrencyBalance(address);

  const { write: writeShortOrder, isLoading: isShortLoading } =
    useCreateOrderWrite(
      Number(price),
      Number(quantity),
      OrderSideEnum.SHORT,
      Number(margin)
    );
  const { write: writeLongOrder, isLoading: isLongLoading } =
    useCreateOrderWrite(
      Number(price),
      Number(quantity),
      OrderSideEnum.LONG,
      Number(margin)
    );

  const orderCost = Math.max(
    500,
    (margin / 100) *
      (Number(selectedMarket?.oraclePrice) *
        Number(quantity) *
        Number(selectedMarket?.contractUnit))
  );

  const orderValue =
    Number(selectedMarket?.oraclePrice) *
    Number(quantity) *
    Number(selectedMarket?.contractUnit);

  const isBsbNetwork = chain?.id === bigshortbetsChain.id;

  const isActionDisabled =
    !address ||
    isMarketClosed ||
    Number(price) === 0 ||
    orderCost + 50 > Number(formattedBalance) ||
    !isDivisibleByTickSize ||
    Number(quantity) === 0 ||
    selectedMarket?.oraclePrice === null;

  useEffect(() => {
    selectedMarket?.oraclePrice &&
      setPrice(selectedMarket?.oraclePrice.toString());
  }, [selectedMarketId]);

  useEffect(() => {
    selectedMarket?.initialMargin &&
      setMargin(Number(selectedMarket.initialMargin));
  }, [selectedMarketId]);

  useEffect(() => {
    const res = checkIfDivisible(
      Number(price),
      Number(selectedMarket?.tickSize.toString()!)
    );

    setIsDivisibleByTickSize(res);
  }, [price]);

  const handleWriteOrder = (side: OrderSideEnum) => {
    if (!address) {
      open();
      return;
    }
    if (address && !isBsbNetwork) {
      switchToBigShortBetsChain();
      return;
    }
    if (side === OrderSideEnum.LONG) {
      writeLongOrder();
    }
    if (side === OrderSideEnum.SHORT) {
      writeShortOrder();
    }
  };

  const noMarkets = markets.length < 1;

  const isBidenMarket = checkIfBidenMarket(selectedMarket?.ticker);

  const leverage = /* (orderValue / orderCost).toFixed(2) */ (
    100 / margin
  ).toFixed(2);

  return (
    <div className='px-2.5 pt-3 pb-4 flex flex-col gap-4'>
      <div className='flex flex-col gap-2.5'>
        {/* Price input */}
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
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            <span className='absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs'>
              {currencySymbol}
            </span>
          </div>
        </div>
        {/*  */}
        {/* Quantity input */}
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
              onChange={(e) => setQuantity(e.target.value)}
              decimalScale={0}
              value={quantity}
            />
            <span className='absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs'>
              UNIT
            </span>
          </div>
        </div>
        {/*  */}
        {selectedMarket?.initialMargin && (
          <Leverage
            margin={margin}
            setMargin={setMargin}
            initial={Number(selectedMarket.initialMargin)}
          />
        )}
        {/*  */}
        <div className='flex flex-col gap-1 px-1 mt-1'>
          <div className='flex items-center justify-between gap-2 mt-1'>
            <p
              className='text-[12px]	text-tetriary'
              /*    data-tooltip-id='margin-tooltip'
              data-tooltip-html={`Leverage is a ratio of your investment to your margin.</br> It's calculated as 100 divided by your margin.`} */
            >
              Margin
            </p>
            <p className='text-[12px] font-semibold text-tetriary'>{margin}%</p>
          </div>

          <div className='flex items-center gap-2 mt-1 justify-between'>
            <a
              className='text-[12px] text-tetriary decoration-dotted	underline cursor-help	'
              data-tooltip-id='order-value-tooltip'
              data-tooltip-html={`Order Value represents the total value of the</br> underlying asset. It considers the current price of</br>  the asset,the quantity of contracts traded, and the</br> standardized units per contract.`}
            >
              Order Value
            </a>
            <p className='text-[12px] text-tetriary font-semibold'>
              {!noMarkets && selectedMarket?.oraclePrice != null
                ? currencyFormatter.format(orderValue)
                : '-'}{' '}
              {currencySymbol}
            </p>
          </div>
          <div className='flex items-center justify-between gap-2 mt-1'>
            <a
              className='text-[13px] decoration-dotted	underline cursor-help	'
              data-tooltip-id='order-cost-tooltip'
              data-tooltip-html={`Order Cost is mandatory initial deposit,</br> set at ${Number(
                selectedMarket?.initialMargin
              )}% of the contract value being traded,</br> but not lower than 500 ${currencySymbol}.`}
            >
              Order Cost
            </a>
            <p className='text-[13px] font-semibold'>
              {!noMarkets ? currencyFormatter.format(orderCost) : '-'}{' '}
              {currencySymbol}
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2 '>
        <button
          onClick={() => handleWriteOrder(OrderSideEnum.LONG)}
          disabled={isActionDisabled}
          className={`transition justify-center ease-in flex-1 text-white flex flex-col items-center rounded-lg h-[50px] ${
            isActionDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#569b6e] hover:bg-[#4c8660]'
          }`}
        >
          {isLongLoading ? (
            <ReactLoading type='spin' height={22} width={22} color='white' />
          ) : (
            <div>
              <p className=' text-[13px] font-semibold'>Buy</p>
              <p className=' text-[10px]'>Long</p>
            </div>
          )}
        </button>
        <button
          onClick={() => handleWriteOrder(OrderSideEnum.SHORT)}
          disabled={isActionDisabled}
          className={`transition justify-center ease-in flex-1 text-white flex flex-col items-center rounded-lg h-[50px] ${
            isActionDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#8f605f] hover:bg-[#7a504f]'
          }`}
        >
          {isShortLoading ? (
            <ReactLoading type='spin' height={22} width={22} color='white' />
          ) : (
            <div>
              <p className=' text-[13px] font-semibold'>Sell</p>
              <p className='text-[10px]'>Short</p>
            </div>
          )}
        </button>
      </div>
      {isBidenMarket && (
        <FinanceManagerWarning error='This market (BIGSB_EL:BIDENX2024) will close at 18:00 UTC on 26 July 2024. ' />
      )}
      {!address && (
        <FinanceManagerWarning error='Connect your wallet to place your order.' />
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
      {address && Number(quantity) === 0 && (
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
      {/*       <Tooltip id='margin-tooltip' style={{ fontSize: '12px' }} /> */}
    </div>
  );
};
