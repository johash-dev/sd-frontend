import { FC, useEffect, useMemo } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { EstimationReadyDto } from '@/socket/models/estimation.models';
import { getRoom } from '@/features/room/roomSlice';
import { RevealVotesDto } from '@/socket/models/story.models';
import { resetValues } from '@/features/estimation/estimationSlice';
import { UserStoryStatus } from '@/models/Story';
import RevealGridItem from './RevealGridItem';

const UserGrid: FC = () => {
  const dispatch = useAppDispatch();
  const room = useSelector((state: RootState) => state.room.room);
  const user = useSelector((state: RootState) => state.auth.user);

  const selectedStory = useMemo(() => {
    return room?.stories.find((s) => s.selected);
  }, [room?.stories]);

  const storyRevealed = useMemo(() => {
    return selectedStory?.status === UserStoryStatus.REVEALED;
  }, [selectedStory]);

  const gridContent = useMemo(() => {
    if (storyRevealed && selectedStory?.estimations?.length) {
      return selectedStory.estimations.map((estimate) => (
        <RevealGridItem
          key={estimate.user.id}
          participant={estimate.user}
          estimate={estimate}
        />
      ));
    }

    return room?.participants?.map((participant) => (
      <UserGridItem
        key={participant.id}
        participant={participant}
        selectedStory={selectedStory}
        user={user}
      />
    ));
  }, [storyRevealed, selectedStory, room?.participants, user]);

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
      <div className="grid grid-cols-2 gap-4 mt-3">{gridContent}</div>
    </div>
  );
};

export { UserGrid };
