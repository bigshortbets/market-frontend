import { TradingHubTab } from './TradingHubTab';
import { atom } from 'jotai';
import { useAccount } from 'wagmi';
import { TradingHubContentContainer } from './TradingHubContentContainer';

const tabs = ['positions', 'orders', 'history'] as const;

export type TradingHubStateType = (typeof tabs)[number];

export const tradingHubStateAtom = atom<TradingHubStateType>('positions');

export const TradingHub = () => {
  const { address } = useAccount();

  return (
    <div
      className={` bg-secondary-bg flex-grow rounded-lg transition ease-in-out  ${
        !address && 'opacity-50 pointer-events-none'
      } no-scrollbar`}
    >
      <div className="w-full bg-primary-bg h-[45px]">
        <div className="bg-secondary-bg rounded-t w-1/2 h-full flex p-1 gap-1">
          {tabs.map((tab, key) => (
            <TradingHubTab key={key} value={tab} />
          ))}
        </div>
      </div>
      {address && <TradingHubContentContainer />}
    </div>
  );
};
