import { FC } from 'react';
import { PanelHeader } from './PanelHeader';
import { PanelFooter } from './PanelFooter';
import { StoryList } from '../StoryList';

const StoryPanel: FC = () => {
  return (
    <section className="w-2/4 h-full relative flex flex-col">
      <PanelHeader />
      <StoryList />
      <PanelFooter />
    </section>
  );
};

export { StoryPanel };
