import { FC } from 'react';
import PokerCard from '../PokerCard';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';
import { UserResponseDto } from '@/models/User';
import { StorySummaryDto, UserStoryStatus } from '@/models/Story';
import { AuthUser } from '@/models/Auth';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import { estimationReady, setSelectedIndex } from '@/features/estimationSlice';

type UserGridItemProps = {
  participant: UserResponseDto;
  selectedStory?: StorySummaryDto;
  user?: AuthUser;
};

const UserGridItem: FC<UserGridItemProps> = ({
  participant,
  selectedStory,
  user,
}) => {
  const { values, total } = useSelector((state: RootState) => state.estimation);
  const { room } = useSelector((state: RootState) => state.room);
  const dispatch = useAppDispatch();

  const onPokerCardClickHandler = (index: number) => {
    dispatch(setSelectedIndex(index));
  };

  const onReadyClickHandler = () => {
    dispatch(
      estimationReady({
        storyId: selectedStory?.id ?? '',
        optimistic: values[0] ?? 0,
        realistic: values[1] ?? 0,
        pessimistic: values[2] ?? 0,
        ready: true,
        roomId: room?.id ?? '',
      })
    );
  };

  return (
    <div className="flex items-center justify-between bg-white px-5 py-5 relative">
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-28 h-28 bg-gray-600 rounded-full"></div>
        <p>{participant.firstName}</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {values.map((value, index) => {
          return (
            <>
              <PokerCard
                back={
                  selectedStory &&
                  selectedStory.status === UserStoryStatus.ACTIVE &&
                  participant.id !== user?.id
                }
                value={value}
                key={index}
                index={index}
                click={onPokerCardClickHandler}
              />
            </>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        {selectedStory &&
        selectedStory.status === UserStoryStatus.ACTIVE &&
        participant.id === user?.id &&
        total &&
        !selectedStory.estimations?.filter(
          (e) => e.user.id === participant.id
        )[0].ready ? (
          <>
            <span>Mean</span>
            <p className="text-4xl">{total}</p>
            <Button onClick={onReadyClickHandler}>Ready</Button>
          </>
        ) : null}

        {selectedStory &&
        selectedStory.estimations?.filter((e) => e.user.id === participant.id)
          .length &&
        selectedStory.estimations?.filter(
          (e) => e.user.id === participant.id
        )[0].ready ? (
          <>
            <span>Ready</span>
            {selectedStory.estimations.filter(
              (e) => e.user.id === participant.id
            )[0].user.id === user?.id ? (
              <>
                <Button variant="secondary">Not Ready</Button>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <Button variant="ghost" className="absolute right-0 top-0">
        <RiMore2Fill size={16} color="black" />
      </Button>
    </div>
  );
};

export { UserGridItem };
