import React from 'react';
import { Transaction } from '../types/Transaction';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  onDeleteTransaction
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        Nenhuma transação registrada
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="hidden sm:grid sm:grid-cols-5 gap-4 p-4 bg-gray-50 font-semibold text-sm">
        <div>Descrição</div>
        <div>Valor</div>
        <div>Tipo</div>
        <div>Data</div>
        <div className="text-right">Ações</div>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
};