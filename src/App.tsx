import { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { RootState, useAppDispatch } from './app/store';
import { verifyToken } from './features/authSlice';
import socket from './socket';
import { AppSessionStorage } from './lib/utils';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

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
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      socket.auth = { token: user.token };
      socket.connect();
    }
  }, [user]);

  return (
    <div className="h-screen bg-[#0d1117]">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
