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
  const dispatch = useAppDispatch();

  const {
    values,
    total,
    room,
    isCurrentUser,
    isStoryActive,
    hasSubmitted,
    isReady,
  } = useSelector((state: RootState) => {
    const { estimation, room } = state;
    const selectedEstimation = selectedStory?.estimations?.find(
      (e) => e.user.id === participant.id
    );

    const isRoomOwner = user?.id === room.room?.owner.id;
    const isCurrentUser = participant.id === user?.id;
    const isStoryActive = selectedStory?.status === UserStoryStatus.ACTIVE;
    const isStoryEstimateRevealed =
      selectedStory?.status === UserStoryStatus.REVEALED;
    const hasSubmitted = !!selectedEstimation;
    const isReady = selectedEstimation?.ready ?? false;

    return {
      values: estimation.values,
      total: estimation.total,
      room: room.room,
      isRoomOwner,
      isCurrentUser,
      isStoryActive,
      isStoryEstimateRevealed,
      hasSubmitted,
      isReady,
    };
  });

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
        {values.map((value, index) => (
          <PokerCard
            back={isStoryActive && !isCurrentUser}
            value={value}
            key={index}
            index={index}
            click={onPokerCardClickHandler}
          />
        ))}
      </div>
      <div className="flex flex-col items-center">
        {isStoryActive && isCurrentUser && total && !isReady && (
          <>
            <span>Mean</span>
            <p className="text-4xl">{total}</p>
            <Button onClick={onReadyClickHandler}>Ready</Button>
          </>
        )}

        {hasSubmitted && isReady && (
          <>
            <span>Ready</span>
          </>
        )}

        {hasSubmitted && isReady && (
          <>{isCurrentUser && <Button variant="secondary">Not Ready</Button>}</>
        )}
      </div>
      <Button variant="ghost" className="absolute right-0 top-0">
        <RiMore2Fill size={16} color="black" />
      </Button>
    </div>
  );
};

export { UserGridItem };
