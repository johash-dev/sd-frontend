import { ChangeEventHandler, FC, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DialogClose } from '@radix-ui/react-dialog';

type CreateRoomDialogProps = {
  children: ReactNode;
  onConfirm?: (roomTitle: string) => void;
};

const CreateRoomDialog: FC<CreateRoomDialogProps> = ({
  children,
  onConfirm,
}) => {
  const [roomTitle, setRoomTitle] = useState<string>('');

  const onRoomTitleChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setRoomTitle(e.target.value);
  };

  const onClickHandler = () => {
    if (onConfirm) {
      onConfirm(roomTitle);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create a room to start estimating with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Room Title
            </Label>
            <Input
              id="name"
              placeholder="Sample Title"
              value={roomTitle}
              onChange={onRoomTitleChangeHandler}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={onClickHandler}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialog;
