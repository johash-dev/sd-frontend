import { FC, useEffect } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { EstimationReadyDto } from '@/socket/models/estimation.models';
import { getRoom } from '@/features/roomSlice';

const UserGrid: FC = () => {
  const dispatch = useAppDispatch();
  const { room } = useSelector((state: RootState) => state.room);
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedStory } = useSelector((state: RootState) => {
    const story = state.room.room?.stories.find((s) => s.selected);
    return { selectedStory: story };
  });

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_READY, (response: EstimationReadyDto) => {
      console.log('response', response);

      dispatch(getRoom(response.roomCode));
    });
  }, []);

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-3">
        {room?.participants?.map((particpant) => {
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
