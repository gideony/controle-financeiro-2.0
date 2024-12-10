import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react';
import { Transaction } from '../types/Transaction';

interface SummaryProps {
  transactions: Transaction[];
}

export const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.total = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, total: 0 }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Entradas</span>
          <ArrowUpCircle className="text-green-500 w-5 h-5" />
        </div>
        <strong className="text-lg sm:text-2xl block mt-2">
          R$ {summary.income.toFixed(2)}
        </strong>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Saídas</span>
          <ArrowDownCircle className="text-red-500 w-5 h-5" />
        </div>
        <strong className="text-lg sm:text-2xl block mt-2">
          R$ {summary.expense.toFixed(2)}
        </strong>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total</span>
          <DollarSign className="text-blue-500 w-5 h-5" />
        </div>
        <strong className="text-lg sm:text-2xl block mt-2">
          R$ {summary.total.toFixed(2)}
        </strong>
      </div>
    </div>
  );
};