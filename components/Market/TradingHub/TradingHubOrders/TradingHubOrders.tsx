import { useState } from 'react';
import { TradingHubOrderTypeTab } from './TradingHubOrderTypeTab';
import { TradingHubOrdersItem } from './TradingHubOrdersItem';
import { OrderType } from '@/types/orderTypes';
import { HistoryOrderType } from '@/types/historyTypes';
import { TradingHubCompletedOrderItem } from './TradingHubCompletedOrderItem';

interface TradingHubOrdersProps {
  closeOrders: OrderType[];
  openOrders: OrderType[];
  historyOrders: HistoryOrderType[];
}

const tabs = ['open', 'close', 'finalized'];

export type TradingHubOrderTypeTabsType = (typeof tabs)[number];

export const TradingHubOrders = ({
  openOrders,
  closeOrders,
  historyOrders,
}: TradingHubOrdersProps) => {
  const [currentOrdersType, setCurrentOrdersType] =
    useState<TradingHubOrderTypeTabsType>('open');

  const changeCurrentOrdersType = (val: TradingHubOrderTypeTabsType) => {
    setCurrentOrdersType(val);
  };

  const isTableShown =
    (currentOrdersType === 'open' && openOrders.length > 0) ||
    (currentOrdersType === 'close' && closeOrders.length > 0) ||
    (currentOrdersType === 'finalized' && historyOrders.length > 0);
  return (
    <div className='w-full h-full overflow-y-auto no-scrollbar'>
      <div className='px-3 mb-2 mt-1 text-sm flex gap-2'>
        {tabs.map((tab, key) => (
          <TradingHubOrderTypeTab
            key={key}
            value={tab}
            currentOrdersType={currentOrdersType}
            setType={changeCurrentOrdersType}
          />
        ))}
      </div>

      {isTableShown ? (
        <>
          <div className='w-full border-t-[1px] border-[#2d2d2f] md:hidden max-h-[calc(100vh-320px)] md:max-h-[calc(100vh-230px)]'>
            <div className='overflow-x-auto'>
              <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs   dark:text-gray-400'>
                    {currentOrdersType === 'finalized' ? (
                      <tr>
                        <th className='font-normal py-3 pl-3'>Side</th>
                        <th className='font-normal'>Created</th>
                        <th className='font-normal'>Market</th>
                        <th className='font-normal'>Price</th>
                        <th className='font-normal'>Quantity</th>
                        <th className='font-normal'>Status</th>
                      </tr>
                    ) : (
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          Side
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Createrd
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Market
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Price
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Quantity
                        </th>

                        <th scope='col' className='px-6 py-3'></th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {/* We should make Completed and Not completed as one component */}
                    {currentOrdersType === 'open' &&
                      openOrders.map((order, key) => (
                        <TradingHubOrdersItem order={order} key={key} />
                      ))}
                    {currentOrdersType === 'close' &&
                      closeOrders.map((order, key) => (
                        <TradingHubOrdersItem order={order} key={key} />
                      ))}
                    {currentOrdersType === 'finalized' &&
                      historyOrders.map(
                        (order: HistoryOrderType, key: number) => (
                          <TradingHubCompletedOrderItem
                            order={order}
                            key={key}
                          />
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='w-full border-t-[1px] border-[#2d2d2f] hidden md:block max-h-[calc(100vh-265px)]'>
            <table className='table-auto w-full'>
              <thead className=' text-sm text-left text-[#ABACBA] border-b-[1px] border-[#23252E] bg-[#191B24]'>
                <tr className='text-xs'>
                  <th className='font-normal pb-2 py-2 pl-3 '>Side</th>
                  <th className='font-normal'>Created</th>
                  <th className='font-normal'>Market</th>
                  <th className='font-normal'>Price</th>
                  <th className='font-normal'>Quantity</th>

                  <th className='pr-3'></th>
                </tr>
              </thead>
              <tbody>
                {/* We should make Completed and Not completed as one component */}
                {currentOrdersType === 'open' &&
                  openOrders.map((order, key) => (
                    <TradingHubOrdersItem order={order} key={key} />
                  ))}
                {currentOrdersType === 'close' &&
                  closeOrders.map((order, key) => (
                    <TradingHubOrdersItem order={order} key={key} />
                  ))}
                {currentOrdersType === 'finalized' &&
                  historyOrders.map((order: HistoryOrderType, key: number) => (
                    <TradingHubCompletedOrderItem order={order} key={key} />
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <p className='opacity-20 text-2xl mt-5'>
            You don't have any {currentOrdersType} orders
          </p>
        </div>
      )}
    </div>
  );
};
