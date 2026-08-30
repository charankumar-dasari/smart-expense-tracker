
import { useEffect, useState } from "react";
import "./App.css";

import BudgetTracker from "./components/BudgetTracker";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import MemberManager from "./components/MemberManager";
import SharedBillForm from "./components/SharedBillForm";
import SharedBillList from "./components/SharedBillList";

import RecurringExpenseForm from "./components/RecurringExpenseForm";
import RecurringExpenseList from "./components/RecurringExpenseList";

import {
  getExpenses,
  searchExpenses,
  getExpensesByCategory
} from "./services/expenseService";


function App() {

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedExpense,
    setSelectedExpense
  ] = useState(null);


  const [
    selectedBill,
    setSelectedBill
  ] = useState(null);


  const [
    selectedRecurringExpense,
    setSelectedRecurringExpense
  ] = useState(null);


  const [
    budgetRefreshKey,
    setBudgetRefreshKey
  ] = useState(0);


  const [
    billRefreshKey,
    setBillRefreshKey
  ] = useState(0);


  const [
    recurringRefreshKey,
    setRecurringRefreshKey
  ] = useState(0);


  const [
    searchKeyword,
    setSearchKeyword
  ] = useState("");


  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("");


  /* LOAD EXPENSES */

  const loadExpenses = async () => {

    try {

      setLoading(true);

      const response =
        await getExpenses();

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


  /* SEARCH */

  const handleSearch =
    async (value) => {

      setSearchKeyword(value);

      setSelectedCategory("");

      if (!value.trim()) {

        loadExpenses();

        return;

      }

      try {

        const response =
          await searchExpenses(value);

        setExpenses(response.data);

      } catch (error) {

        console.error(error);

      }

    };


  /* CATEGORY FILTER */

  const handleCategoryFilter =
    async (category) => {

      setSelectedCategory(category);

      setSearchKeyword("");

      if (!category) {

        loadExpenses();

        return;

      }

      try {

        const response =
          await getExpensesByCategory(
            category
          );

        setExpenses(response.data);

      } catch (error) {

        console.error(error);

      }

    };


  return (

    <div className="app">

      <header>

        <h1>
          💰 Smart Expense Tracker
        </h1>

        <p>
          Track your spending.
          Control your budget.
        </p>

      </header>


      <main>


        {/* BUDGET */}

        <BudgetTracker
          refreshKey={budgetRefreshKey}
        />


        {/* MEMBER MANAGEMENT */}

        <MemberManager />


        {/* SHARED BILL */}

        <SharedBillForm

          selectedBill={selectedBill}

          onSuccess={() => {

            setBillRefreshKey(
              (previous) =>
                previous + 1
            );

            setSelectedBill(null);

          }}

          clearSelection={() =>
            setSelectedBill(null)
          }

        />


        <SharedBillList

          refreshKey={billRefreshKey}

          onEdit={(bill) => {

            setSelectedBill(bill);

          }}

        />


        {/* RECURRING EXPENSE */}

        <RecurringExpenseForm

          selectedExpense={
            selectedRecurringExpense
          }

          onSuccess={() => {

            setRecurringRefreshKey(
              (previous) =>
                previous + 1
            );

            setSelectedRecurringExpense(
              null
            );

          }}

          clearSelection={() =>
            setSelectedRecurringExpense(
              null
            )
          }

        />


        <RecurringExpenseList

          refreshKey={
            recurringRefreshKey
          }

          onEdit={(expense) => {

            setSelectedRecurringExpense(
              expense
            );

            window.scrollTo({

              top: 0,

              behavior: "smooth"

            });

          }}

        />


        {/* EXPENSE FORM */}

        <ExpenseForm

          selectedExpense={
            selectedExpense
          }

          onSuccess={() => {

            loadExpenses();

            setBudgetRefreshKey(
              (previous) =>
                previous + 1
            );

          }}

          clearSelection={() =>
            setSelectedExpense(null)
          }

        />


        {/* SEARCH & FILTER */}

        <div className="card filters">

          <h2>
            🔍 Search & Filter
          </h2>


          <input

            type="text"

            placeholder="Search expense..."

            value={searchKeyword}

            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }

          />


          <select

            value={selectedCategory}

            onChange={(e) =>
              handleCategoryFilter(
                e.target.value
              )
            }

          >

            <option value="">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Rent">
              Rent
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* EXPENSE LIST */}

        <ExpenseList

          expenses={expenses}

          loading={loading}

          onEdit={
            setSelectedExpense
          }

          refreshExpenses={
            loadExpenses
          }

        />


      </main>

    </div>

  );

}


export default App;

