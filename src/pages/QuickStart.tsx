import { RootState, useAppDispatch } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createNewRoom, setRoomDetail } from '@/features/roomSlice';
import { RoomDetail, RoomDto } from '@/models/Room';
import socket from '@/socket';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const QuickStart: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [roomCode, setRoomCode] = useState<string>('');
  const [roomTitle, setRoomTitle] = useState<string>('');
  const { room } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (room) {
      navigate(`/room/${room.roomCode}`);
    }
  }, [room, navigate]);

  useEffect(() => {
    socket.on('createdRoom', (response) => {
      dispatch(createNewRoom(response));
    });

    socket.on('joinedRoom', (response: RoomDetail) => {
      navigate(`/room/${response.roomCode}`);
      dispatch(setRoomDetail(response));
    });
  }, []);

  const onCreateRoom = () => {
    const roomDto: RoomDto = {
      title: roomTitle,
    };
    socket.emit('createRoom', roomDto);
  };

  const onJoinRoom = () => {
    socket.emit('joinRoom', roomCode);
  };

  const roomCodeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  const roomTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

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
          <Button onClick={onCreateRoom}>Create Room</Button>
          <Input
            value={roomCode}
            onChange={roomCodeChangeHandler}
            placeholder="Enter Room Code"
          />
          <Button variant="outline" onClick={() => onJoinRoom()}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export { QuickStart };
