import axios from '@/axios';
import { AuthUser } from '@/models/Auth';
import { LoginFormData } from '@/models/Login';
import { UserResponseDto } from '@/models/User';
import { AxiosResponse } from 'axios';

export const AuthAPI = {
  login: async (
    loginFormData: LoginFormData
  ): Promise<AxiosResponse<AuthUser>> => {
    return await axios.post<AuthUser>('/auth/login', loginFormData);
  },
  verifyToken: async (token: string): Promise<AxiosResponse<AuthUser>> => {
    return await axios.post<AuthUser>(`/auth/token/${token}`);
  },
  getUser: async (id: string): Promise<AxiosResponse<UserResponseDto>> => {
    return await axios.get(`/user/${id}`);
  },
};
