import { FC } from 'react';
import { VotePanelHeader } from './VotePanelHeader';
import { VotePanelFooter } from './VotePanelFooter';
import { UserGrid } from '../UserGrid';

const VotePanel: FC = () => {
  return (
    <div className="bg-[#F8F8F8] w-full flex flex-col overflow-hidden">
      <VotePanelHeader />
      <UserGrid />
      <VotePanelFooter />
    </div>
  );
};

export { VotePanel };
