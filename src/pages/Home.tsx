import { StoryPanel } from '@/components/StoryPanel';
import { VotePanel } from '@/components/VotePanel';
import { FC, ReactNode, useEffect } from 'react';
import socket from '@/socket';
import { Story } from '@/models/Room';
import { useAppDispatch } from '@/app/store';
import { addStoryToRoom, getRoom } from '@/features/roomSlice';
import { useParams } from 'react-router';

type HomeProps = {
  children?: ReactNode;
};

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      dispatch(getRoom(params.id));
    }
  });

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
