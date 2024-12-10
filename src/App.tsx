import React, { useState } from 'react';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Transaction } from './types/Transaction';
import { exportToExcel } from './utils/exportToExcel';
import { Download } from 'lucide-react';

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setTransactions(prev => [transaction, ...prev]);
  };

  const handleExportToExcel = () => {
    exportToExcel(transactions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Summary transactions={transactions} />
        <TransactionForm onAddTransaction={handleAddTransaction} />
        
        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            <Download size={18} />
            Exportar para Excel
          </button>
        </div>

        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}