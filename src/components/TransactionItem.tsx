import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';
import { Transaction } from '../types/Transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  onDelete 
}) => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-5 gap-2 sm:gap-4 p-4 hover:bg-gray-50 transition-colors">
      <div className="text-sm sm:text-base font-medium sm:font-normal">
        {transaction.description}
      </div>
      <div className={`text-sm sm:text-base ${
        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
      }`}>
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
      <div className="flex justify-end">
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          title="Excluir transação"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};