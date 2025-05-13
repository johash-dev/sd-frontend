import { FC } from 'react';

type PokerCardProps = {
  button?: boolean;
  value: number | null;
  back?: boolean;
  change?: (value: number | null) => void;
  click?: (index: number) => void;
  index: number;
  size?: 'lg' | 'md';
};

const PokerCard: FC<PokerCardProps> = ({
  button = false,
  value,
  change,
  click,
  back = false,
  index,
  size = 'md',
}) => {
  let pokerCardClassess = `${size === 'md' ? 'h-28' : 'h-32'} ${size === 'md' ? 'w-20' : 'w-24'} bg-[#F0F0F0] text-black drop-shadow-sm flex items-center justify-center relative rounded-md mb-[-30px] transition-all duration-300`;

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
          <div className="p-1.5 h-full bg-[#3178C6] rounded-md">
            <div className="border border-gray-200 text-gray-200 h-full w-full flex items-center justify-center text-center font-semibold text-sm rounded-md">
              <span>Story Points</span>
            </div>
          </div>
          {/* <span>
            <RiPokerClubsFill size={18} />
          </span> */}
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
