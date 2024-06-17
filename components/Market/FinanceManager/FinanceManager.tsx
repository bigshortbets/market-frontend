import { atom, useAtom } from 'jotai';
import { FinanceManagerTab } from './FinanceManagerTab';
import { OrderManager } from '../OrderManager/OrderManager';
import { EnrichedMarketType } from '@/types/marketTypes';
import { Deposit } from '../Deposit/Deposit';
import { Withdraw } from '../Withdraw/Withdraw';
import { ContractDetails } from '../ContractDetails/ContractDetails';
import { Bridge } from '../Bridge/Bridge';
import { MarketInterfaceLowerBar } from '../MarketInteface/MarketInterfaceLowerBar';
import { Claim } from '../Claim/Claim';

interface FinanceManagerProps {
  markets: EnrichedMarketType[];
}

const tabs = [
  'order',
  'deposit',
  'withdraw' /* , 'claim' */ /*, 'bridge' */,
] as const;

export type FinanceManagerTabsType = (typeof tabs)[number];
export const financeManagerAtom = atom<FinanceManagerTabsType>('order');

export const FinanceManager = ({ markets }: FinanceManagerProps) => {
  const [financeManagerState] = useAtom(financeManagerAtom);

  const noMarkets = markets.length < 1;

  const showContractDetails = ['order', 'deposit', 'withdraw'].includes(
    financeManagerState
  );

  return (
    <div
      className='h-full w-full sm:w-[360px] sm:border-r border-[#444650] overflow-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 227px)' }}
    >
      <div className='flex flex-col '>
        <div className='py-3 px-2.5 border-b border-[#444650] flex items-center gap-2'>
          {tabs.map((tab, key) => (
            <FinanceManagerTab value={tab} key={key} disabled={noMarkets} />
          ))}
        </div>
        {financeManagerState === 'order' && <OrderManager markets={markets} />}
        {financeManagerState === 'deposit' && <Deposit markets={markets} />}
        {financeManagerState === 'withdraw' && <Withdraw />}
        {/* {financeManagerState === 'bridge' && <Bridge />} */}
        {/*  {financeManagerState === 'claim' && <Claim />} */}
      </div>
      {!noMarkets && showContractDetails && (
        <div className='px-[10px] pb-2'>
          <ContractDetails />
        </div>
      )}
      <div className='sm:hidden'>
        <MarketInterfaceLowerBar />
      </div>
    </div>
  );
};
