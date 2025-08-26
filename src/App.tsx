import { useEffect, useState } from "react";
import BudgetManagement from "./Components/BudgetManagement";
import CreateExpense from "./Components/CreateExpense";
import ExpenseHistory from "./Components/ExpenseHistory";
import ExpenseList from "./Components/ExpenseList";
import Histogram from "./Components/Histogram";
import Navigation from "./Components/Navigation";
import { useExpenses } from "./hooks/useExpenses";
import "./index.css";
import { filterByDate } from "./utils";

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [todaysExpenses, setTodaysExpenses] = useState(
    filterByDate(expenses, new Date(), "day")
  );

  useEffect(() => {
    console.log("Expenses updated:", expenses);
    setTodaysExpenses(filterByDate(expenses, new Date(), "day"));
  }, [expenses]);

  return (
    <div className="h-screen px-4 md:px-16 max-w-[1024px] mx-auto">
      <Navigation onNavigate={setShowHistory} showHistory={showHistory} />

      {showHistory ? (
        <ExpenseHistory expenses={expenses} />
      ) : (
        <>
          <BudgetManagement expenses={expenses} />
          {todaysExpenses.length > 0 && (
            <Histogram expenses={todaysExpenses} title="Top Categories Today" />
          )}
          <CreateExpense addExpense={addExpense} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </>
      )}
    </div>
  );
}

export default App;
