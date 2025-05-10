import { FC } from 'react';

const ListFooter: FC = () => {
  return (
    <div className="flex px-5 py-3 bg-white justify-end rounded-2xl mb-2">
      <div className="flex gap-8 font-bold">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export { ListFooter };
