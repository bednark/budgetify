import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentMonthRange } from "@/lib/functions";
import { fetchExpenses, fetchIncomes } from "@/lib/data";
import { IExpense, IIncome } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const expenses: IExpense[] = await fetchExpenses();
  const incomes: IIncome[] = await fetchIncomes();
  
  return (
    <>
      <Dashboard expensesList={expenses} incomesList={incomes} firstDay={firstDay} lastDay={lastDay} />
    </>
  );
};

export default Home;
