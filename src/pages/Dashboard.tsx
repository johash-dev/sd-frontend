import { RootState, useAppDispatch } from '@/app/store';
import { RoomList } from '@/components/RoomList';
import { createRoom, getAllRooms, joinRoom } from '@/features/room/roomSlice';
import socket from '@/socket';
import { JoinRoomDto } from '@/socket/models/room.models';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { JoinRoomForm } from '@/components/JoinRoomForm';
import { User } from '@/components/User';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RiAddCircleLine } from '@remixicon/react';
import CreateRoomDialog from '@/components/CreateRoomDialog';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getAllRooms());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleCreatedRoom = (response: JoinRoomDto) => {
      if (response && response.roomCode) {
        navigate(`/room/${response.roomCode}`);
      }
    };

    socket.on(SOCKET_EVENTS.CREATED_ROOM, handleCreatedRoom);

    return () => {
      socket.off(SOCKET_EVENTS.CREATED_ROOM, handleCreatedRoom);
    };
  }, [navigate]);

  useEffect(() => {
    const handleUserJoined = (response: JoinRoomDto) => {
      if (response && response.roomCode && response.user.id === user?.id) {
        navigate(`/room/${response.roomCode}`);
      }
    };

    socket.on(SOCKET_EVENTS.USER_JOINED, handleUserJoined);

    return () => {
      socket.off(SOCKET_EVENTS.USER_JOINED, handleUserJoined);
    };
  }, [navigate, user]);

  const handleCreateRoom = (title: string) => {
    dispatch(createRoom({ title }));
  };

  const handleJoinRoom = (roomCode: string) => {
    dispatch(joinRoom(roomCode));
  };

  const handleContinueRoom = (roomCode: string) => {
    dispatch(joinRoom(roomCode));
  };

  return (
    <div>
      <div className="w-full h-16 bg-[#010409] flex items-center justify-between px-40 border-b border-b-[#3D444D]">
        <span className="text-white text-2xl font-semibold">Scrum Deck</span>
        <User firstName={user?.firstName ?? ''} />
      </div>
      <div className="mx-40 mt-8 bg-[#0D1117]">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome {user?.firstName}!
            </h1>
            <p className="text-gray-400">
              Estimate user stories with your team
            </p>
          </div>
          <CreateRoomDialog onConfirm={handleCreateRoom}>
            <Button>
              <span>
                <RiAddCircleLine />
              </span>
              Create Room
            </Button>
          </CreateRoomDialog>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <RoomList onContinue={handleContinueRoom} />
          </div>
          <div>
            <JoinRoomForm onSubmit={handleJoinRoom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as Dashboard };
