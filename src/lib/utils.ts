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

export const getColorFromName = (name: string) => {
  const colors = [
    '#FFB6C1',
    '#FFD700',
    '#98FB98',
    '#87CEFA',
    '#FFA07A',
    '#9370DB',
    '#F4A460',
    '#40E0D0',
    '#FA8072',
    '#00CED1',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
