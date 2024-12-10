import { utils, writeFile } from 'xlsx';
import { Transaction } from '../types/Transaction';

export const exportToExcel = (transactions: Transaction[]) => {
  const worksheet = utils.json_to_sheet(
    transactions.map(t => ({
      Descrição: t.description,
      Valor: t.amount,
      Tipo: t.type === 'income' ? 'Entrada' : 'Saída',
      Data: new Date(t.date).toLocaleDateString()
    }))
  );

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Transações');
  writeFile(workbook, 'controle-financeiro.xlsx');
};