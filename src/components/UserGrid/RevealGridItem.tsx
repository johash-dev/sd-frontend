import { EstimationDto } from '@/models/Story';
import { UserResponseDto } from '@/models/User';
import { FC } from 'react';
import PokerCard from '../PokerCard';
import { getFibonacciEstimate } from '@/features/estimationSlice';

type RevealGridItemProps = {
  participant: UserResponseDto;
  estimate?: EstimationDto;
};

const RevealGridItem: FC<RevealGridItemProps> = ({ participant, estimate }) => {
  return (
    <div className="flex items-center justify-between bg-white px-5 py-5 relative">
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-28 h-28 bg-gray-600 rounded-full"></div>
        <p>{participant.firstName}</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <PokerCard value={estimate?.optimistic ?? 0} index={0} />
        <PokerCard value={estimate?.realistic ?? 0} index={0} />
        <PokerCard value={estimate?.pessimistic ?? 0} index={0} />
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-4xl">
          {getFibonacciEstimate(
            estimate?.optimistic ?? 0,
            estimate?.realistic ?? 0,
            estimate?.pessimistic ?? 0
          )}
        </span>
      </div>
    </div>
  );
};

export default RevealGridItem;
