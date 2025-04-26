import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const PanelFooter: FC = () => {
  return (
    <div className="bg-white flex items-center px-5 py-7 gap-4">
      <Input type="text" placeholder="Story Title" />
      <Button>Add Story</Button>
    </div>
  );
};

export { PanelFooter };
