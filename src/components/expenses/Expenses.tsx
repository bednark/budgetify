"use client";

import { useState } from "react";
import FilterSection from "@/components/filter-section/FilterSection";
import Summary from "@/components/summary/Summary";
import ExpenseForm from "@/components/expenses/expense-form/ExpenseForm";
import Datatable from "@/components/datatable/Datatable";
import { ICategory, IExpense } from "@/lib/types";
import { addExpense } from "@/lib/actions";

interface IExpensesProps {
  categories: ICategory[];
  expensesList: IExpense[];
  firstDay: string;
  lastDay: string;
}

const Expenses = ({ categories, expensesList, firstDay, lastDay }: IExpensesProps) => {
  const expensesHeaders: string[] = ["Nazwa", "Kwota", "Kategoria", "Data"];
  const [expenses, setExpenses] = useState<IExpense[]>(expensesList);
  const expenseFields = expenses.length > 0
  ? (Object.keys(expenses[0]).filter((key) => key !== "_id") as (keyof IExpense)[])
  : [];
  const [formData, setFormData] = useState<IExpense>({
    name: "",
    price: "",
    category: categories[0].name,
    date: new Date().toISOString().split("T")[0]
  });

  const [dateFrom, setDateFrom] = useState<string>(firstDay);
  const [dateTo, setDateTo] = useState<string>(lastDay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!navigator.onLine) {
      alert("You are offline. Please connect to the internet to add a new expense.");
      return;
    }

    const newExpense: IExpense = {
      ...formData,
      price: formData.price,
    };

    setFormData({
      name: "",
      price: "",
      category: categories[0].name,
      date: new Date().toISOString().split("T")[0]
    });
    
    const addedExpense: string = await addExpense(newExpense);
    newExpense._id = addedExpense;
    setExpenses([newExpense, ...expenses]);
  };

  let filteredExpenses: IExpense[] = [];

  if (Array.isArray(expenses)) {
    filteredExpenses = expenses.filter((item: IExpense) => item.date >= dateFrom && item.date <= dateTo);
  }
  const total = filteredExpenses
  .reduce((sum, item) => sum + (typeof item.price === "number" ? item.price : parseFloat(item.price)), 0)
  .toFixed(2);


  return (
    <main className="min-h-screen pt-36 px-4 md:px-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 text-cyan-600">Śledzenie wydatków</h1>
      <Summary header="wydatków" dateFrom={dateFrom} dateTo={dateTo} total={total} />
      <FilterSection dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <ExpenseForm
        formData={formData}
        handleChange={handleChange}
        handleAdd={handleAdd}
        categories={categories}
      />
      <Datatable data={filteredExpenses} headers={expensesHeaders} fields={expenseFields} />
    </main>
  );
}

export default Expenses;