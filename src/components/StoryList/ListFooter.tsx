import { FC } from 'react';

const ListFooter: FC = () => {
  return (
    <div className="flex px-5 py-3 bg-white justify-end">
      <div className="flex gap-8 font-bold">
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>50</span>
      </div>
    </div>
  );
};

export { ListFooter };
