import { FC, useEffect } from 'react';
import { ListHeader } from './ListHeader';
import { ListFooter } from './ListFooter';
import ListItem from './ListItem';
import { RootState, useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { SelectStoryDto } from '@/socket/models/story.models';
import { selectStory, selectStoryInRoom } from '@/features/roomSlice';

const StoryList: FC = () => {
  const dispatch = useAppDispatch();
  const { room } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.SELECTED_STORY, (response: SelectStoryDto) => {
      console.log('SELECTED STORY', response);

      dispatch(selectStoryInRoom(response));
    });
  }, []);

  const onSelectStory = (storyId: string, roomCode: string) => {
    dispatch(selectStory({ storyId, roomCode }));
  };

  return (
    <div className="flex-grow px-3.5">
      <div className="flex flex-col h-full">
        <ListHeader />
        <div className="flex-grow mt-2.5 px-2">
          <div className="flex flex-col gap-2">
            {room?.stories.map((story) => {
              return (
                <ListItem
                  key={story.id}
                  detail={story}
                  roomId={room.id}
                  roomCode={room.roomCode}
                  onSelect={onSelectStory}
                />
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
