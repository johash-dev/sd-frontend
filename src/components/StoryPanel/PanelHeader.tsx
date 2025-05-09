import { FC } from 'react';
import { Button } from '../ui/button';
import { RiShareFill, RiSettings3Fill } from '@remixicon/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const PanelHeader: FC = () => {
  const { room } = useSelector((state: RootState) => state.room);

  return (
    <div className="bg-primary h-20 sticky flex justify-between items-center px-5  rounded-2xl">
      <div className="text-white">
        <h1 className="font-bold text-xl">{room?.title}</h1>
        {/* <p className="text-sm">{room && room?.owner.firstName}</p> */}
      </div>
      <div className="flex gap-6">
        <Button>
          <RiShareFill size={36} color="white" />
        </Button>
        <Button>
          <RiSettings3Fill size={36} color="white" />
        </Button>
      </div>
    </div>
  );
};

export { PanelHeader };
