import { RootState } from '@/app/store';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import socket from '@/socket';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="max-w-sm">
        <div className="text-center mb-5 text-2xl font-light">
          <h1>Sign in to ScrumDeck</h1>
        </div>
        <LoginForm />
      </div>
      <div>
        <Card>
          <CardContent>
            <p>
              New here? <span className="font-semibold">Create an account</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Login };
