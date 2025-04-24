import { IExpense } from '@/lib/types';

interface IExpensesTableProps {
  expenses: IExpense[];
}

const ExpenseTable = ({ expenses }: IExpensesTableProps) => (
  <div className="overflow-auto max-h-full w-full mx-auto h-96">
    <table className="w-full table-auto border border-gray-700 text-white">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-6 py-3 border-b text-left">Nazwa</th>
          <th className="px-6 py-3 border-b text-left">Kwota (zł)</th>
          <th className="px-6 py-3 border-b text-left">Kategoria</th>
          <th className="px-6 py-3 border-b text-left">Data</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(({ id, name, price, category, date }) => (
          <tr key={id} className="bg-gray-900 even:bg-gray-800">
            <td className="px-6 py-3 border-b whitespace-normal break-words">{name}</td>
            <td className="px-6 py-3 border-b whitespace-normal break-words">{price.toFixed(2)}</td>
            <td className="px-6 py-3 border-b whitespace-normal break-words">{category}</td>
            <td className="px-6 py-3 border-b whitespace-normal break-words">{date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExpenseTable;
