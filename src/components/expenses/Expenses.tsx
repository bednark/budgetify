"use client";

import { useState, useEffect } from "react";
import FilterSection from "@/components/expenses/filter-section/FilterSection";
import Summary from "@/components/expenses/summary/Summary";
import ExpenseForm from "@/components/expenses/expense-form/ExpenseForm";
import ExpenseTable from "@/components/expenses/expenses-table/ExpensesTable";
import { ICategory, IExpense } from "@/lib/types";

interface IExpensesProps {
  categories: ICategory[];
  expensesList: IExpense[];
  firstDay: string;
  lastDay: string;
}

const Expenses = ({ categories, expensesList, firstDay, lastDay }: IExpensesProps) => {
  const [expenses, setExpenses] = useState<IExpense[]>(expensesList);
  const [formData, setFormData] = useState<IExpense>({
    name: "",
    price: 0,
    category: "",
    date: "",
  });

  const [dateFrom, setDateFrom] = useState<string>(firstDay);
  const [dateTo, setDateTo] = useState<string>(lastDay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: IExpense = {
      ...formData,
      price: formData.price,
    };
    setExpenses([newExpense, ...expenses]);
    setFormData({
      name: "",
      price: 0,
      category: "",
      date: "",
    });
  };

  const filteredExpenses = expenses.filter((item) => item.date >= dateFrom && item.date <= dateTo);
  const total = filteredExpenses.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen pt-36 px-4 md:px-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 text-cyan-600">Śledzenie wydatków</h1>
      <Summary dateFrom={dateFrom} dateTo={dateTo} total={total} />
      <FilterSection dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <ExpenseForm
        formData={formData}
        handleChange={handleChange}
        handleAdd={handleAdd}
        categories={categories}
      />
      <ExpenseTable expenses={filteredExpenses} />
    </main>
  );
}

export default Expenses;