import { FC, ReactNode, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

type ShareRoomPopoverProps = {
  children: ReactNode;
};

const ShareRoomDialog: FC<ShareRoomPopoverProps> = ({ children }) => {
  const params = useParams<{ roomCode: string }>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onCopyClickHandler = () => {
    navigator.clipboard
      .writeText(params.roomCode ?? '')
      .then(
        () => {
          toast.success('Room code copied to clipboard', { duration: 3000 });
        },
        () => {
          toast.error('Something went wrong when copying the room code');
        }
      )
      .catch((e) => {
        console.log('e', e);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Room</DialogTitle>
          <DialogDescription>
            Share this room code with others
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            disabled
            value={params.roomCode}
            readOnly // Add readOnly to prevent manual editing
          />
          <Button variant="secondary" onClick={onCopyClickHandler}>
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareRoomDialog;
