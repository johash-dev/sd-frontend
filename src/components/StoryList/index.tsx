import { FC, useEffect } from 'react';
import { ListHeader } from './ListHeader';
import { ListFooter } from './ListFooter';
import ListItem from './ListItem';
import socket from '@/socket';
import { Story } from '@/models/Room';
import { RootState, useAppDispatch } from '@/app/store';
import { addStoryToRoom } from '@/features/roomSlice';
import { useSelector } from 'react-redux';

const StoryList: FC = () => {
  const dispatch = useAppDispatch();
  const { roomDetail } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    socket.on('storyCreated', (storyDto: Story) => {
      console.log(storyDto);
      dispatch(addStoryToRoom(storyDto));
    });
  }, []);

  return (
    <div className="flex-grow bg-[#F4F4F4]">
      <div className="flex flex-col h-full">
        <ListHeader />
        <div className="flex-grow mt-2.5 px-2">
          <div className="flex flex-col gap-1.5">
            {roomDetail?.stories.map((detail) => {
              return <ListItem title={detail.title} key={detail.id} />;
            })}
          </div>
        </div>
        <ListFooter />
      </div>
    </div>
  );
};

export { StoryList };
