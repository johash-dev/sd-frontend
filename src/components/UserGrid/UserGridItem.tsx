import { FC, useEffect } from 'react';
import PokerCard from '../PokerCard';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';

import { Participant } from '@/models/Room';
import socket from '@/socket';
import { RootState, useAppDispatch } from '@/app/store';
import { addEstimationToStory } from '@/features/roomSlice';
import { useSelector } from 'react-redux';

type UserGridItemProps = {
  participant: Participant;
};

const UserGridItem: FC<UserGridItemProps> = ({ participant }) => {
  const dispatch = useAppDispatch();
  const { selectedStory } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    socket.on('storyEstimationStarted', () => {
      console.log('storyEstimationStarted');

      if (selectedStory) {
        dispatch(
          addEstimationToStory({
            userId: participant.user.id,
            storyId: selectedStory?.id,
            optimistic: null,
            pessimistic: null,
            realistic: null,
            ready: false,
          })
        );
      }
    });
  }, []);

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
