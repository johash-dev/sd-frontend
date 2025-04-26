import { FC } from 'react';
import { UserGridItem } from './UserGridItem';

const UserGrid: FC = () => {
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-3">
        <UserGridItem />
        <UserGridItem />
        <UserGridItem />
      </div>
    </div>
  );
};

export { UserGrid };
