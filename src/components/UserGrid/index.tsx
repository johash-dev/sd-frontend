import { FC } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const UserGrid: FC = () => {
  const { room } = useSelector((state: RootState) => state.room);

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-3">
        {room?.participants?.map((particpant) => {
          return <UserGridItem participant={particpant} key={particpant.id} />;
        })}
      </div>
    </div>
  );
};

export { UserGrid };
