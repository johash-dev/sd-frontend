import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RoomCard, type Room } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  onContinue: (roomId: string) => void;
}

export function RoomList({ rooms, onContinue }: RoomListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Rooms</CardTitle>
        <CardDescription>Rooms you've recently participated in</CardDescription>
      </CardHeader>
      <CardContent>
        {rooms.length > 0 ? (
          <div className="space-y-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onContinue={onContinue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">
              You haven't joined any rooms yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
