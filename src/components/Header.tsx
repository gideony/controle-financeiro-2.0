import React from 'react';
import { DollarSign } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-teal-700 text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
        <DollarSign size={24} className="sm:w-8 sm:h-8" />
        <h1 className="text-xl sm:text-2xl font-bold">Controle Financeiro</h1>
      </div>
    </header>
  );
};