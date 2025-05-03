import { RootState } from '@/app/store';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import socket from '@/socket';

const Login: FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/quick-start');
      handleLogin(user.token);
    }
  }, [user, navigate]);

  const handleLogin = (token: string) => {
    socket.auth = { token };
    socket.connect();
  };

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
