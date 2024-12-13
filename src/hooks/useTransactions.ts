import { useState, useEffect } from 'react';
import { Transaction } from '../types/Transaction';
import { 
  saveToStorage, 
  loadFromStorage, 
  clearStorage 
} from '../services/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load transactions from localStorage on initial render
  useEffect(() => {
    try {
      const savedTransactions = loadFromStorage();
      setTransactions(savedTransactions);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      saveToStorage(transactions);
    }
  }, [transactions]);

  const addTransaction = async (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    try {
      const transaction: Transaction = {
        ...newTransaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };

      setTransactions(prev => [transaction, ...prev]);
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar transação');
      console.error(err);
    }
  };

  const clearTransactions = async () => {
    try {
      clearStorage();
      setTransactions([]);
      setError(null);
    } catch (err) {
      setError('Erro ao limpar transações');
      console.error(err);
    }
  };

  return {
    transactions,
    isLoading,
    error,
    addTransaction,
    clearTransactions,
  };
};