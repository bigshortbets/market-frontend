import { chosenMarketAtom } from '@/store/store';
import { RecentPositionType } from '@/types/positionTypes';
import { getPrecision } from '@/utils/getPrecision';
import { format, parseISO } from 'date-fns';
import { useAtom } from 'jotai';

interface RecentTradesItemProps {
  position: RecentPositionType;
}

export const RecentTradesItem = ({ position }: RecentTradesItemProps) => {
  const [chosenMarket] = useAtom(chosenMarketAtom);
  const precision = getPrecision(Number(chosenMarket?.tickSize));
  const date = parseISO(position.timestamp);
  return (
    <div className='py-1 flex items-center justify-between text-tetriary'>
      <p>{format(date, 'd MMMM HH:mm:ss')}</p>
      <div className='flex items-center'>
        <div className='w-[70px] text-right'>
          <p>{Number(position.quantity)}</p>
        </div>
        <div className='w-[70px] text-right'>
          <p>{Number(position.createPrice).toFixed(precision)}</p>
        </div>
      </div>
    </div>
  );
};
