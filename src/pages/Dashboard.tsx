import { RootState, useAppDispatch } from '@/app/store';
import { RoomList } from '@/components/RoomList';
import { createRoom, getAllRooms, joinRoom } from '@/features/roomSlice';
import socket from '@/socket';
import { JoinRoomDto } from '@/socket/models/room.models';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Room } from '@/components/RoomList/RoomCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateRoomForm } from '@/components/CreateRoomForm';
import { JoinRoomForm } from '@/components/JoinRoomForm';
import { User } from '@/components/User';
import { useSelector } from 'react-redux';

const Dashboard: FC = () => {
  const [previousRooms] = useState<Room[]>([
    {
      id: '1',
      title: 'Sprint 45 Planning',
      participants: 8,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      title: 'Bug Prioritization',
      participants: 5,
      lastActive: 'Yesterday',
    },
    {
      id: '3',
      title: 'Feature Estimation',
      participants: 6,
      lastActive: '3 days ago',
    },
    {
      id: '4',
      title: 'Backlog Refinement',
      participants: 4,
      lastActive: '1 week ago',
    },
  ]);

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

      if (response && response.roomCode) {
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
      <div className="w-full h-20 bg-primary flex items-center justify-between px-5">
        <span className="text-white text-2xl font-semibold">Scrum Deck</span>
        <User />
      </div>
      <div className="container mx-auto mt-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Estimate user stories with your team
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <RoomList rooms={previousRooms} onContinue={handleContinueRoom} />
          </div>

          <div>
            <Tabs defaultValue="create" className="w-full">
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as Dashboard };
