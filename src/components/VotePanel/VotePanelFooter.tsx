import { FC } from 'react';
import { CardDeck } from '../CardDeck';

const VotePanelFooter: FC = () => {
  return (
    <div className="bg-white h-14 mx-14 rounded-tl-full rounded-tr-full relative drop-shadow-sm">
      <div className="absolute left-0 right-0 bottom-0">
        <CardDeck />
      </div>
    </div>
  );
};

export { VotePanelFooter };
