import { FC } from 'react';

type PokerCardProps = {
  button?: boolean;
};

const PokerCard: FC<PokerCardProps> = ({ button = false }) => {
  let pokerCardClassess =
    'h-28 w-20 bg-[#F0F0F0] drop-shadow-sm flex items-center justify-center relative rounded-md mb-[-30px] transition-all duration-300';

  if (button) {
    pokerCardClassess += ' cursor-pointer hover:-translate-y-8';
  }

  return (
    <div className={pokerCardClassess}>
      <span className="absolute left-0 top-0 p-0.5">2</span>
      <span className="text-3xl font-bold">2</span>
      <span className="absolute bottom-0 right-0 p-0.5">2</span>
    </div>
  );
};

export default PokerCard;
