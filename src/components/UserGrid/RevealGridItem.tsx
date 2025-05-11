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
    <div className="flex items-center justify-between bg-[#151B23] px-5 py-5 relative rounded-2xl">
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <div className="w-28 h-28 bg-gray-600 rounded-full"></div>
        <p>{participant.firstName}</p>
      </div>
      <div className="flex-2 flex items-center justify-center">
        <div className="flex gap-2">
          <PokerCard value={estimate?.optimistic ?? 0} index={0} />
          <PokerCard value={estimate?.realistic ?? 0} index={0} />
          <PokerCard value={estimate?.pessimistic ?? 0} index={0} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <span className="font-bold text-4xl">
          {getFibonacciEstimate(
            estimate?.optimistic ?? 0,
            estimate?.realistic ?? 0,
            estimate?.pessimistic ?? 0
          )}
        </span>
        <p>Average</p>
      </div>
    </div>
  );
};

export default RevealGridItem;
