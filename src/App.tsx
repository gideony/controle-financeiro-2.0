import React from 'react';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { exportToExcel } from './utils/exportToExcel';
import { Download } from 'lucide-react';
import { useTransactions } from './hooks/useTransactions';

export function App() {
  const { 
    transactions, 
    isLoading, 
    error, 
    addTransaction, 
    clearTransactions 
  } = useTransactions();

  const handleExportToExcel = () => {
    exportToExcel(transactions);
    clearTransactions();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Summary transactions={transactions} />
        <TransactionForm onAddTransaction={addTransaction} />
        
        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportToExcel}
            disabled={isLoading || transactions.length === 0}
            className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            Exportar para Excel
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700 mx-auto"></div>
          </div>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </main>
    </div>
  );
}