"use client";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";
import { useEffect } from "react";
import { useState } from "react";
import faker from "faker";

const Analytics = () => {
  const { todos, setData } = useContext(TodoContext);
  const [completed, setCompleted] = useState(0);
  const [incomplete, setIncomplete] = useState(0);
  const [priority, setPriority] = useState(0);
  useEffect(() => {
    setData();
  }, []);
  useEffect(() => {
    const d1 = todos?.filter((item) => item.status === "completed");
    const d2 = todos?.filter((item) => item.status === "incomplete");
    const d3 = todos?.filter((item) => item.priority === true);
    setCompleted(d1);
    setIncomplete(d2);
    setPriority(d3);
  }, [todos]);

  const data = {
    labels: ["Completed", "Incomplete", "Priority"],
    datasets: [
      {
        label: "#",
        data: [completed?.length, incomplete.length, priority.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of tomatoes per task',
      },
    },
  };

  let labels = [];
  todos.map(item => {
    labels.push(item.title);
  })
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data1 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: todos?.map((todo) => todo.tomatoes),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    //   {
    //     label: 'Dataset 2',
    //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    ],
  };

  return (
    <div className="p-10 bg-blue-950 h-full">
      <h1 className="text-center font-bold text-4xl text-white mb-10">Analytics</h1>
      <div className="flex flex-col items-center gap-10">
        <div className="h-[250px] w-[250px] justify-center items-center">
          <Doughnut data={data} />
        </div>
        <div className="h-[350px] w-[350px] sm:w-1/3">
        <Bar options={options} data={data1} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
