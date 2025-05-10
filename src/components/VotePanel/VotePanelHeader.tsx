import { FC } from 'react';
import { User } from '../User';
import { RootState, useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { revealEstimate, startStoryEstimation } from '@/features/roomSlice';
import { useNavigate } from 'react-router';
import { UserStoryStatus } from '@/models/Story';

const VotePanelHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedStory } = useSelector((state: RootState) => {
    const story = state.room.room?.stories.find((s) => s.selected);
    return { selectedStory: story };
  });

  const { room } = useSelector((state: RootState) => state.room);

  const startEstimationsClickHandler = () => {
    if (selectedStory && room) {
      switch (selectedStory.status) {
        case UserStoryStatus.PENDING:
          {
            dispatch(
              startStoryEstimation({
                roomId: room.id,
                storyId: selectedStory.id,
              })
            );
          }
          break;
        case UserStoryStatus.ACTIVE: {
          dispatch(
            revealEstimate({
              roomId: room.id,
              storyId: selectedStory.id,
            })
          );
        }
      }
    }
  };

  const onDashboardClickHandler = () => {
    navigate('/dashboard');
  };

  const estimationStatus: Record<UserStoryStatus, string> = {
    ACTIVE: 'Reveal',
    COMPLETED: 'Estimation Complete',
    PENDING: 'Start Estimation',
    REVEALED: 'Estimation Complete',
  };

  return (
    <div className="bg-[#1C5CA7] w-full h-20 sticky flex justify-between items-center px-5">
      <div className="text-white">
        <h1 className="text-2xl">{selectedStory?.title}</h1>
        <p className="text-sm text-[#E6E6E6]">
          Estimation {selectedStory?.status}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        {room?.owner.id === user?.id ? (
          <Button onClick={startEstimationsClickHandler}>
            {selectedStory && estimationStatus[selectedStory?.status]}
          </Button>
        ) : null}
        <Button variant="default" onClick={onDashboardClickHandler}>
          Dashboard
        </Button>
        <User />
        <span className="text-white font-medium">{user?.firstName}</span>
      </div>
    </div>
  );
};

export { VotePanelHeader };
