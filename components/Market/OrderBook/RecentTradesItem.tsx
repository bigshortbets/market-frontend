import { RecentPositionType } from '@/types/positionTypes';

interface RecentTradesItemProps {
  position: RecentPositionType;
}

export const RecentTradesItem = ({ position }: RecentTradesItemProps) => {
  return (
    <div className="py-1 flex items-center justify-between text-tetriary">
      <p>{Number(position.quantity)}</p>
      <p>{Number(position.price)}</p>
    </div>
  );
};
