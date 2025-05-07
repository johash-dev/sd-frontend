import { StoryPanel } from '@/components/StoryPanel';
import { VotePanel } from '@/components/VotePanel';
import { FC, ReactNode, useEffect } from 'react';
import { RootState, useAppDispatch } from '@/app/store';
import { getRoom, joinRoom } from '@/features/roomSlice';
import { useParams } from 'react-router';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { JoinRoomDto } from '@/socket/models/room.models';
import { CreateStoryDto } from '@/socket/models/story.models';
import { useSelector } from 'react-redux';

type HomeProps = {
  children?: ReactNode;
};

type RouteParams = {
  roomCode: string;
};

const Room: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<RouteParams>();
  const { room } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (params && params.roomCode && !room) {
      dispatch(joinRoom(params.roomCode));
    }
  }, [params, dispatch, room]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_JOINED, (response: JoinRoomDto) => {
      dispatch(getRoom(response.roomCode));
    });

    socket.on(SOCKET_EVENTS.CREATED_STORY, (response: CreateStoryDto) => {
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

export default Room;
