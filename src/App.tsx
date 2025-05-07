import { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { RootState, useAppDispatch } from './app/store';
import { verifyToken } from './features/authSlice';
import socket from './socket';
import { AppSessionStorage } from './lib/utils';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const user = AppSessionStorage.getUser();
    if (user) {
      dispatch(verifyToken(user.token));
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.auth = { token: user.token };
      socket.connect();
    }
  }, [user]);

  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}

export default App;
