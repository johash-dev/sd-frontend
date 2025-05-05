import { FC } from 'react';
import { User } from '../User';
import { RootState, useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { updateRoomStory } from '@/features/roomSlice';
import { UserStoryStatus } from '@/models/Room';

const VotePanelHeader: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedStory } = useSelector((state: RootState) => {
    const story = state.room.roomDetail?.stories.find((s) => s.selected);
    return { selectedStory: story };
  });

  const { roomDetail } = useSelector((state: RootState) => state.room);

  const startEstimationsClickHandler = () => {
    if (selectedStory && roomDetail) {
      dispatch(
        updateRoomStory({
          id: selectedStory.id,
          roomId: roomDetail?.id,
          status: UserStoryStatus.IN_ESTIMATION,
        })
      );
    }
  };

  return (
    <div className="bg-[#1C5CA7] w-full h-20 sticky flex justify-between items-center px-5">
      <div className="text-white">
        <h1 className="text-2xl">{selectedStory?.title}</h1>
        <p className="text-sm text-[#E6E6E6]">
          Estimation {selectedStory?.status}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {roomDetail?.owner.id === user?.id ? (
          <Button onClick={startEstimationsClickHandler}>
            Start Estimations
          </Button>
        ) : null}
        <User />
        <span className="text-white font-medium">{user?.firstName}</span>
      </div>
    </div>
  );
};

export { VotePanelHeader };
