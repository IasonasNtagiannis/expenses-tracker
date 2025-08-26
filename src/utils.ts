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
