export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Category {
  name: string;
  value: number;
  color: string;
}

export type Budget = {
  id: string;
  amount: number;
  type: "monthly" | "category";
  category?: string;
};
