import { FC } from 'react';
import { ListHeader } from './ListHeader';
import { ListFooter } from './ListFooter';
import ListItem from './ListItem';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

const StoryList: FC = () => {
  const { room } = useSelector((state: RootState) => state.room);

  return (
    <div className="flex-grow bg-[#F4F4F4]">
      <div className="flex flex-col h-full">
        <ListHeader />
        <div className="flex-grow mt-2.5 px-2">
          <div className="flex flex-col gap-1.5">
            {room?.stories.map((story) => {
              return (
                <ListItem key={story.id} detail={story} roomId={room.id} />
              );
            })}
          </div>
        </div>
        <ListFooter />
      </div>
    </div>
  );
};

export { StoryList };
