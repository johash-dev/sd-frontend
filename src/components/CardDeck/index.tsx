import { FC } from 'react';
import PokerCard from '../PokerCard';

const CardDeck: FC = () => {
  return (
    <div className="flex justify-around">
      <PokerCard button={true} value={0} />
      <PokerCard button={true} value={1} />
      <PokerCard button={true} value={2} />
      <PokerCard button={true} value={3} />
      <PokerCard button={true} value={5} />
      <PokerCard button={true} value={8} />
      <PokerCard button={true} value={13} />
      <PokerCard button={true} value={21} />
    </div>
  );
};

export { CardDeck };
