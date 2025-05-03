import axios from '@/axios';
import { AuthUser } from '@/models/Auth';
import { LoginFormData } from '@/models/Login';
import { AxiosResponse } from 'axios';

export const AuthAPI = {
  login: async (
    loginFormData: LoginFormData
  ): Promise<AxiosResponse<AuthUser>> => {
    console.log('login');
    return await axios.post<AuthUser>('/auth/login', loginFormData);
  },
};
