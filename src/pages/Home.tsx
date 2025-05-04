import { StoryPanel } from '@/components/StoryPanel';
import { VotePanel } from '@/components/VotePanel';
import { FC, ReactNode, useEffect } from 'react';
import socket from '@/socket';
import { RoomDetail, Story, StoryDetail } from '@/models/Room';
import { RootState, useAppDispatch } from '@/app/store';
import {
  addStoryToRoom,
  setRoomDetail,
  updateStory,
} from '@/features/roomSlice';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

type HomeProps = {
  children?: ReactNode;
};

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const { roomDetail } = useSelector((state: RootState) => state.room);
  const { user } = useSelector((state: RootState) => state.auth);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      socket.emit('rejoinRoom', params.id);
    }
  }, [params]);

  useEffect(() => {
    socket.on('rejoined', (response: RoomDetail) => {
      dispatch(setRoomDetail(response));
    });

    socket.on('storyUpdated', (response: StoryDetail) => {
      console.log('storyUpdate', response);

      dispatch(updateStory(response));
    });
  }, []);

  // useEffect(() => {
  //   if (params.id) {
  //     dispatch(getRoom(params.id));
  //   }
  // });

  useEffect(() => {
    // if(roomDetail && user) {
    //   if(roomDetail.owner.id === user.id) {
    //     dispatch(createRoom())
    //   }
    // }
  }, [roomDetail, user]);

  useEffect(() => {
    socket.on('storyCreated', (story: Story) => {
      dispatch(addStoryToRoom(story));
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
