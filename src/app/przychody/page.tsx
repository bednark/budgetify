import Incomes from "@/components/incomes/Incomes";
import { fetchIncomes } from "@/lib/data";
import { IIncome } from "@/lib/types";
import { getCurrentMonthRange } from "@/lib/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Przychody = async () => {
  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();
  const incomes: IIncome[] = await fetchIncomes();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Incomes incomesList={incomes} lastDay={lastDay} firstDay={firstDay} />
    </>
  );
};

export default Przychody;
