import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentMonthRange } from "@/lib/functions";
import { fetchExpenses } from "@/lib/data";
import { IExpense } from "@/lib/types";

const Home = async () => {
  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const expenses: IExpense[] = await fetchExpenses();

  return (
    <>
      <Dashboard expensesList={expenses} firstDay={firstDay} lastDay={lastDay} />
    </>
  );
};

export default Home;
