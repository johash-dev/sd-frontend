import { FC } from 'react';
import { PanelHeader } from './PanelHeader';
import { PanelFooter } from './PanelFooter';
import { StoryList } from '../StoryList';

const StoryPanel: FC = () => {
  return (
    <section className="w-1/3 h-full bg-black relative flex flex-col">
      <PanelHeader />
      <StoryList />
      <PanelFooter />
    </section>
  );
};

export { StoryPanel };
