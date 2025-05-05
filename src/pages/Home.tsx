import { StoryPanel } from '@/components/StoryPanel';
import { VotePanel } from '@/components/VotePanel';
import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/app/store';
import { getRoom, joinRoom } from '@/features/roomSlice';
import { useParams } from 'react-router';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { JoinRoomDto } from '@/socket/models/room.models';

type HomeProps = {
  children?: ReactNode;
};

type RouteParams = {
  roomCode: string;
};

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<RouteParams>();

  useEffect(() => {
    if (params && params.roomCode) {
      dispatch(joinRoom(params.roomCode));
    }
  }, [params, dispatch]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_JOINED, (response: JoinRoomDto) => {
      dispatch(getRoom(response.roomCode));
    });
  }, []);

  return (
    <div className="h-full flex">
      <StoryPanel />
      <VotePanel />
    </div>
  );
};

export default Home;
