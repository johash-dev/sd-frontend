import { LoginForm } from '@/components/LoginForm/LoginForm';
import { FC } from 'react';

const Login: FC = () => {
  return (
    <div className="h-full bg-[#03346E] flex items-center justify-center">
      <div className="w-1/4 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center p-3.5 pt-6">
          <h1 className="text-5xl">Scrum Deck</h1>
          <p>Please login here</p>
        </div>
        <div className="p-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export { Login };
