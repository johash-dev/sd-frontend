import { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { AuthUser } from './models/Auth';
import { useAppDispatch } from './app/store';
import { setUser } from './features/authSlice';
import socket from './socket';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: AuthUser = JSON.parse(userJson);
      dispatch(setUser(user));
      socket.auth = { token: user.token };
      socket.connect();
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
