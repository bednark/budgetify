import Expenses from "@/components/expenses/Expenses";
import { fetchCategories, fetchExpenses } from "@/lib/data";
import { ICategory, IExpense } from "@/lib/types";
import { getCurrentMonthRange } from "@/lib/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Wydatki = async () => {
  const categories: ICategory[] = await fetchCategories();
  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const expenses: IExpense[] = await fetchExpenses();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Expenses expensesList={expenses} categories={categories} lastDay={lastDay} firstDay={firstDay} />
    </>
  );
};

export default Wydatki;
