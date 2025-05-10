import { FC, useEffect } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { EstimationReadyDto } from '@/socket/models/estimation.models';
import { getRoom } from '@/features/roomSlice';
import { RevealVotesDto } from '@/socket/models/story.models';
import { setEstimateValues } from '@/features/estimationSlice';
import { UserStoryStatus } from '@/models/Story';
import RevealGridItem from './RevealGridItem';

const UserGrid: FC = () => {
  const dispatch = useAppDispatch();
  const { room } = useSelector((state: RootState) => state.room);
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedStory, storyRevealed } = useSelector((state: RootState) => {
    const story = state.room.room?.stories.find((s) => s.selected);
    const storyRevealed = story?.status === UserStoryStatus.REVEALED;
    return { selectedStory: story, storyRevealed };
  });

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_READY, (response: EstimationReadyDto) => {
      dispatch(getRoom(response.roomCode));
    });

    socket.on(SOCKET_EVENTS.REVEALED, (response: RevealVotesDto) => {
      dispatch(getRoom(response.roomCode));
    });
  }, []);

  useEffect(() => {
    if (
      selectedStory?.selected === true &&
      selectedStory.status === UserStoryStatus.REVEALED &&
      selectedStory.estimations?.length === 3
    ) {
      const estimations = selectedStory.estimations.filter(
        (estimation) => estimation.user.id === user?.id
      );
      if (estimations.length) {
        dispatch(
          setEstimateValues([
            estimations[0].optimistic ?? 0,
            estimations[0].realistic ?? 0,
            estimations[0].pessimistic ?? 0,
          ])
        );
      }
    }
  }, [selectedStory, user, dispatch]);

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-3">
        {storyRevealed
          ? selectedStory?.estimations?.map((estimate) => {
              return (
                <RevealGridItem
                  participant={estimate.user}
                  key={estimate.user.id}
                  estimate={estimate}
                />
              );
            })
          : room?.participants?.map((particpant) => {
              return (
                <UserGridItem
                  participant={particpant}
                  key={particpant.id}
                  selectedStory={selectedStory}
                  user={user}
                />
              );
            })}
      </div>
    </div>
  );
};

export { UserGrid };
