import { StandardCategories } from "../constants";
import type { Expense } from "../types";

interface ExpenseListItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseListItem = ({ expense, onDelete }: ExpenseListItemProps) => {
  return (
    <div className="flex justify-between items-center border border-gray-300 p-2 rounded-lg  h-min gap-4">
      <div className="text-xl">
        {StandardCategories.get(expense.category.toLowerCase() ?? "")?.icon ??
          "❓"}
      </div>
      <div className="flex flex-col whitespace-nowrap self-start">
        {expense.description}
      </div>
      <div>{expense.amount}$</div>
      <div className="flex gap-2">
        <button
          onClick={() => onDelete(expense.id)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseListItem;
