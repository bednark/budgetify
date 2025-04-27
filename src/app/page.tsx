import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentMonthRange } from "@/lib/functions";

const Home = () => {
  const { firstDay, lastDay }: { firstDay: string; lastDay: string } = getCurrentMonthRange();

  return (
    <>
      <Dashboard firstDay={firstDay} lastDay={lastDay} />
    </>
  );
};

export default Home;
