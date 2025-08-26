import React, { useState } from "react";
import { StandardCategories } from "../constants";
import type { Expense } from "../types";

interface CreateExpenseFormProps {
  onClose: () => void;
  addExpense: (expense: Expense) => void;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  onClose,
  addExpense,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<string>(
    StandardCategories.keys().next().value ?? ""
  );

  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      hasErrors = true;
    } else {
      setDescriptionError(null);
    }

    if (amount <= 0) {
      setAmountError("Amount must be greater than 0.");
      hasErrors = true;
    } else {
      setAmountError(null);
    }

    if (!date) {
      setDateError("Date is required.");
      hasErrors = true;
    } else {
      setDateError(null);
    }

    if (!category) {
      setCategoryError("Category is required.");
      hasErrors = true;
    } else {
      setCategoryError(null);
    }

    if (hasErrors) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount,
      date,
      category,
    };

    addExpense(newExpense);
    onClose();

    setDescription("");
    setAmount(0);
    setDate("");
    setCategory(StandardCategories.keys().next().value ?? "");
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            descriptionError ? "border-red-500" : ""
          }`}
          placeholder="e.g., Groceries, Dinner with friends"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (descriptionError) setDescriptionError(null);
          }}
        />
        {descriptionError && (
          <p className="text-red-500 text-xs italic">{descriptionError}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            amountError ? "border-red-500" : ""
          }`}
          placeholder="e.g., 50.00"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            if (amountError) setAmountError(null);
          }}
        />
        {amountError && (
          <p className="text-red-500 text-xs italic">{amountError}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Date:
        </label>
        <input
          type="date"
          id="date"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            dateError ? "border-red-500" : ""
          }`}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (dateError) setDateError(null);
          }}
        />
        {dateError && (
          <p className="text-red-500 text-xs italic">{dateError}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Category:
        </label>
        <select
          id="category"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            categoryError ? "border-red-500" : ""
          }`}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (categoryError) setCategoryError(null);
          }}
        >
          {Array.from(StandardCategories.entries()).map(
            ([key, categoryData]) => (
              <option key={key} value={key}>
                {categoryData.name}
              </option>
            )
          )}
        </select>
        {categoryError && (
          <p className="text-red-500 text-xs italic">{categoryError}</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateExpenseForm;
