import { useEffect, useState } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import {
  getExpenses,
  searchExpenses,
  getExpensesByCategory
} from "./services/expenseService";

function App() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadExpenses = async () => {

    try {
      setLoading(true);

      const response = await getExpenses();
      setExpenses(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSearch = async (value) => {

    setSearchKeyword(value);
    setSelectedCategory("");

    if (!value.trim()) {
      loadExpenses();
      return;
    }

    try {
      const response = await searchExpenses(value);
      setExpenses(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryFilter = async (category) => {

    setSelectedCategory(category);
    setSearchKeyword("");

    if (!category) {
      loadExpenses();
      return;
    }

    try {
      const response =
        await getExpensesByCategory(category);

      setExpenses(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const clearSelection = () => {
    setSelectedExpense(null);
  };

  return (

    <div className="app">

      <header>
        <h1>💰 Smart Expense Tracker</h1>
        <p>Track your spending. Control your budget.</p>
      </header>

      <main>

        <ExpenseForm
          selectedExpense={selectedExpense}
          onSuccess={loadExpenses}
          clearSelection={clearSelection}
        />

        <div className="card filters">

          <h2>Search & Filter</h2>

          <input
            type="text"
            placeholder="Search expense..."
            value={searchKeyword}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              handleCategoryFilter(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Bills">Bills</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>

          </select>

        </div>

        <ExpenseList
          expenses={expenses}
          loading={loading}
          onEdit={setSelectedExpense}
          refreshExpenses={loadExpenses}
        />

      </main>

    </div>
  );
}

export default App;