import axiosInstance from 'axios';
import { AppSessionStorage } from './lib/utils';

const axios = axiosInstance.create({
  baseURL: 'http://192.168.8.109:3001/api/v1',
});

axios.interceptors.request.use((config) => {
  const token = AppSessionStorage.getUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
