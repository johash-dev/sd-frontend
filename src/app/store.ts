import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import roomReducer from '../features/roomSlice';
import estimationReducer from '../features/estimationSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    estimation: estimationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
