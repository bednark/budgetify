"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ExpensesLineChartProps {
  data: { date: string; total: number }[];
}

const ExpensesLineChart = ({ data }: ExpensesLineChartProps) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Wydatki dzienne",
        data: data.map((item) => item.total),
        fill: true,
        tension: 0.4, // wygładzenie linii
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "#36A2EB",
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Wydatki: ${context.parsed.y} zł`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
};

export default ExpensesLineChart;
