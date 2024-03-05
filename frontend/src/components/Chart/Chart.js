import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes, expenses } = useGlobalContext();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const aggregatedExpenseData = months.map((month) => ({
    month,
    sum: 0,
  }));

  expenses.forEach((expense) => {
    const monthIndex = new Date(expense.date).getMonth();
    aggregatedExpenseData[monthIndex]["sum"] += expense.amount;
  });

  const aggregatedIncomeData = months.map((month) => ({
    month,
    sum: 0,
  }));

  incomes.forEach((income) => {
    const monthIndex = new Date(income.date).getMonth();
    aggregatedIncomeData[monthIndex]["sum"] += income.amount;
  });

  const data = {
    labels: aggregatedExpenseData.map((data) => {
      const { month } = data;
      return month;
    }),
    datasets: [
      {
        label: "Incomes",
        data: [
          ...aggregatedIncomeData.map((income) => {
            const { sum } = income;
            return sum;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...aggregatedExpenseData.map((expense) => {
            const { sum } = expense;
            return sum;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  margin-top: 20px;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
