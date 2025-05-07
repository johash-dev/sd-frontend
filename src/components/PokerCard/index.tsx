import { RiPokerClubsFill } from '@remixicon/react';
import { FC } from 'react';

type PokerCardProps = {
  button?: boolean;
  value: number | null;
  back?: boolean;
  change?: (value: number | null) => void;
  click?: (index: number) => void;
  index: number;
};

const PokerCard: FC<PokerCardProps> = ({
  button = false,
  value,
  change,
  click,
  back = false,
  index,
}) => {
  let pokerCardClassess =
    'h-28 w-20 bg-[#F0F0F0] drop-shadow-sm flex items-center justify-center relative rounded-md mb-[-30px] transition-all duration-300';

  if (button) {
    pokerCardClassess += ' cursor-pointer hover:-translate-y-8';
  }

  const onClickHandler = () => {
    if (button && change) {
      change(value);
    }

    if (!button && click) {
      click(index);
    }
  };

  return (
    <div className={pokerCardClassess} onClick={onClickHandler}>
      {back ? (
        <>
          <span>
            <RiPokerClubsFill size={18} />
          </span>
        </>
      ) : (
        <>
          <span className="absolute left-0 top-0 p-0.5">{value}</span>
          <span className="text-3xl font-bold">{value}</span>
          <span className="absolute bottom-0 right-0 p-0.5">{value}</span>
        </>
      )}
    </div>
  );
};

export default PokerCard;
