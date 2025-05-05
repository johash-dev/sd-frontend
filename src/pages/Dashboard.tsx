import { useAppDispatch } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createRoom, joinRoom } from '@/features/roomSlice';
import socket from '@/socket';
import { JoinRoomDto } from '@/socket/models/room.models';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState<string>('');
  const [roomTitle, setRoomTitle] = useState<string>('');

  const roomCodeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  const roomTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const createRoomClickHandler = () => {
    if (roomTitle) {
      dispatch(createRoom({ title: roomTitle }));
    }
  };

  const joinRoomClickHandler = () => {
    if (roomCode) {
      dispatch(joinRoom(roomCode));
    }
  };

  useEffect(() => {
    socket.on(SOCKET_EVENTS.CREATED_ROOM, (response: JoinRoomDto) => {
      if (response && response.roomCode) {
        navigate(`/room/${response.roomCode}`);
      }
    });
  }, []);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_JOINED, (response: JoinRoomDto) => {
      console.log('response', response);

      if (response && response.roomCode) {
        navigate(`/room/${response.roomCode}`);
      }
    });
  }, []);

  return (
    <div className="h-full bg-[#03346E] flex items-center justify-center">
      <div className="w-1/4 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center p-3.5 pt-6">
          <h1 className="text-5xl">Scrum Deck</h1>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <Input
            value={roomTitle}
            onChange={roomTitleChangeHandler}
            placeholder="Enter Room Title"
          />
          <Button onClick={createRoomClickHandler}>Create Room</Button>
          <Input
            value={roomCode}
            onChange={roomCodeChangeHandler}
            placeholder="Enter Room Code"
          />
          <Button variant="outline" onClick={joinRoomClickHandler}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as Dashboard };
