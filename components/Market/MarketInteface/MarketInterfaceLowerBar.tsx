import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { selectedMarketMarginAtom, userMarginsAtom } from '../Market';
import { LiquidationStatusTab } from '../LiquidationStatusTab';
import { LiquidationStatusType } from '@/blockchain/hooks/useUserMargin';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { currencySymbol } from '@/blockchain/constants';
import ReactLoading from 'react-loading';
import { initialLoadingAtom, marketsAtom } from '@/store/store';

import { useUserPositions } from '@/hooks/useUserPositions';
import { useQuery } from '@apollo/client';
import { OPEN_ORDER_MARGIN } from '@/requests/queries';
import { useUserOrders } from '@/hooks/useUserOrders';
import { convertToSS58 } from '@/utils/convertToSS58';
import { MarketInterfaceLowerBarDataItem } from './MarketInterfaceLowerBarDataItem';

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data, refetch } = useNativeCurrencyBalance(address);
  const [userMargins] = useAtom(userMarginsAtom);
  const [selectedMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [markets] = useAtom(marketsAtom);

  const ss58Address = address && convertToSS58(address);

  const { unsettledPnL } = useUserPositions(ss58Address);
  const { openOrdersTotalMargin } = useUserOrders(ss58Address);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [initialLoading] = useAtom(initialLoadingAtom);

  const totalBalance =
    (unsettledPnL ?? 0) + // Jeśli sumPnL jest undefined, użyj 0
    (openOrdersTotalMargin ?? 0) + // Jeśli openOrdersTotalMargin jest undefined, użyj 0
    (Number(Number(data?.formatted).toFixed(2)) ?? 0) + // Jeśli data?.formatted jest undefined, użyj 0
    (Number(userMargins.totalMarginValue.toFixed(2)) ?? 0);

  const totalBalanceDisplay = `${currencyFormatter.format(
    totalBalance
  )} ${currencySymbol}`;

  const totalMarginDisplay = `${currencyFormatter.format(
    userMargins.totalMarginValue
  )} ${currencySymbol}`;

  const availableBalanceDisplay = `${currencyFormatter.format(
    Number(data?.formatted)
  )} ${currencySymbol}`;

  const currentMarketMargin = `${currencyFormatter.format(
    Number(selectedMarketMargin?.margin)
  )} ${currencySymbol}`;

  return (
    <div className='sm:h-[58px] border-t border-[#444650] px-5 py-3 overflow-x-auto sm:overflow-hidden'>
      {/* <div className='sm:hidden flex items-center justify-between h-full'>
        <MarketInterfaceLowerBarDataItem
          label='Total balance'
          value={portfolioValue}
          tooltipHtml='LOL'
          tooltipId='total-balance-tooltip'
        />
        <div className=' text-[11px]  '>
          <p className='text-tetriary font-semibold'>Total Margin</p>
          <p className='text-white'>
            {!address && '-'}
            {address &&
              userMargins.totalMarginValue &&
              `${currencyFormatter.format(
                userMargins.totalMarginValue
              )} ${currencySymbol}`}
          </p>
        </div>
        <LiquidationStatusTab
          status={
            selectedMarketMargin?.liquidationStatus as LiquidationStatusType
          }
        />
      </div> */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center sm:gap-4 gap-2'>
          <MarketInterfaceLowerBarDataItem
            label='Total Balance'
            value={totalBalanceDisplay}
            tooltipHtml={
              <div className='text-xs'>
                <p className='mb-1'>
                  <b>Total Balance</b> is the sum of: Available Balance, Total
                  Margin, Unsettled PnL, Open Orders Margin
                </p>
                <p className='text-xs text-tetriary'>
                  {totalBalance} = (
                  {Number(Number(data?.formatted).toFixed(2)) ?? 0}) + (
                  {Number(userMargins.totalMarginValue.toFixed(2)) ?? 0}) + (
                  {unsettledPnL ?? 0}) + {openOrdersTotalMargin ?? 0}
                </p>
              </div>
            }
          />
          <MarketInterfaceLowerBarDataItem
            label='Available Balance'
            value={availableBalanceDisplay}
            tooltipHtml={
              <p className='text-xs'>
                <b>Available Balance</b>: the free funds equal to your wallet
                balance (e.g., in MetaMask).
              </p>
            }
          />
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* <MarketInterfaceLowerBarDataItem
            label='Total Margin'
            value={totalMarginDisplay}
            tooltipHtml='LOL'
          /> */}
          {/*    <div className='text-xs'>
            <div className='flex items-center gap-1'>
              {' '}
              <a
                data-tooltip-id='market-margin-tooltip'
                data-tooltip-html={`Total of:</br>
Initial Margins of Open Positions in the Current Market</br>
Margin Added to the Current Market `}
              >
                <p className='text-tetriary font-semibold cursor-default'>
                  Market Margin
                </p>
              </a>
            </div>
            <div className='text-white'>
              {markets.length < 1 && '-'}
              {!address && '-'}
              {address &&
                selectedMarketMargin?.margin &&
                `${currencyFormatter.format(
                  Number(selectedMarketMargin?.margin)
                )} ${currencySymbol}`}
              {address &&
                selectedMarketMargin?.margin === undefined &&
                markets.length >= 1 && (
                  <ReactLoading
                    type='spin'
                    width={14}
                    height={14}
                    color='#444650'
                    className='mt-0.5'
                  />
                )}{' '}
            </div>
          </div> */}
          <MarketInterfaceLowerBarDataItem
            label='Market Margin'
            value={currentMarketMargin}
            tooltipHtml={
              <p className='text-xs'>
                <b>Market Margin</b> is the sum of: Initial Margins of Open
                Positions in the Current Market and Margin Added to the Current
                Market
              </p>
            }
            marketRefresh
          />
          {address && initialLoading ? (
            <div className='rounded h-3 w-3 animate-pulse bg-bigsbgrey'></div>
          ) : (
            <LiquidationStatusTab
              small
              status={
                selectedMarketMargin?.liquidationStatus as LiquidationStatusType
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
