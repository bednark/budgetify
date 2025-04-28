"use client";

import { useState } from "react";
import FilterSection from "@/components/filter-section/FilterSection";
import Summary from "@/components/summary/Summary";
import IncomesForm from "@/components/incomes/incomes-form/IncomesForm";
import Datatable from "@/components/datatable/Datatable";
import { IIncome } from "@/lib/types";
import { addIncome } from "@/lib/actions";

interface IIncomesProps {
  incomesList: IIncome[];
  firstDay: string;
  lastDay: string;
}

const Incomes = ({ incomesList, firstDay, lastDay }: IIncomesProps) => {
  const incomesHeaders: string[] = ["Nazwa", "Kwota", "Data"];
  const [incomes, setIncomes] = useState<IIncome[]>(incomesList);
  const incomesFields = incomes.length > 0
  ? (Object.keys(incomes[0]).filter((key) => key !== "_id") as (keyof IIncome)[])
  : [];
  const [formData, setFormData] = useState<IIncome>({
    name: "",
    price: "",
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
      alert("You are offline. Please connect to the internet to add a new income.");
      return;
    }

    const newIncome: IIncome = {
      ...formData,
      price: formData.price,
    };

    setFormData({
      name: "",
      price: "",
      date: new Date().toISOString().split("T")[0]
    });
    
    const addedIncome: string = await addIncome(newIncome);
    newIncome._id = addedIncome;
    setIncomes([newIncome, ...incomes]);
  };

  let filteredIncomes: IIncome[] = [];

  if (Array.isArray(incomes)) {
    filteredIncomes = incomes.filter((item: IIncome) => item.date >= dateFrom && item.date <= dateTo);
  }
  const total = filteredIncomes
  .reduce((sum, item) => sum + (typeof item.price === "number" ? item.price : parseFloat(item.price)), 0)
  .toFixed(2);


  return (
    <main className="min-h-screen pt-36 px-4 md:px-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 text-cyan-600">Śledzenie przychodów</h1>
      <Summary header="przychodów" dateFrom={dateFrom} dateTo={dateTo} total={total} />
      <FilterSection dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <IncomesForm
        formData={formData}
        handleChange={handleChange}
        handleAdd={handleAdd}
      />
      <Datatable data={filteredIncomes} headers={incomesHeaders} fields={incomesFields} />
    </main>
  );
}

export default Incomes;