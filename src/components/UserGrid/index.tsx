import { FC, useEffect, useState } from 'react';
import { UserGridItem } from './UserGridItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Participant } from '@/models/Room';

const UserGrid: FC = () => {
  const { roomDetail } = useSelector((state: RootState) => state.room);
  const [participants, setParticipants] = useState<Participant[]>();

  useEffect(() => {
    if (roomDetail && roomDetail.participants) {
      const participantList = roomDetail.participants.map((p) => p);
      setParticipants(participantList);
    }
  }, [roomDetail]);

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 gap-4 mt-3 mx-3">
        {participants?.map((particpant) => {
          return <UserGridItem participant={particpant} key={particpant.id} />;
        })}
      </div>
    </div>
  );
};

export { UserGrid };
