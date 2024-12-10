import React from 'react';
import { Transaction } from '../types/Transaction';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="hidden sm:grid sm:grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold text-sm">
        <div>Descrição</div>
        <div>Valor</div>
        <div>Tipo</div>
        <div>Data</div>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 p-4">
            <div className="text-sm sm:text-base font-medium sm:font-normal">
              {transaction.description}
            </div>
            <div className={`text-sm sm:text-base ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              R$ {transaction.amount.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-sm sm:text-base">
              {transaction.type === 'income' ? (
                <>
                  <ArrowUpCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Entrada</span>
                </>
              ) : (
                <>
                  <ArrowDownCircle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Saída</span>
                </>
              )}
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};