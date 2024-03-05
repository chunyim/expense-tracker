import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import { dollar } from "../../utils/icons";
import History from "../History/History";

const Transactions = () => {
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    transactionHistory,
    getIncomes,
    getExpenses,
    incomes,
    expenses,
  } = useGlobalContext();

  return (
    <TransactionsStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="history-con">
            <History />
          </div>
          <div className="break-down-con">
            <h2 className="salary-title">
              Min <span>Income</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...incomes.map((item) => item.amount))}</p>
              <p>${Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...expenses.map((item) => item.amount))}</p>
              <p>${Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
            <div className="amount-con">
              <h2 className="income-title">Total Income</h2>
              <p className="income">
                {dollar} {totalIncome()}
              </p>
              <h2 className="expense-title">Total Expense</h2>
              <p className="expense">
                {dollar} {totalExpense()}
              </p>
              <h2 className="balance-title">Total Balance</h2>
              <p className="balance">
                {dollar} {totalBalance()}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </TransactionsStyled>
  );
};

const TransactionsStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
  }
  .history-con {
    grid-column: 1 / 3;
  }
  .break-down-con {
    grid-column: 3 / -1;
    .income-title,
    .expense-title,
    .balance-title {
        font-size: 2rem;
        justify-content: center;
    }
    .salary-title {
      font-size: 1.2rem;
      span {
        font-size: 2rem;
      }
    }
    .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    .amount-con{
        p {
            font-weight: 600;
            font-size: 1.6rem;
          }
        .income,
        .expense,
        .balance {
          margin-top: 20px;
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    }
  }
  }
`;

export default Transactions;

// .income,
// .expense,
// .balance {
//   background: #fcf6f9;
//   border: 2px solid #ffffff;
//   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//   border-radius: 20px;
//   padding: 1rem;
//   p {
//     font-size: 1.5rem;
//     font-weight: 700;
//   }
// }
