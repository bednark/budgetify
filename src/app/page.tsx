import Expenses from "@/components/expenses/Expenses";
import { IExpense } from "@/lib/types";

const Home = () => {
  const categories: string[] = ["Jedzenie", "Transport", "Subskrypcje", "Edukacja", "Rozrywka"];
  
  const getCurrentMonthRange = (): { firstDay: string; lastDay: string } => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth();
  
    const firstDay: string = new Date(year, month, 1).toISOString().split("T")[0];
    const lastDay: string = new Date(year, month + 1, 0).toISOString().split("T")[0];
  
    return { firstDay, lastDay };
  };
  
  const generateDummyExpenses = (count = 50): IExpense[] => {
    const today: Date = new Date();
    const month: number = today.getMonth();
    const year: number = today.getFullYear();
    const expenses: IExpense[] = [];
    
    for (let i = 1; i <= count; i++) {
      const rndDay: number = Math.floor(Math.random() * 28) + 1;
      const rndPrice: string = (Math.random() * 200 + 10).toFixed(2);
      const rndCategory: string = categories[Math.floor(Math.random() * categories.length)];
    
      expenses.push({
        id: i,
        name: `Wydatek ${i}`,
        price: parseFloat(rndPrice),
        category: rndCategory,
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(rndDay).padStart(2, "0")}`,
      });
    }
    
    return expenses;
  };

  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const expenses: IExpense[] = generateDummyExpenses();
  return (
    <>
      <Expenses expensesList={expenses} categories={categories} lastDay={lastDay} firstDay={firstDay} />
    </>
  );
};

export default Home;
