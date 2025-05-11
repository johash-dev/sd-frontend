import { RootState } from '@/app/store';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import socket from '@/socket';
import AuthForm from '@/components/AuthForm';

const Login: FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
      handleLogin(user.token);
    }
  }, [user, navigate]);

  const handleLogin = (token: string) => {
    socket.auth = { token };
    socket.connect();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md">
        <AuthForm />
      </div>
    </div>
  );
};

export { Login };
