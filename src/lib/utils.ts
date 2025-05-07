import { AuthUser } from '@/models/Auth';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AppLocalStorage = {
  getUser: (): AuthUser | undefined => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
  },
  setUser: (user: AuthUser) => {
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
  },
};

export const AppSessionStorage = {
  getUser: (): AuthUser | undefined => {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
  },
  setUser: (user: AuthUser) => {
    const userJson = JSON.stringify(user);
    sessionStorage.setItem('user', userJson);
  },
};
