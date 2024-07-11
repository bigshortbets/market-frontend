import { chosenMarketAtom } from '@/store/store';
import { RecentPositionType } from '@/types/positionTypes';
import { getPrecision } from '@/utils/getPrecision';
import { useAtom } from 'jotai';

interface RecentTradesItemProps {
  position: RecentPositionType;
}

export const RecentTradesItem = ({ position }: RecentTradesItemProps) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);

  const precision = getPrecision(Number(chosenMarket?.tickSize));
  return (
    <div className='py-1 flex items-center justify-between text-tetriary'>
      <p>{Number(position.quantity)}</p>
      <p>{Number(position.createPrice).toFixed(precision)}</p>
    </div>
  );
};
