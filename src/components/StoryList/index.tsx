import { FC } from 'react';
import { ListHeader } from './ListHeader';
import { ListFooter } from './ListFooter';
import ListItem from './ListItem';

const StoryList: FC = () => {
  return (
    <div className="flex-grow bg-[#F4F4F4]">
      <div className="flex flex-col h-full">
        <ListHeader />
        <div className="flex-grow mt-2.5 px-2">
          <div className="flex flex-col gap-1.5">
            {/* <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem /> */}
          </div>
        </div>
        <ListFooter />
      </div>
    </div>
  );
};

export { StoryList };
