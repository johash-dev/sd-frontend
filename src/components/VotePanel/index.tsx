import { FC, useEffect } from 'react';
import { VotePanelHeader } from './VotePanelHeader';
import { VotePanelFooter } from './VotePanelFooter';
import { UserGrid } from '../UserGrid';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { StartedEstimationDto } from '@/socket/models/story.models';
import { useAppDispatch } from '@/app/store';
import { startEstimationForSelectedStory } from '@/features/roomSlice';
import toast from 'react-hot-toast';

const VotePanel: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on(
      SOCKET_EVENTS.STARTED_ESTIMATION,
      (response: StartedEstimationDto) => {
        dispatch(
          startEstimationForSelectedStory({ storyId: response.storyId })
        );
        notify();
      }
    );
  }, []);

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
