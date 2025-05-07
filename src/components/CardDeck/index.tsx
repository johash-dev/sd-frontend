import { FC } from 'react';
import PokerCard from '../PokerCard';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import { UserStoryStatus } from '@/models/Story';
import { setEstimationValue } from '@/features/estimationSlice';

const CardDeck: FC = () => {
  const dispatch = useAppDispatch();
  const estimationValues: Array<number> = [0, 1, 2, 3, 5, 8, 13, 21];
  const { selectedStory } = useSelector((state: RootState) => {
    const story = state.room.room?.stories.find((s) => s.selected);
    return { selectedStory: story };
  });

  const onPokerValueChange = (value: number | null) => {
    if (value !== null) {
      dispatch(setEstimationValue(value));
    }
  };

  return (
    <div className="flex justify-around">
      {estimationValues.map((estimationValue, index) => {
        return (
          <>
            <PokerCard
              button={selectedStory?.status === UserStoryStatus.ACTIVE}
              value={estimationValue}
              change={onPokerValueChange}
              index={index}
              key={index}
            />
          </>
        );
      })}
    </div>
  );
};

export { CardDeck };
