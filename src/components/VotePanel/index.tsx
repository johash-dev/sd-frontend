import { FC, useEffect } from 'react';
import { VotePanelHeader } from './VotePanelHeader';
import { VotePanelFooter } from './VotePanelFooter';
import { UserGrid } from '../UserGrid';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { StartedEstimationDto } from '@/socket/models/story.models';
import { useAppDispatch } from '@/app/store';
import { startEstimationForSelectedStory } from '@/features/room/roomSlice';
import toast from 'react-hot-toast';

const VotePanel: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleStartedEstimation = (response: StartedEstimationDto) => {
      dispatch(startEstimationForSelectedStory({ storyId: response.storyId }));
      notify();
    };

    socket.on(SOCKET_EVENTS.STARTED_ESTIMATION, handleStartedEstimation);

    return () => {
      socket.off(SOCKET_EVENTS.STARTED_ESTIMATION, handleStartedEstimation);
    };
  }, [dispatch]);

  const notify = () => toast('Estimation Started');

  return (
    <div className="bg-[#010409] w-full flex flex-col overflow-hidden">
      <VotePanelHeader />
      <UserGrid />
      <VotePanelFooter />
    </div>
  );
};

export { VotePanel };
