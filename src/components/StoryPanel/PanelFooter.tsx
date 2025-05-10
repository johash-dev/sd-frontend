import { ChangeEvent, FC, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import { createStory } from '@/features/roomSlice';

const PanelFooter: FC = () => {
  const disptach = useAppDispatch();
  const [storyTitle, setTitle] = useState<string>('');
  const { room } = useSelector((state: RootState) => state.room);

  const storyTitleTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onAddStory = () => {
    if (room) {
      disptach(createStory({ title: storyTitle, roomId: room.id }));
      setTitle('');
    }
  };

  return (
    <div className="bg-white flex items-center px-5 py-7 gap-4 rounded-2xl">
      <Input
        type="text"
        placeholder="Story Title"
        value={storyTitle}
        onChange={storyTitleTextChangeHandler}
      />
      <Button onClick={onAddStory}>Add Story</Button>
    </div>
  );
};

export { PanelFooter };
