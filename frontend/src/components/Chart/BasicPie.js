import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const BasicPie = () => {
  const { incomes, expenses } = useGlobalContext();
  // amount, category, createdAt, date, description, title, type, updatedAt, _id

  // Aggregate expenses by category
  const aggregatedData = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Transform aggregated data into format suitable for PieChart
  const pieChartData = Object.entries(aggregatedData).map(
    ([category, value], index) => ({
      id: index,
      value,
      label: category,
    })
  );

  return (
    <PieChartStyled>
      <h2>Total Expense Chart</h2>

      <PieChart
        series={[
          {
            data: pieChartData,
            // { id: 0, value: 10, label: "series A" },
            // { id: 1, value: 15, label: "series B" },
            // { id: 2, value: 20, label: "series C" },
          },
        ]}
        width={540}
        height={250}
      />
    </PieChartStyled>
  );
};

const PieChartStyled = styled.div`
margin-top: 20px;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 2rem 10rem;
  border-radius: 20px;
  height: 100%;
  h2 {
    text-align: center;
    padding: 0 0 2rem 0;
  }
`;

export default BasicPie;
