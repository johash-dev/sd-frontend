import { getColorFromName } from '@/lib/utils';
import { FC, useMemo } from 'react';

type UserProps = {
  firstName: string;
};

const User: FC<UserProps> = ({ firstName }) => {
  const bgColor = useMemo(() => getColorFromName(firstName), [firstName]);
  const firstLetter = firstName.charAt(0).toUpperCase();

  return (
    <div
      className={`h-12 w-12 rounded-full flex justify-center items-center text-center text-white font-semibold`}
      style={{ backgroundColor: bgColor }}
      title={firstName}
      aria-label={`User: ${firstName}`}
    >
      <span className="text-2xl">{firstLetter}</span>
    </div>
  );
};

export { User };
