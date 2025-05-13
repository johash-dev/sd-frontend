import { FC, useMemo, useCallback } from 'react';
import { User } from '../User';
import { RootState, useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import {
  reEstimateStory,
  revealEstimate,
  startStoryEstimation,
} from '@/features/room/roomSlice';
import { useNavigate } from 'react-router';
import { UserStoryStatus } from '@/models/Story';
import { RiDashboardFill } from '@remixicon/react';

const VotePanelHeader: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const room = useSelector((state: RootState) => state.room.room);

  const selectedStory = useMemo(() => {
    return room?.stories?.find((s) => s.selected);
  }, [room?.stories]);

  const estimationStatus = useMemo(() => {
    return {
      [UserStoryStatus.ACTIVE]: 'Reveal',
      [UserStoryStatus.COMPLETED]: 'Estimation Complete',
      [UserStoryStatus.PENDING]: 'Start Estimation',
      [UserStoryStatus.REVEALED]: 'Re-Estimate',
    };
  }, []);

  const estimationButtonVariant = useMemo(() => {
    return selectedStory?.status === UserStoryStatus.REVEALED
      ? 'destructive'
      : 'default';
  }, [selectedStory?.status]);

  const estimationButtonLabel = useMemo(() => {
    return selectedStory ? estimationStatus[selectedStory.status] : '';
  }, [selectedStory, estimationStatus]);

  const startEstimationsClickHandler = useCallback(() => {
    if (!selectedStory || !room) return;

    const payload = {
      roomId: room.id,
      storyId: selectedStory.id,
    };

    switch (selectedStory.status) {
      case UserStoryStatus.PENDING:
        dispatch(startStoryEstimation(payload));
        break;
      case UserStoryStatus.ACTIVE:
        dispatch(revealEstimate(payload));
        break;
      case UserStoryStatus.REVEALED:
        dispatch(reEstimateStory(payload));
        break;
    }
  }, [dispatch, room, selectedStory]);

  const onDashboardClickHandler = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const isOwner = useMemo(() => room?.owner.id === user?.id, [room, user]);

  return (
    <div className="bg-[#010409] border-b border-b-[#3D444D] h-16 w-full sticky flex justify-between items-center px-5">
      <div className="text-white">
        <h1 className="text-2xl">{selectedStory?.title}</h1>
        <p className="text-sm text-[#E6E6E6]">
          Estimation {selectedStory?.status}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        {isOwner && selectedStory && (
          <Button
            onClick={startEstimationsClickHandler}
            variant={estimationButtonVariant}
          >
            {estimationButtonLabel}
          </Button>
        )}
        <Button variant="ghost" onClick={onDashboardClickHandler}>
          <RiDashboardFill size={16} color="white" />
        </Button>
        <User firstName={user?.firstName ?? ''} />
        <span className="text-white font-medium">{user?.firstName}</span>
      </div>
    </div>
  );
};

export { VotePanelHeader };
