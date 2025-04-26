import { StoryPanel } from '@/components/StoryPanel';
import { FC, ReactNode } from 'react';

type HomeProps = {
  children?: ReactNode;
};

const Home: FC<HomeProps> = () => {
  return (
    <div className="h-full">
      <StoryPanel />
    </div>
  );
};

export default Home;
