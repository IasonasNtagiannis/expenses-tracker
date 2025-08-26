import type { Expense } from "./types";

type FilteringPeriods = "day" | "month" | "year";

export function filterByDate(
  items: Expense[],
  targetDate: Date,
  period: FilteringPeriods
): Expense[] {
  const yyyy = targetDate.getFullYear();
  const mm = targetDate.getMonth();
  const dd = targetDate.getDate();

  return items.filter((item) => {
    const d = new Date(item.date);

    const matchesYear = d.getFullYear() === yyyy;
    const matchesMonth = d.getMonth() === mm;
    const matchesDay = d.getDate() === dd;

    if (period === "day") return matchesYear && matchesMonth && matchesDay;
    if (period === "month") return matchesYear && matchesMonth;
    if (period === "year") return matchesYear;

    return false;
  });
}

export const getMonths = () => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    months.push({
      value: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      label: date.toLocaleString("default", { month: "long", year: "numeric" }),
    });
  }
  return months;
};

export const getMonthsWithExpenses = (expenses: Expense[]) => {
  // Get unique month-year combinations from expenses
  const monthYearSet = new Set<string>();
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    monthYearSet.add(monthYear);
  });
  
  // Convert to array and sort by date (newest first)
  const months = Array.from(monthYearSet)
    .map(monthYear => {
      const [year, month] = monthYear.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return {
        value: monthYear,
        label: date.toLocaleString("default", { month: "long", year: "numeric" }),
        date: date
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return months;
};
