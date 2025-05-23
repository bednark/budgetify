"use client";

import { ICategoryWithTotal, IExpensesGroupedByDay, IExpense, IIncome } from "@/lib/types";
import ExpensesPieChart from "@/components/dashboard/expenses-pie-chart/ExpensesPieChart";
import ExpensesLineChart from "@/components/dashboard/expenses-line-chart/ExpensesLineChart";
import { useState } from "react";

interface IDashboardProps {
  expensesList: IExpense[];
  incomesList: IIncome[];
  firstDay: string;
  lastDay: string;
}

const Dashboard = ({ expensesList, incomesList, firstDay, lastDay }: IDashboardProps) => {
  const [dateFrom, setDateFrom] = useState<string>(firstDay);
  const [dateTo, setDateTo] = useState<string>(lastDay);
  const [filteredExpenses, setFilteredExpenses] = useState<IExpense[]>(expensesList);

  const handleFilter = () => {
    const filtered = expensesList.filter((expense) => {
      const expenseDate = expense.date.split("T")[0];
  
      return expenseDate >= dateFrom && expenseDate <= dateTo;
    });
  
    setFilteredExpenses(filtered);
  };

  const expensesGroupedByCategory: ICategoryWithTotal[] = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;
    const price = Number(expense.price);

    const existingCategory = acc.find((item) => item.category === category);

    if (existingCategory) {
      existingCategory.total += price;
    } else {
      acc.push({ category, total: price });
    }

    return acc;
  }, [] as ICategoryWithTotal[]);

  const expensesGroupedByDay: IExpensesGroupedByDay[] = filteredExpenses.reduce((acc, expense) => {
    const date = expense.date.split("T")[0];
    const price = Number(expense.price);

    const existingDate = acc.find((item) => item.date === date);

    if (existingDate) {
      existingDate.total += price;
    } else {
      acc.push({ date, total: price });
    }

    return acc;
  }, [] as IExpensesGroupedByDay[])
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalExpenses = expensesGroupedByCategory.reduce((sum, item) => sum + item.total, 0);
  const totalIncomes = incomesList.reduce((sum, item) => sum + (typeof item.price === "number" ? item.price : parseFloat(item.price)), 0);
  const totalBalance = totalIncomes - totalExpenses;
  
  return (
    <div className="flex flex-col items-center justify-start pt-20 px-4 md:px-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-cyan-600">Statystyki budżetu</h1>
        <p className="text-lg text-gray-700 font-semibold text-cyan-600">
          Aktualny bilans: <span className={totalBalance < 0 ? "text-red-500" : ""}>{totalBalance} zł</span>
        </p>
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
  {expensesGroupedByCategory.length === 0 && expensesGroupedByDay.length === 0 ? (
    <div className="flex items-center justify-center w-full h-[350px] sm:h-[450px] md:h-[500px] text-gray-500 text-center text-lg">
      Brak danych do wyświetlenia
    </div>
  ) : (
    <>
      <div className="w-full h-[350px] sm:h-[450px] md:h-[500px]">
        <ExpensesPieChart data={expensesGroupedByCategory} />
      </div>
      <div className="w-full h-[350px] sm:h-[450px] md:h-[500px]">
        <ExpensesLineChart data={expensesGroupedByDay} />
      </div>
    </>
  )}
</div>

    </div>
  );
};

export default Dashboard;
