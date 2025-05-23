import { Button } from '@/components/ui/button';
import { RoomResponseDto } from '@/models/Room';
import { Users, Clock, ArrowRight } from 'lucide-react';

export interface Room {
  id: string;
  title: string;
  participants: number;
  lastActive: string;
}

interface RoomCardProps {
  room: RoomResponseDto;
  onContinue: (roomId: string) => void;
}

export function RoomCard({ room, onContinue }: RoomCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-[#3D444D] rounded-lg">
      <div className="space-y-1">
        <h3 className="font-medium">{room.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.participants.length} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {/* <span>{room.lastActive}</span> */}
          </div>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onContinue(room.roomCode)}
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
