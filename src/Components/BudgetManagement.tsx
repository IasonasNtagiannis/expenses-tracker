import React, { useState } from "react";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import { filterByDate } from "../utils";

interface BudgetManagementProps {
  expenses: Expense[];
}

const BudgetManagement: React.FC<BudgetManagementProps> = ({ expenses }) => {
  const { monthlyBudget, setMonthlyBudget } = useBudget();

  const [isEditing, setIsEditing] = useState(false);

  const currentMonthExpenses = React.useMemo(() => {
    return filterByDate(expenses, new Date(), "month").reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
  }, [expenses]);

  const overallRemainingMonthlyBudget =
    (monthlyBudget?.amount || 0) - currentMonthExpenses;

  const monthlyProgressBarWidth =
    (monthlyBudget?.amount || 0) === 0
      ? 0
      : Math.min(
          (currentMonthExpenses / (monthlyBudget?.amount || 1)) * 100,
          100
        );

  const handleSaveBudget = () => {
    const input = document.getElementById(
      "monthly-budget-input"
    ) as HTMLInputElement;
    const newAmount = parseFloat(input.value);
    setMonthlyBudget(newAmount);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  return (
    <div className="bg-white p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Monthly Budget</h2>
      </div>

      <div className="space-y-6">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-700">Budget:</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  defaultValue={monthlyBudget?.amount || 0}
                  id="monthly-budget-input"
                  type="number"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveBudget();
                  }}
                  className="border rounded px-3 py-1.5 w-28 text-right text-gray-800"
                  min="0"
                />
                <button
                  onClick={handleSaveBudget}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-md transition-colors shadow-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded-md transition-colors shadow-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="font-bold text-xl text-gray-900">
                  {monthlyBudget?.amount || 0}$
                </span>
                <button
                  onClick={handleEditClick}
                  className="ml-3 text-blue-500 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-lg text-gray-700">Spent:</span>
            <span className="font-bold text-xl text-gray-900">
              {currentMonthExpenses}$
            </span>
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-lg text-gray-700">Remaining:</span>
            <span
              className={`font-bold text-xl ${
                overallRemainingMonthlyBudget < 0
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {overallRemainingMonthlyBudget}$
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${monthlyProgressBarWidth}%`,
                backgroundColor: "black",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;
