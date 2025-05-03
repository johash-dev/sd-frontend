import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '@/api/auth-api';
import { LoginFormData } from '@/models/Login';
import { AuthUser } from '@/models/Auth';
import { AppLocalStorage } from '@/lib/utils';

export interface AuthState {
  user?: AuthUser;
}

const initialState: AuthState = {
  user: undefined,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginFormData: LoginFormData) => {
    const response = await AuthAPI.login(loginFormData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      AppLocalStorage.setUser(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
