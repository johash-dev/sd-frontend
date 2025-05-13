import { FC, useMemo } from 'react';
import { Button } from '../ui/button';
import { RiMore2Fill } from '@remixicon/react';
import { StorySummaryDto } from '@/models/Story';
import { calculateStoryEstimation } from '@/lib/utils';

type ListItemProps = {
  detail: StorySummaryDto;
  roomId: string;
  roomCode: string;
  onSelect?: (storyId: string, roomId: string) => void;
};

const ListItem: FC<ListItemProps> = ({ detail, roomCode, onSelect }) => {
  const onStoryItemClickHandler = () => {
    if (onSelect) {
      onSelect(detail.id, roomCode);
    }
  };

  const {
    weightedOptimistic,
    weightedRealistic,
    weightedPessimistic,
    finalizedWeight,
  } = useMemo(() => {
    if (detail.estimations?.length) {
      return calculateStoryEstimation(detail.estimations);
    }
    return {
      weightedOptimistic: null,
      weightedRealistic: null,
      weightedPessimistic: null,
      finalizedWeight: null,
    };
  }, [detail]);

  return (
    <div
      className={`bg-[#151B23] rounded-2xl py-1.5 flex justify-between pe-4 ${detail.selected && 'border border-[#3D444D] shadow-[0_0_8px_#3D444D]'}`}
      onClick={onStoryItemClickHandler}
    >
      <div className="flex items-center min-w-0">
        <Button variant="ghost">
          <RiMore2Fill size={16} />
        </Button>
        <p className="truncate flex-1">{detail.title}</p>
      </div>
      <div className="flex items-center gap-8 ps-1.5">
        <span>{weightedOptimistic}</span>
        <span>{weightedRealistic}</span>
        <span>{weightedPessimistic}</span>
        <span>{finalizedWeight}</span>
      </div>
    </div>
  );
};

export default ListItem;
