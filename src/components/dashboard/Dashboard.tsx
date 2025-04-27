"use client";

import { ICategoryWithTotal, IExpensesGroupedByDay } from "@/lib/types";
import ExpensesPieChart from "@/components/dashboard/expenses-pie-chart/ExpensesPieChart";
import ExpensesLineChart from "@/components/dashboard/expenses-line-chart/ExpensesLineChart";
import { useState, useEffect } from "react";
import { fetchExpensesGroupedByCategory, fetchExpensesGroupedByDay } from "@/lib/actions";

interface IDashboardProps {
  firstDay: string;
  lastDay: string;
}

const Dashboard = ({ firstDay, lastDay }: IDashboardProps) => {
  const [dateFrom, setDateFrom] = useState<string>(firstDay);
  const [dateTo, setDateTo] = useState<string>(lastDay);
  const [expensesGroupedByCategory, setExpensesGroupedByCategory] = useState<ICategoryWithTotal[]>([]);
  const [expensesGroupedByDay, setExpensesGroupedByDay] = useState<IExpensesGroupedByDay[]>([]);
  const totalExpenses = expensesGroupedByCategory.reduce((sum, item) => sum + item.total, 0);

  useEffect(() => {
    const loadData = async () => {
      const categories = await fetchExpensesGroupedByCategory(firstDay, lastDay);
      const days = await fetchExpensesGroupedByDay(firstDay, lastDay);
      setExpensesGroupedByCategory(categories);
      setExpensesGroupedByDay(days);
    };
    loadData();
  }, []);

  const handleFilter = async (): Promise<void> => {
    if (dateFrom > dateTo) {
      alert("Data 'Od' nie może być późniejsza niż data 'Do'.");
      return;
    }

    const categories = await fetchExpensesGroupedByCategory(dateFrom, dateTo);
    const days = await fetchExpensesGroupedByDay(dateFrom, dateTo);
    setExpensesGroupedByCategory(categories);
    setExpensesGroupedByDay(days);
  };

  return (
    <div className="flex flex-col items-center justify-start pt-20 px-4 md:px-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">Wydatki</h1>
        <p className="text-lg md:text-2xl text-gray-600 mt-2">Suma: {totalExpenses} zł</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center md:items-end mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Od:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Do:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm mb-[2px]"
        >
          Filtruj
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-8">
        <div className="w-full h-[350px] sm:h-[450px] md:h-[500px]">
          <ExpensesPieChart data={expensesGroupedByCategory} />
        </div>
        <div className="w-full h-[350px] sm:h-[450px] md:h-[500px]">
          <ExpensesLineChart data={expensesGroupedByDay} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
