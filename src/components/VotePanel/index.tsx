import { FC, useEffect } from 'react';
import { VotePanelHeader } from './VotePanelHeader';
import { VotePanelFooter } from './VotePanelFooter';
import { UserGrid } from '../UserGrid';
import socket from '@/socket';
import { SOCKET_EVENTS } from '@/socket/socket-events';
import { StartedEstimationDto } from '@/socket/models/story.models';
import { useAppDispatch } from '@/app/store';
import { startEstimationForSelectedStory } from '@/features/roomSlice';

const VotePanel: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on(
      SOCKET_EVENTS.STARTED_ESTIMATION,
      (response: StartedEstimationDto) => {
        dispatch(
          startEstimationForSelectedStory({ storyId: response.storyId })
        );
      }
    );
  }, []);

  return (
    <div className="bg-[#F8F8F8] w-full flex flex-col overflow-hidden">
      <VotePanelHeader />
      <UserGrid />
      <VotePanelFooter />
    </div>
  );
};

export { VotePanel };
