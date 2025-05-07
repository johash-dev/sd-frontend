import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '@/api/auth-api';
import { LoginFormData } from '@/models/Login';
import { AuthUser } from '@/models/Auth';
import { AppSessionStorage } from '@/lib/utils';

export interface AuthState {
  user?: AuthUser;
  token: string;
}

const initialState: AuthState = {
  user: undefined,
  token: '',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginFormData: LoginFormData) => {
    const response = await AuthAPI.login(loginFormData);
    return response.data;
  }
);

export const getUser = createAsyncThunk('auth/login', async (id: string) => {
  const response = await AuthAPI.getUser(id);
  return response.data;
});

export const verifyToken = createAsyncThunk(
  'auth/tokenVerify',
  async (token: string) => {
    const response = await AuthAPI.verifyToken(token);
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
      AppSessionStorage.setUser(action.payload);
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.user = action.payload;
      AppSessionStorage.setUser(action.payload);
    });
    builder.addCase(verifyToken.rejected, (state) => {
      state.token = '';
      console.log(window.location);

      // window.location.href = `${window.location.protocol}//${window.location.host}/login`;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
