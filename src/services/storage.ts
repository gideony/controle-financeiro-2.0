import { Transaction } from '../types/Transaction';

const STORAGE_KEY = 'financial-control-transactions';

export const saveToStorage = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const loadFromStorage = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};