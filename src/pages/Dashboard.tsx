import { RootState, useAppDispatch } from '@/app/store';
import { RoomList } from '@/components/RoomList';
import { createRoom, getAllRooms, joinRoom } from '@/features/roomSlice';
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

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getAllRooms());
    }
  }, [user]);

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

      if (response && response.roomCode && response.user.id === user?.id) {
        navigate(`/room/${response.roomCode}`);
      }
    });
  }, []);

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
          <Button>
            <span>
              <RiAddCircleLine />
            </span>
            Create Room
          </Button>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <RoomList onContinue={handleContinueRoom} />
          </div>

          <div>
            <JoinRoomForm onSubmit={handleJoinRoom} />

            {/* <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="join">Join</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <CreateRoomForm onSubmit={handleCreateRoom} />
              </TabsContent>
              <TabsContent value="join">
                <JoinRoomForm onSubmit={handleJoinRoom} />
              </TabsContent>
            </Tabs> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as Dashboard };
