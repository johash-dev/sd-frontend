import { FC } from 'react';

const ListHeader: FC = () => {
  return (
    <div className="px-5 py-3 flex justify-between items-center">
      <span className="font-bold">User Stories</span>
      <div className="flex gap-10 font-bold">
        <span>O</span>
        <span>R</span>
        <span>P</span>
        <span>Final</span>
      </div>
    </div>
  );
};

export { ListHeader };
