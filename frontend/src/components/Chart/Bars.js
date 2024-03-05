import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import styled from "styled-components";
import { axisClasses } from "@mui/x-charts";
import _ from "lodash";

import { useGlobalContext } from "../../context/globalContext";

const Bars = () => {
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

  const aggregatedData = months.map((month) => ({
    month,
    "dine-out": null,
    entertainment: null,
    "daily-necessities": null,
    food: null,
    internet: null,
    other: null,
  }));

  // Group expenses by month and category
  expenses.forEach((expense) => {
    const monthIndex = new Date(expense.date).getMonth();
    const monthData = aggregatedData[monthIndex];
    const category = expense.category;
    if (category in monthData) {
      if (!monthData[category]) {
        monthData[category] = 0;
      }
      monthData[category] += expense.amount;
    }
  });

  const dataset = aggregatedData.map((data) => {
    const { month, ...rest } = data;
    return { month, ...rest };
  });

  const chartSetting = {
    yAxis: [
      {
        label: "expenses (CAD)",
      },
    ],
    width: 700,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  return (
    <BarStyled>
      <h3>Monthly Expense Grouped by Month and Category</h3>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "dine-out", label: "Dine Out" },
          { dataKey: "entertainment", label: "Entertainment" },
          { dataKey: "daily-necessities", label: "Daily Necessities" },
          { dataKey: "food", label: "Food" },
          { dataKey: "internet", label: "Internet" },
          { dataKey: "other", label: "Others" },
        ]}
        {...chartSetting}
      />
    </BarStyled>
  );
};

{
  /* <option value="food">Food</option>
<option value="daily-necessities">Daily Necessities</option>
<option value="internet">Home Internet</option>
<option value="entertainment">Entertainment</option>
<option value="dine-out">Dine Out</option>
<option value="other">Other</option> */
}

const BarStyled = styled.div`
  margin-top: 20px;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 2rem 4rem;
  border-radius: 20px;
  height: 100%;
  h3 {
    text-align: center;
    padding: 0 0 2rem 0;
  }
`;

export default Bars;
