import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashSystem = () => {
  const data: ChartData<"line", any, unknown> = {
    labels: [1, 5, 10, 15, 20, 25],
    // backgroundColor: ["rgba(255,0,0,1)"],
    // lineTension: 1,
    datasets: [
      {
        label: "HSN",
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.3)",
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
        cubicInterpolationMode: "monotone",
        tension: 0.4
      },
    ],
  };

  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
      ],
    },
  };

  return (
    <div className="App main">
      <Line data={data} />
    </div>
  );
};

export default DashSystem;
