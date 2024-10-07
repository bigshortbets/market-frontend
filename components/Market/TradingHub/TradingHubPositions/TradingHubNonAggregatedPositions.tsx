import { PositionType } from '@/types/positionTypes';
import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import React from 'react';
import { useAccount } from 'wagmi';
import { TradingHubPositionsItem } from './TradingHubPositionsItem';
import { BigSBTooltip } from '@/components/BigSBTooltip';

interface TradingHubNonAggregatedPositionsProps {
  positions: PositionType[];
}

export const TradingHubNonAggregatedPositions = ({
  positions,
}: TradingHubNonAggregatedPositionsProps) => {
  const { address } = useAccount();
  const convertedAddress = convertToSS58(address!);
  const positionsWithSide = extendPositionsWithSide(
    positions,
    convertedAddress
  );

  return (
    <>
      <div className='w-full border-t-[1px] border-[#2d2d2f] md:hidden'>
        <div className='overflow-x-auto'>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs   dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Side
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Quantity
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Entry price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <BigSBTooltip
                      content={
                        <div className='text-xs'>
                          Price of the most recent settlement for this position
                        </div>
                      }
                    >
                      <p className='decoration-dotted underline cursor-help'>
                        Settlement Price
                      </p>
                    </BigSBTooltip>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Profit/loss
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Opponent&Status
                  </th>
                  <th scope='col' className='px-6 py-3'></th>
                  <th scope='col' className='px-6 py-3'></th>
                </tr>
              </thead>
              <tbody>
                {positionsWithSide.map((position) => (
                  <TradingHubPositionsItem
                    position={position}
                    key={position.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='w-full border-t-[1px] border-[#2d2d2f] hidden md:block'>
        <table className='table-auto w-full'>
          <thead className=' text-sm text-left text-[#ABACBA] border-b-[1px] border-[#23252E] bg-[#191B24]'>
            <tr className='text-xs'>
              <th className='font-normal pb-2 py-2 pl-3 '>Side</th>
              <th className='font-normal'>Market</th>
              <th className='font-normal'>Quantity</th>

              <th className='font-normal'>Entry price</th>
              <th className='font-normal'>
                {' '}
                <BigSBTooltip
                  content={
                    <div className='text-xs'>
                      Price of the most recent settlement for this position
                    </div>
                  }
                >
                  <p className='decoration-dotted underline cursor-help'>
                    Settlement Price
                  </p>
                </BigSBTooltip>
              </th>
              <th className='font-normal'>Profit / loss</th>
              <th className='font-normal'>Opponent & status</th>

              <th className='pr-3'></th>
              {/* <th className="font-normal">Created</th>
                <th className="font-normal">Market</th>
                <th className="font-normal">Price</th>
              
                <th className="pr-3"></th> */}
            </tr>
          </thead>
          <tbody>
            {positionsWithSide.map((position) => (
              <TradingHubPositionsItem
                position={position}
                key={position.id}
                isNotAggregated
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
