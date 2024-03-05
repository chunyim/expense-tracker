import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const History = () => {
  const { transactionHistory } = useGlobalContext(); //useContext to get the function
  const [...history] = transactionHistory(); //get the history from the transaction history function

  return (
    <HistoryStyled>
      <h2>Recent Transaction History</h2>
      {history.map((record) => {
        const { _id, title, amount, type } = record;
        return (
          <div key={_id} className="history-record">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense"
                ? `-${amount <= 0 ? 0 : amount}`
                : `+${amount <= 0 ? 0 : amount}`}{" "}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-record {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
