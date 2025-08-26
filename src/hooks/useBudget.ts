import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Budget } from "../types";

export const useBudget = () => {
  const [monthlyBudget, setMonthlyBudgetState] = useState<Budget | null>(() => {
    const storedBudget = localStorage.getItem("monthlyBudget");
    return storedBudget ? JSON.parse(storedBudget) : null;
  });

  useEffect(() => {
    localStorage.setItem("monthlyBudget", JSON.stringify(monthlyBudget));
  }, [monthlyBudget]);

  const setMonthlyBudget = (amount: number) => {
    setMonthlyBudgetState((prevMonthlyBudget) => {
      const newAmount = Math.max(0, amount);
      if (newAmount === 0) {
        return null;
      } else if (prevMonthlyBudget) {
        return { ...prevMonthlyBudget, amount: newAmount };
      } else {
        return { id: uuidv4(), amount: newAmount };
      }
    });
  };

  return {
    monthlyBudget,
    setMonthlyBudget,
  };
};
