import { FC } from 'react';
import { User } from '../User';

const VotePanelHeader: FC = () => {
  return (
    <div className="bg-[#021526] w-full h-20 sticky flex justify-between items-center px-5">
      <div className="text-white">
        <h1 className="text-2xl">
          User Story: #30571 - Add authentication layer in frontend
        </h1>
        <p className="text-sm text-[#E6E6E6]">Estimation in progress</p>
      </div>
      <User />
    </div>
  );
};

export { VotePanelHeader };
