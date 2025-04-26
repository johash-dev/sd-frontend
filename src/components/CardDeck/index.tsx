import { FC } from 'react';
import PokerCard from '../PokerCard';

const CardDeck: FC = () => {
  return (
    <div className="flex justify-around">
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
      <PokerCard button={true} />
    </div>
  );
};

export { CardDeck };
