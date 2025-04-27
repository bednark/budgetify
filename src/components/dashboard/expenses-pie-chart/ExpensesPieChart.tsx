"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, 
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { motion } from "framer-motion";
import { ICategoryWithTotal } from "@/lib/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensesPieChartProps {
  data: ICategoryWithTotal[];
}

const ExpensesPieChart = ({ data }: ExpensesPieChartProps) => {
  const total = data.reduce((sum, v) => sum + v.total, 0);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Wydatki",
        data: data.map((item) => item.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Pie data={chartData} options={options} style={{ height: "100%" }} />
    </motion.div>
  );
};

export default ExpensesPieChart;
