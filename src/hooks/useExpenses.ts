import { useEffect, useState } from "react";
import type { Expense } from "../types";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const initializeExpenses = async () => {
      const storedExpenses = localStorage.getItem("expenses");

      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    };

    initializeExpenses();
  }, []);

  const addExpense = (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  return { expenses, addExpense, deleteExpense };
};
