import { FC, useEffect } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { EstimationReadyDto } from '@/socket/models/estimation.models';
import { getRoom } from '@/features/roomSlice';
import { RevealVotesDto } from '@/socket/models/story.models';
import { resetValues } from '@/features/estimationSlice';
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
    const handleUserReady = (response: EstimationReadyDto) => {
      dispatch(getRoom(response.roomCode));
    };

    const handleRevealed = (response: RevealVotesDto) => {
      dispatch(getRoom(response.roomCode));
      dispatch(resetValues());
    };

    socket.on(SOCKET_EVENTS.USER_READY, handleUserReady);
    socket.on(SOCKET_EVENTS.REVEALED, handleRevealed);

    return () => {
      socket.off(SOCKET_EVENTS.USER_READY, handleUserReady);
      socket.off(SOCKET_EVENTS.REVEALED, handleRevealed);
    };
  }, [dispatch]);

  return (
    <div className="flex-grow p-6">
      <div className="grid grid-cols-2 gap-4 mt-3">
        {storyRevealed && selectedStory?.estimations?.length
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
