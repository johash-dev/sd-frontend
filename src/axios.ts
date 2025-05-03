import axiosInstance from 'axios';
import { AppLocalStorage } from './lib/utils';

const axios = axiosInstance.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axios.interceptors.request.use((config) => {
  const token = AppLocalStorage.getUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
