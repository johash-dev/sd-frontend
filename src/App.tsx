import { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { AuthUser } from './models/Auth';
import { useAppDispatch } from './app/store';
import { setUser, verifyToken } from './features/authSlice';
import socket from './socket';
import { AppSessionStorage } from './lib/utils';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userJson = localStorage.getItem('user');
  //   if (userJson) {
  //     const user: AuthUser = JSON.parse(userJson);
  //     dispatch(setUser(user));
  //     socket.auth = { token: user.token };
  //     socket.connect();
  //   } else {
  //     navigate('/login');
  //   }
  // }, []);

  useEffect(() => {
    const user = AppSessionStorage.getUser();
    if (user) {
      dispatch(verifyToken(user.token));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}

export default App;
