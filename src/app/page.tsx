import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentMonthRange } from "@/lib/functions";
import { fetchExpenses } from "@/lib/data";
import { IExpense } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

const Home = async () => {
  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const expenses: IExpense[] = await fetchExpenses();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Dashboard expensesList={expenses} firstDay={firstDay} lastDay={lastDay} />
    </>
  );
};

export default Home;
