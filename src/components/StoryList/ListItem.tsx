import { FC } from 'react';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';
import { useAppDispatch } from '@/app/store';
import { updateRoomStory } from '@/features/roomSlice';
import { StorySummaryDto } from '@/models/Story';

type ListItemProps = {
  detail: StorySummaryDto;
  roomId: string;
};

const ListItem: FC<ListItemProps> = ({ detail, roomId }) => {
  const dispatch = useAppDispatch();

  const onStoryItemClickHandler = () => {
    dispatch(
      updateRoomStory({
        id: detail.id,
        roomId: roomId,
        selected: true,
      })
    );
  };

  return (
    <div
      className="bg-white rounded-sm py-1 flex justify-between pe-4"
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
