import React, { useState } from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount) return;

    onAddTransaction({
      description,
      amount: Number(amount),
      type,
    });

    // Clear form after submission
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Valor
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              checked={type === 'income'}
              onChange={() => setType('income')}
              className="mr-2"
            />
            <span className="text-sm sm:text-base">Entrada</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
              className="mr-2"
            />
            <span className="text-sm sm:text-base">Saída</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors text-sm sm:text-base"
      >
        Adicionar
      </button>
    </form>
  );
};