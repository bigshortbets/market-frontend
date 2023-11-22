import { PositionType, PositionWithSide } from '@/types/positionTypes';

export const extendPositionsWithSide = (
  positions: PositionType[],
  convertedAddress: string
): PositionWithSide[] => {
  return positions.map((position) => {
    const { short } = position;
    const side = short === convertedAddress ? 'SHORT' : 'LONG';
    return { ...position, side };
  });
};
