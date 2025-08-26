import React, { useEffect, useState } from "react";
import type { Expense } from "../types";
import { filterByDate, getMonthsWithExpenses } from "../utils";
import Histogram from "./Histogram";

interface ExpenseHistoryProps {
  expenses: Expense[];
}

const ExpenseHistory: React.FC<ExpenseHistoryProps> = ({ expenses }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    let currentFilteredExpenses: Expense[] = expenses;

    if (selectedDate) {
      currentFilteredExpenses = filterByDate(
        expenses,
        new Date(selectedDate),
        "day"
      );
    } else if (selectedMonth) {
      const [year, month] = selectedMonth.split("-");
      currentFilteredExpenses = filterByDate(
        expenses,
        new Date(parseInt(year), parseInt(month) - 1),
        "month"
      );
    }
    setFilteredExpenses(currentFilteredExpenses);
  }, [expenses, selectedDate, selectedMonth]);

  const months = getMonthsWithExpenses(expenses);

  return (
    <div className="expense-history-container p-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Expense History Report
      </h2>
      <div className="date-month-selector flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 items-center justify-center">
        <input
          type="date"
          className="p-3 border border-gray-400 rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 ease-in-out"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedMonth("");
          }}
        />
        <select
          className="p-3 border border-gray-400 rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 ease-in-out"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setSelectedDate("");
          }}
        >
          <option value="">Select Month</option>
          {months.length > 0 ? (
            months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))
          ) : (
            <option value="" disabled>No expenses logged yet</option>
          )}
        </select>
      </div>
      {expenses.length === 0 ? (
        <div className="text-center text-gray-600 p-6">
          <p className="text-lg mb-2">No expenses logged yet</p>
          <p className="text-sm">Start adding expenses to see your history here!</p>
        </div>
      ) : months.length === 0 ? (
        <div className="text-center text-gray-600 p-6">
          <p className="text-lg mb-2">No expenses found</p>
          <p className="text-sm">Try selecting a different time period or add new expenses.</p>
        </div>
      ) : filteredExpenses.length > 0 ? (
        <div className="mb-6">
          <Histogram expenses={filteredExpenses} title="Top Categories" />
        </div>
      ) : null}
      <div className="expense-report border border-gray-300 rounded-md overflow-hidden bg-gray-50">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-600 p-6">
            {expenses.length === 0 
              ? "No expenses logged yet. Start adding expenses to see your history here!"
              : "No expenses for the selected period."
            }
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            <li className="flex justify-between items-center py-3 px-6 bg-gray-100 font-semibold text-gray-800 border-b border-gray-300">
              <span>Description - Date</span>
              <span>Amount</span>
            </li>
            {filteredExpenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center py-3 px-6 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <span>
                  {expense.description} - {expense.date}
                </span>
                <span className="font-medium">
                  ${expense.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
