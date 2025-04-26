import { StoryPanel } from '@/components/StoryPanel';
import { VotePanel } from '@/components/VotePanel';
import { FC, ReactNode } from 'react';

type HomeProps = {
  children?: ReactNode;
};

const Home: FC<HomeProps> = () => {
  return (
    <div className="h-full flex">
      <StoryPanel />
      <VotePanel />
    </div>
  );
};

export default Home;
