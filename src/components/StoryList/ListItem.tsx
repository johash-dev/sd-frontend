import { FC } from 'react';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';
import { StorySummaryDto } from '@/models/Story';

type ListItemProps = {
  detail: StorySummaryDto;
  roomId: string;
  roomCode: string;
  onSelect?: (storyId: string, roomId: string) => void;
};

const ListItem: FC<ListItemProps> = ({ detail, roomCode, onSelect }) => {
  const onStoryItemClickHandler = () => {
    if (onSelect) {
      onSelect(detail.id, roomCode);
    }
  };

  return (
    <div
      className="bg-[#151B23] rounded-2xl py-1.5 flex justify-between pe-4"
      onClick={onStoryItemClickHandler}
    >
      <div className="flex items-center min-w-0">
        <Button variant="ghost">
          <RiMore2Fill size={16} color="black" />
        </Button>
        <p className="truncate flex-1">{detail.title}</p>
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
