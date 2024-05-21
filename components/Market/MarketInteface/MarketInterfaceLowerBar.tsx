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

export const MarketInterfaceLowerBar = () => {
  const { address } = useAccount();
  const { data, refetch } = useNativeCurrencyBalance(address);
  const [userMargins] = useAtom(userMarginsAtom);
  const [selectedMarketMargin] = useAtom(selectedMarketMarginAtom);

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
          <p className='text-tetriary font-semibold'>Wallet balance</p>
          <p className='text-white'>
            {address
              ? `${currencyFormatter.format(
                  Number(data?.formatted)
                )} ${currencySymbol}`
              : '-'}
          </p>
        </div>
        <div className=' text-[11px]  '>
          <p className='text-tetriary font-semibold'>Total deposits</p>
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
            <p className='text-tetriary font-semibold'>Wallet balance</p>
            <p className='text-white'>
              {address
                ? `${currencyFormatter.format(
                    Number(data?.formatted)
                  )} ${currencySymbol}`
                : '-'}
            </p>
          </div>
          <div className='sm:border-l sm:border-[#444650]  sm:h-[32px] text-xs pl-2'>
            <p className='text-tetriary font-semibold'>Total deposits</p>
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
              <p className='text-tetriary font-semibold'>Market deposit</p>
            </div>
            <div className='text-white'>
              {!address && '-'}
              {address &&
                selectedMarketMargin?.margin &&
                `${currencyFormatter.format(
                  Number(selectedMarketMargin?.margin)
                )} ${currencySymbol}`}
              {address && selectedMarketMargin?.margin === undefined && (
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
    </div>
  );
};
