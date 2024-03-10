import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { FinanceManagerTab } from './FinanceManagerTab';
import { OrderManager } from '../OrderManager/OrderManager';
import { MarketType } from '@/types/marketTypes';
import { Deposit } from '../Deposit/Deposit';
import { Withdraw } from '../Withdraw/Withdraw';
import { ContractDetails } from '../ContractDetails/ContractDetails';
import { Bridge } from '../Bridge/Bridge';

interface FinanceManagerProps {
  markets: MarketType[];
}

const tabs = ['order', 'deposit', 'withdraw', 'bridge'];

export type FinanceManagerTabsType = (typeof tabs)[number];
export const financeManagerAtom = atom<FinanceManagerTabsType>('order');

export const FinanceManager = ({ markets }: FinanceManagerProps) => {
  const [financeManagerState] = useAtom(financeManagerAtom);

  const [loading, setLoading] = useState<boolean>(true);

  const handleSetLoading = (val: boolean) => {
    setLoading(val);
  };
  return (
    <div
      className='h-full w-full sm:w-[360px] sm:border-r border-[#444650] overflow-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 228px)' }}
    >
      <div className='flex flex-col '>
        <div className='py-3 px-2.5 border-b border-[#444650] flex items-center gap-2'>
          {tabs.map((tab, key) => (
            <FinanceManagerTab value={tab} key={key} />
          ))}
        </div>
        {financeManagerState === 'order' && (
          <OrderManager markets={markets} handleSetLoading={handleSetLoading} />
        )}
        {financeManagerState === 'deposit' && <Deposit />}
        {financeManagerState === 'withdraw' && <Withdraw />}
        {financeManagerState === 'bridge' && <Bridge />}
      </div>
      <div className='px-[10px] pb-2'>
        <ContractDetails markets={markets} />
      </div>
    </div>
    /* <div
      className={`w-[300px] h-[440px] rounded p-1 bg-secondary-bg relative flex flex-col ${
        loading && loadingState
      }`}
    >
      {loading && (
        <ReactLoading
          type={'spin'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width={60}
        />
      )}
      <div
        className={`w-full flex p-1 ${
          !address && 'pointer-events-none'
        } mb-3 h-[40px]`}
      >
        {tabs.map((tab, key) => (
          <FinanceManagerTab value={tab} key={key} />
        ))}
      </div>
      {financeManagerState === 'order' && (
        <OrderManager markets={markets} handleSetLoading={handleSetLoading} />
      )}
      {financeManagerState === 'deposit' && depositRes && (
        <Deposit
          triggerDepositRefetch={triggerDepositRefetch}
          depositValue={(depositRes as any)!.result as string}
          selectedMarket={selectedMarket!}
          handleSetLoading={handleSetLoading}
        />
      )}
    </div> */
  );
};
