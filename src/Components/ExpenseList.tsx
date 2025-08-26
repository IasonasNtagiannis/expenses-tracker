import React, { useEffect, useState } from "react";
import type { Expense } from "../types";
import { filterByDate } from "../utils";
import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  deleteExpense,
}) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    setTotalExpenses(
      filterByDate(expenses, new Date(), "day").reduce(
        (acc, expense) => acc + expense.amount,
        0
      )
    );
  }, [expenses]);

  const todaysExpenses = filterByDate(expenses, new Date(), "day").reverse();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-end">
        <span>Today</span>
        <span className="font-bold">{totalExpenses}$</span>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[50dvh]">
        {todaysExpenses.map((expense, index) => {
          return (
            <React.Fragment key={index}>
              <ExpenseListItem
                expense={expense}
                onDelete={deleteExpense}
              ></ExpenseListItem>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
