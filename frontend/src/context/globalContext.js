import React, { useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// Step 1: Create a context
const GlobalContext = React.createContext();

// Step 2: Create a provider component
export const GlobalProvider = ({ children }) => {
  // Create the shared state variables
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Function to add an income
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}/add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.err);
      });
    getExpenses();
  };

  // Function to fetch incomes
  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/get-incomes`);
    setIncomes(response.data);
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/get-expenses`);
    setExpenses(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
    getIncomes();
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
    getExpenses();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });
    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 10);
  };

  // Provide the state variables and functions to the context
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        addExpense,
        getIncomes,
        getExpenses,
        incomes,
        expenses,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpense,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Step 3: Export the context hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
