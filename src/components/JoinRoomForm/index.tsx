import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
        <CardTitle>Join a Room</CardTitle>
        <CardDescription>Enter a room code to join</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="room-code" className="text-sm font-medium">
                Room Code
              </label>
              <Input
                id="room-code"
                placeholder="Enter 6-digit code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Join Room
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
