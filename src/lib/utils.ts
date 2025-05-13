import { AuthUser } from '@/models/Auth';
import { EstimationDto } from '@/models/Story';
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

export function calculateStoryEstimation(estimates: EstimationDto[]) {
  let totalWeight = 0;

  // Calculate individual PERT weights
  const weights = estimates.map((est) => {
    const weight =
      ((est.optimistic ?? 0) +
        4 * (est.realistic ?? 0) +
        (est.pessimistic ?? 0)) /
      6;
    totalWeight += weight;
    return { ...est, weight };
  });

  // Total weight used for weighted average of O
  const totalWeightSum = weights.reduce((sum, w) => sum + w.weight, 0);

  // Weighted O calculation (decimal)
  const weightedO = weights.reduce((sum, w) => {
    return sum + (w.optimistic ?? 0) * (w.weight / totalWeightSum);
  }, 0);

  const weightedR = weights.reduce((sum, w) => {
    return sum + (w.realistic ?? 0) * (w.weight / totalWeightSum);
  }, 0);

  const weightedP = weights.reduce((sum, w) => {
    return sum + (w.pessimistic ?? 0) * (w.weight / totalWeightSum);
  }, 0);

  return {
    weightedOptimistic: parseFloat(weightedO.toFixed(2)),
    weightedRealistic: parseFloat(weightedR.toFixed(2)),
    weightedPessimistic: parseFloat(weightedP.toFixed(2)),
    finalizedWeight: parseFloat((totalWeight / estimates.length).toFixed(2)),
  };
}
