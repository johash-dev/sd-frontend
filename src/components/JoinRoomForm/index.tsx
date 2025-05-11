import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface JoinRoomFormProps {
  onSubmit: (code: string) => void;
}

export function JoinRoomForm({ onSubmit }: JoinRoomFormProps) {
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(roomCode);
    setRoomCode('');
  };

  return (
    <Card>
      <CardHeader>
        <span className="text-xl">Join Room</span>
        <p className="text-md text-gray-400">
          Please join a room with the room code if you were given any
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-4">
              <label htmlFor="room-code" className="text-sm font-medium">
                Room Code
              </label>
              <Input
                id="room-code"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" variant="outline" className="w-full">
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
}
