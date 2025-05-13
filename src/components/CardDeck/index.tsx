import { FC } from 'react';
import PokerCard from '../PokerCard';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/store';
import { UserStoryStatus } from '@/models/Story';
import { setEstimationValue } from '@/features/estimation/estimationSlice';
import { selectSelectedStory } from '@/features/room/selectors';

const CardDeck: FC = () => {
  const dispatch = useAppDispatch();
  const estimationValues: Array<number> = [0, 1, 2, 3, 5, 8, 13, 21];
  const selectedStory = useSelector(selectSelectedStory);

  const onPokerValueChange = (value: number | null) => {
    if (value !== null) {
      dispatch(setEstimationValue(value));
    }
  };

  return (
    <div className="flex justify-around">
      {estimationValues.map((estimationValue, index) => {
        return (
          <PokerCard
            button={selectedStory?.status === UserStoryStatus.ACTIVE}
            value={estimationValue}
            change={onPokerValueChange}
            index={index}
            key={index}
            size="lg"
          />
        );
      })}
    </div>
  );
};

export { CardDeck };
