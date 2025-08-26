import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Budget } from "../types";

export const useBudget = () => {
  const [monthlyBudget, setMonthlyBudgetState] = useState<Budget | null>(() => {
    const storedBudget = localStorage.getItem("monthlyBudget");
    if (storedBudget) {
      const parsed = JSON.parse(storedBudget);
      if (!parsed?.type) {
        return { ...parsed, type: "monthly" };
      }
      return parsed;
    }
    return null;
  });

  const [categoryBudgets, setCategoryBudgetsState] = useState<Budget[]>(() => {
    const storedBudgets = localStorage.getItem("categoryBudgets");
    if (storedBudgets) {
      const parsed = JSON.parse(storedBudgets);
      return parsed.map((budget: any) =>
        budget.type ? budget : { ...budget, type: "category" }
      );
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("monthlyBudget", JSON.stringify(monthlyBudget));
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem("categoryBudgets", JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  const setMonthlyBudget = (amount: number) => {
    setMonthlyBudgetState((prevMonthlyBudget) => {
      const newAmount = Math.max(0, amount);
      if (newAmount === 0) {
        return null;
      } else if (prevMonthlyBudget) {
        return { ...prevMonthlyBudget, amount: newAmount, type: "monthly" };
      } else {
        return { id: uuidv4(), amount: newAmount, type: "monthly" };
      }
    });
  };

  const setCategoryBudget = (category: string, amount: number) => {
    setCategoryBudgetsState((prevBudgets) => {
      const newAmount = Math.max(0, amount);
      const existingBudgetIndex = prevBudgets.findIndex(
        (b) => b.category === category
      );

      if (newAmount === 0) {
        return prevBudgets.filter((b) => b.category !== category);
      } else if (existingBudgetIndex >= 0) {
        const updatedBudgets = [...prevBudgets];
        updatedBudgets[existingBudgetIndex] = {
          ...updatedBudgets[existingBudgetIndex],
          amount: newAmount,
        };
        return updatedBudgets;
      } else {
        return [
          ...prevBudgets,
          {
            id: uuidv4(),
            amount: newAmount,
            type: "category",
            category,
          },
        ];
      }
    });
  };

  const getCategoryBudget = (category: string): Budget | null => {
    return categoryBudgets.find((b) => b.category === category) || null;
  };

  return {
    monthlyBudget,
    setMonthlyBudget,
    categoryBudgets,
    setCategoryBudget,
    getCategoryBudget,
  };
};
