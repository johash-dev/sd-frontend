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
import { Plus } from 'lucide-react';

interface CreateRoomFormProps {
  onSubmit: (title: string) => void;
}

export function CreateRoomForm({ onSubmit }: CreateRoomFormProps) {
  const [roomTitle, setRoomTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(roomTitle);
    setRoomTitle('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Room</CardTitle>
        <CardDescription>Start a new estimation session</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="room-title" className="text-md font-medium">
                Room Title
              </label>
              <Input
                id="room-title"
                placeholder="e.g., Sprint 46 Planning"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Create Room
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
