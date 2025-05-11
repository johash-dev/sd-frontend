import { FC } from 'react';
import { CardDeck } from '../CardDeck';

const VotePanelFooter: FC = () => {
  return (
    <div className="bg-[#151B23] h-10 mx-14 rounded-tl-lg rounded-tr-lg relative drop-shadow-sm">
      <div className="absolute left-0 right-0 bottom-0">
        <CardDeck />
      </div>
    </div>
  );
};

export { VotePanelFooter };
