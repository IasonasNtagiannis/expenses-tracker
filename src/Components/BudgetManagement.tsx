import React, { useState } from "react";
import { StandardCategories } from "../constants";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import { filterByDate } from "../utils";

interface BudgetManagementProps {
  expenses: Expense[];
}

const BudgetManagement: React.FC<BudgetManagementProps> = ({ expenses }) => {
  const {
    monthlyBudget,
    setMonthlyBudget,
    categoryBudgets,
    setCategoryBudget,
  } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"monthly" | "category">("monthly");

  const currentMonthExpenses = React.useMemo(() => {
    return filterByDate(expenses, new Date(), "month").reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
  }, [expenses]);

  const categoryExpenses = React.useMemo(() => {
    const categoryMap = new Map<string, number>();
    const currentMonthExpenses = filterByDate(expenses, new Date(), "month");

    currentMonthExpenses.forEach((expense) => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    return categoryMap;
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

  const handleSaveMonthlyBudget = () => {
    const input = document.getElementById(
      "monthly-budget-input"
    ) as HTMLInputElement;
    const newAmount = parseFloat(input.value);
    setMonthlyBudget(newAmount);
    setIsEditing(false);
  };

  const handleSaveCategoryBudget = (category: string) => {
    const input = document.getElementById(
      `category-budget-${category}`
    ) as HTMLInputElement;
    const newAmount = parseFloat(input.value);
    setCategoryBudget(category, newAmount);
    setEditingCategory(null);
  };

  const renderMonthlyBudgetView = () => (
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
                if (e.key === "Enter") handleSaveMonthlyBudget();
              }}
              className="border rounded px-3 py-1.5 w-28 text-right text-gray-800"
              min="0"
            />
            <button
              onClick={handleSaveMonthlyBudget}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-md transition-colors shadow-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
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
              onClick={() => setIsEditing(true)}
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
  );

  const renderCategoryBudgetView = () => (
    <div className="space-y-4">
      {Array.from(StandardCategories.entries()).map(([key, category]) => {
        const budget = categoryBudgets.find((b) => b.category === key);
        const spent = categoryExpenses.get(key) || 0;
        const remaining = (budget?.amount || 0) - spent;
        const progressWidth =
          (budget?.amount || 0) === 0
            ? 0
            : Math.min((spent / (budget?.amount || 1)) * 100, 100);

        return (
          <div key={key} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold text-gray-800">
                  {category.name}
                </span>
              </div>
              {editingCategory === key ? (
                <div className="flex items-center gap-2">
                  <input
                    defaultValue={budget?.amount || 0}
                    id={`category-budget-${key}`}
                    type="number"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveCategoryBudget(key);
                    }}
                    className="border rounded px-2 py-1 w-20 text-right text-gray-800"
                    min="0"
                  />
                  <button
                    onClick={() => handleSaveCategoryBudget(key)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    {budget?.amount || 0}$
                  </span>
                  <button
                    onClick={() => setEditingCategory(key)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Spent: {spent}$</span>
              <span
                className={remaining < 0 ? "text-red-500" : "text-green-600"}
              >
                Remaining: {remaining}$
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${progressWidth}%`,
                  backgroundColor: category.color,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Budget Management</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode("category")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "category"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By Category
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {viewMode === "monthly"
          ? renderMonthlyBudgetView()
          : renderCategoryBudgetView()}
      </div>
    </div>
  );
};

export default BudgetManagement;
