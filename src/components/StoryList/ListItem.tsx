import { FC } from 'react';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';

type ListItemProps = {
  title: string;
};

const ListItem: FC<ListItemProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-sm py-1 flex justify-between pe-4">
      <div className="flex items-center min-w-0">
        <Button variant="ghost">
          <RiMore2Fill size={16} color="black" />
        </Button>
        <p className="truncate flex-1">{title}</p>
      </div>
      <div className="flex items-center gap-8 ps-1.5">
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>50</span>
      </div>
    </div>
  );
};

export default ListItem;
