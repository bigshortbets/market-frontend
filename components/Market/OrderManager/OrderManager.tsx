import { useCreateOrderWrite } from '@/blockchain/hooks/useCreateOrderWrite';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { MarketType } from '@/types/marketTypes';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { scaleNumber } from '@/utils/scaleNumber';
import { FinanceManagerWarning } from '../FinanceManager/FinanceManagerWarning';
import { checkIfDivisible } from '@/utils/checkIfDivisible';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { bigshortbetsChain } from '@/blockchain/chain';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';

export enum OrderSideEnum {
  LONG,
  SHORT,
}

interface OrderManagerProps {
  markets: MarketType[];
  handleSetLoading: (val: boolean) => void;
}

export const OrderManager = ({
  markets,
  handleSetLoading,
}: OrderManagerProps) => {
  const [price, setPrice] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSideOrder, setSelectedSideOrder] = useState<OrderSideEnum>(
    OrderSideEnum.LONG
  );

  const { open } = useWeb3Modal();

  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [isDivisibleByTickSize, setIsDivisibleByTickSize] = useState(
    checkIfDivisible(
      price,
      Number(scaleNumber(selectedMarket?.tickSize.toString()!))
    )
  );

  const { address } = useAccount();
  const { formattedBalance } = useNativeCurrencyBalance(address);

  const { write: writeShortOrder, isLoading: isShortLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.SHORT);
  const { write: writeLongOrder, isLoading: isLongLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.LONG);
  const { chain } = useNetwork();

  const orderCost =
    (Number(selectedMarket?.initialMargin) / 100) *
    (price * quantity * Number(selectedMarket?.contractUnit));

  const orderValue = price * quantity * Number(selectedMarket?.contractUnit);

  useEffect(() => {
    selectedMarket?.oraclePrice &&
      setPrice(Number(scaleNumber(selectedMarket?.oraclePrice.toString())));
  }, [selectedMarketId]);

  useEffect(() => {
    if (isShortLoading || isLongLoading) {
      handleSetLoading(true);
    } else {
      handleSetLoading(false);
    }
  }, [isShortLoading, isLongLoading]);

  useEffect(() => {
    const res = checkIfDivisible(
      price,
      Number(scaleNumber(selectedMarket?.tickSize.toString()!))
    );

    setIsDivisibleByTickSize(res);
  }, [price]);

  const isBsbNetwork = chain?.id === bigshortbetsChain.id;

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
      writeLongOrder?.();
    }
    if (selectedSideOrder === OrderSideEnum.SHORT) {
      writeShortOrder?.();
    }
  };

  const isActionDisabled =
    price === 0 ||
    orderCost > Number(formattedBalance) ||
    !isDivisibleByTickSize;

  return (
    <div className="p-2.5 pb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Order
        </p>
        <div className="flex flex-col">
          <label
            htmlFor="orderPriceInput"
            className="ml-1 mb-1 text-xs text-secondary font-semibold"
          >
            Price
          </label>
          <div className="relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-2">
            <NumericFormat
              allowNegative={false}
              id={'orderPriceInput'}
              className="text-right outline-none  w-[85%] bg-[#23252E] "
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
            <span className="absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs">
              USDC
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="quantityInput"
            className="ml-1 mb-1 text-xs text-secondary font-semibold"
          >
            Quantity
          </label>
          <div className="relative bg-[#23252E] border-none text-xs text-white py-3 rounded-lg px-2">
            <NumericFormat
              allowNegative={false}
              id={'quantityInput'}
              className="text-right outline-none  w-[85%] bg-[#23252E]"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <span className="absolute font-normal text-tetriary opacity-50 right-3 bottom-[12px] text-xs">
              UNIT
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div
          className={`${
            selectedSideOrder === OrderSideEnum.LONG
              ? 'text-[#87DAA4] border border-[#87DAA4]'
              : 'text-tetriary border border-[#23252E]'
          } flex-1   bg-[#23252E] py-2 flex flex-col items-center rounded-lg cursor-pointer `}
          onClick={() => setSelectedSideOrder(OrderSideEnum.LONG)}
        >
          <p className=" text-[13px] font-semibold">Buy</p>
          <p className=" text-[10px]">Long</p>
        </div>
        <div
          className={`${
            selectedSideOrder === OrderSideEnum.SHORT
              ? 'text-[#E4ADAC] border border-[#E4ADAC]'
              : 'text-tetriary border border-[#23252E]'
          } flex-1   bg-[#23252E] py-2 flex flex-col items-center rounded-lg cursor-pointer `}
          onClick={() => setSelectedSideOrder(OrderSideEnum.SHORT)}
        >
          <p className=" text-[13px] font-semibold">Sell</p>
          <p className="text-[10px]">Short</p>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-[#000211] flex flex-col gap-4">
        <p className="text-sm font-semibold text-secondary leading-[24px]">
          Summary
        </p>
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center font-semibold text-[13px] text-secondary ">
            <p>Cost of the order</p>
            <p>{orderCost.toFixed(2)} USDC</p>
          </div>
          <div className="flex justify-between items-center font-semibold text-xs text-tetriary ">
            <p>Order value</p>
            <p>{orderValue.toFixed(2)} USDC</p>
          </div>
        </div>

        <button
          onClick={handleWriteOrder}
          disabled={address ? isActionDisabled : false}
          className={`disabled:bg-gray-400 w-full rounded-lg ${
            address && isBsbNetwork
              ? selectedSideOrder === OrderSideEnum.LONG
                ? 'bg-[#87DAA4]'
                : 'bg-[#D26D6C]'
              : 'bg-[#9BA6F8]'
          } text-[#01083A] text-[13px] font-semibold py-3`}
        >
          {!address && 'Connect wallet'}
          {address && isBsbNetwork && 'Place order'}
          {address && !isBsbNetwork && 'Change network'}
        </button>
      </div>
      {!address && (
        <FinanceManagerWarning error="Connect your wallet to interact with the market. " />
      )}
      {!isDivisibleByTickSize && (
        <FinanceManagerWarning
          error={`Your price amount must be divisible by the tick size: (${scaleNumber(
            selectedMarket?.tickSize.toString()!
          )})`}
        />
      )}
    </div>
    /* <div
      className={`w-full h-[400px] rounded flex flex-col  transition ease-in-out px-1`}
    >
      <div className="mb-3">
        <div className="flex flex-col mb-3">
          <label
            htmlFor="orderPriceInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Order price
          </label>
          <div className="relative">
            <NumericFormat
              allowNegative={false}
              id={"orderPriceInput"}
              className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3 w-full"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
            <span className="absolute right-3 bottom-[14px] text-xs opacity-50">
              USDC
            </span>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="quantityInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Quantity
          </label>
          <NumericFormat
            allowNegative={false}
            id={"quantityInput"}
            className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-1">
            <p className="text-xs">Order cost</p>
            <a
              data-tooltip-id="order-cost-tooltip"
              data-tooltip-html={`<b>Order cost</b> = Initial margin * ( Order price * Quantity * Contract unit )</br> <b>${orderCost}</b> = ${
                Number(selectedMarket?.initialMargin) / 100
              } * ( ${price} * ${quantity} * ${Number(
                selectedMarket?.contractUnit
              )} )`}
            >
              <IoMdInformationCircle className="text-[#7F828F] text-sm " />
            </a>
          </div>

          <p className="text-xs">{orderCost.toFixed(2)} USDC</p>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-1">
            <p className="text-xs">Order value</p>
            <a
              data-tooltip-id="order-value-tooltip"
              data-tooltip-html={`<b>Order value</b> = Order Price * Quantity * Contract Unit</br> <b>${orderValue}</b> = ${price} * ${quantity} * ${Number(
                selectedMarket?.contractUnit
              )}`}
            >
              <IoMdInformationCircle className="text-[#7F828F] text-sm " />
            </a>
          </div>

          <p className="text-xs">{orderValue.toFixed(2)} USDC</p>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <button
          className={`flex-1  duration-300 transition bg-[#73D391] hover:bg-[#61C27B] ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled && "opacity-50 pointer-events-none"
          }`}
          onClick={() => writeLongOrder?.()}
        >
          <p className="text-white text-sm font-bold">BUY</p>
          <p className="text-white text-xs font-bold">LONG</p>
        </button>
        <button
          className={`flex-1  duration-300 bg-[#D26D6C] hover:bg-[#C53F3A] transition ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled && "opacity-50 pointer-events-none"
          }`}
          onClick={() => writeShortOrder?.()}
        >
          <p className="text-white text-sm font-bold rounded-lg">SELL</p>
          <p className="text-wwhite text-xs font-bold">SHORT</p>
        </button>
      </div>
      <Tooltip id="order-cost-tooltip" style={{ fontSize: "12px" }} />
      <Tooltip id="order-value-tooltip" style={{ fontSize: "12px" }} />
    </div> */
  );
};
