import { ChangeEvent, FC, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import { creatStoryForRoom } from '@/features/roomSlice';

const PanelFooter: FC = () => {
  const disptach = useAppDispatch();
  const [storyTitle, setTitle] = useState<string>('');
  const { roomDetail } = useSelector((state: RootState) => state.room);

  const storyTitleTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onAddStory = () => {
    if (roomDetail) {
      disptach(creatStoryForRoom({ title: storyTitle, roomId: roomDetail.id }));
    }
  };

  return (
    <div className="bg-white flex items-center px-5 py-7 gap-4">
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
