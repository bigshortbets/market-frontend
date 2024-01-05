import { HistoryResponse, HistoryOrderType } from '@/types/historyTypes';
import React from 'react';
import { TradingHubHistoryItem } from './TradingHubHistoryItem';

interface TradingHubHistoryProps {
  history: HistoryOrderType[];
}

export const TradingHubHistory = ({ history }: TradingHubHistoryProps) => {
  return (
    <div className="w-full h-full">
      {history.length > 0 ? (
        <table className="table-auto w-full">
          <thead className="bg-secondary-bg text-sm text-left text-[#ABACBA]">
            <tr>
              <th className="font-normal py-3 pl-3">Side</th>
              <th className="font-normal">Created</th>
              <th className="font-normal">Market</th>
              <th className="font-normal">Price</th>
              <th className="font-normal">Quantity</th>
              <th className="font-normal">Status</th>
            </tr>
          </thead>
          <tbody /* ref={animationParent} */>
            {history.map((order: HistoryOrderType, key: number) => (
              <TradingHubHistoryItem order={order} key={key} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="opacity-20 text-3xl">
            Currently no orders in the history
          </p>
        </div>
      )}
    </div>
  );
};
