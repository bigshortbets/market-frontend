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
import { marketsAtom } from '@/store/store';
import { Tooltip } from 'react-tooltip';

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data, refetch } = useNativeCurrencyBalance(address);
  const [userMargins] = useAtom(userMarginsAtom);
  const [selectedMarketMargin] = useAtom(selectedMarketMarginAtom);
  const [markets] = useAtom(marketsAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='h-[58px] border-t border-[#444650] px-5 py-3'>
      <div className='sm:hidden flex items-center justify-between h-full'>
        <div className=' text-[11px] '>
          <p className='text-tetriary font-semibold'>Wallet Balance</p>
          <p className='text-white'>
            {address
              ? `${currencyFormatter.format(
                  Number(data?.formatted)
                )} ${currencySymbol}`
              : '-'}
          </p>
        </div>
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
      </div>
      <div className=' hidden sm:flex items-center justify-between '>
        <div className='flex items-center gap-10'>
          <div className=' text-xs '>
            <a
              data-tooltip-id='wallet-balance-tooltip'
              data-tooltip-html={`Source of funds reseved for Initial Margin when Open Order is created. `}
            >
              <p className='text-tetriary font-semibold cursor-default'>
                Wallet Balance
              </p>
            </a>
            <p className='text-white'>
              {address
                ? `${currencyFormatter.format(
                    Number(data?.formatted)
                  )} ${currencySymbol}`
                : '-'}
            </p>
          </div>
          <div className='sm:border-l sm:border-[#444650]  sm:h-[32px] text-xs pl-2'>
            <p className='text-tetriary font-semibold'>Total Margin</p>
            <p>
              {address
                ? `${currencyFormatter.format(
                    userMargins.totalMarginValue
                  )} ${currencySymbol}`
                : '-'}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-xs'>
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
          </div>
          <LiquidationStatusTab
            status={
              selectedMarketMargin?.liquidationStatus as LiquidationStatusType
            }
          />
        </div>
      </div>
      <Tooltip id='wallet-balance-tooltip' style={{ fontSize: '12px' }} />
      <Tooltip id='market-margin-tooltip' style={{ fontSize: '12px' }} />
    </div>
  );
};
