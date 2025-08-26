import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import type { Expense } from "../types";

interface HistogramProps {
  expenses: Expense[];
  title: string;
}

const Histogram: React.FC<HistogramProps> = ({ expenses, title }) => {
  const categoryExpensesMap: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    const category = expense.category;
    categoryExpensesMap[category] =
      (categoryExpensesMap[category] || 0) + expense.amount;
  });

  const categoryData = Object.keys(categoryExpensesMap)
    .sort((a, b) => categoryExpensesMap[b] - categoryExpensesMap[a])
    .map((category) => ({
      category,
      amount: categoryExpensesMap[category],
    }))
    .slice(0, 5);

  return (
    <div className="w-full bg-white p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData} margin={{ top: 32 }}>
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
          />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Bar dataKey="amount" fill="#000000" radius={10}>
            <LabelList
              dataKey="amount"
              position="top"
              formatter={(value: any) => `$${(value as number).toFixed(2)}`}
              style={{ fontSize: 14 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Histogram;
