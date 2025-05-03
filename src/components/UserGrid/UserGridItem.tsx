import { FC } from 'react';
import PokerCard from '../PokerCard';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';
import { User } from '@/models/Auth';
import { Participant } from '@/models/Room';

type UserGridItemProps = {
  participant: Participant;
};

const UserGridItem: FC<UserGridItemProps> = ({ participant }) => {
  return (
    <div className="flex items-center justify-between bg-white px-5 py-5 relative">
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-28 h-28 bg-gray-600 rounded-full"></div>
        <p>{participant.user.firstName}</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <PokerCard />
        <PokerCard />
        <PokerCard />
      </div>
      <div className="flex flex-col items-center">
        <span>Mean</span>
        <p className="text-4xl">3.37</p>
      </div>
      <Button variant="ghost" className="absolute right-0 top-0">
        <RiMore2Fill size={16} color="black" />
      </Button>
    </div>
  );
};

export { UserGridItem };
