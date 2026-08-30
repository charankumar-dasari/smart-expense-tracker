
import { useEffect, useState } from "react";
import "./App.css";

import BudgetTracker from "./components/BudgetTracker";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import MemberManager from "./components/MemberManager";
import SharedBillForm from "./components/SharedBillForm";
import SharedBillList from "./components/SharedBillList";

import {
  getExpenses,
  searchExpenses,
  getExpensesByCategory
} from "./services/expenseService";


function App() {

  /* =========================
     EXPENSE STATES
  ========================= */

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [
    selectedExpense,
    setSelectedExpense
  ] = useState(null);


  /* =========================
     BILL EDIT STATE
  ========================= */

  const [
    selectedBill,
    setSelectedBill
  ] = useState(null);


  /* =========================
     REFRESH STATES
  ========================= */

  const [
    budgetRefreshKey,
    setBudgetRefreshKey
  ] = useState(0);

  const [
    billRefreshKey,
    setBillRefreshKey
  ] = useState(0);


  /* =========================
     SEARCH & FILTER STATES
  ========================= */

  const [
    searchKeyword,
    setSearchKeyword
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("");


  /* =========================
     LOAD ALL EXPENSES
  ========================= */

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


  /* =========================
     LOAD EXPENSES ON START
  ========================= */

  useEffect(() => {

    loadExpenses();

  }, []);


  /* =========================
     SEARCH EXPENSES
  ========================= */

  const handleSearch = async (value) => {

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


  /* =========================
     FILTER EXPENSES
  ========================= */

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


  /* =========================
     CLEAR EXPENSE EDIT
  ========================= */

  const clearExpenseSelection = () => {

    setSelectedExpense(null);

  };


  /* =========================
     CLEAR BILL EDIT
  ========================= */

  const clearBillSelection = () => {

    setSelectedBill(null);

  };


  return (

    <div className="app">


      {/* =========================
          HEADER
      ========================= */}

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


        {/* =========================
            BUDGET MODULE
        ========================= */}

        <BudgetTracker
          refreshKey={budgetRefreshKey}
        />


        {/* =========================
            MEMBER MANAGEMENT
        ========================= */}

        <MemberManager />


        {/* =========================
            CREATE / EDIT SHARED BILL
        ========================= */}

        <SharedBillForm

          selectedBill={selectedBill}

          onSuccess={() => {

            setBillRefreshKey(
              (previous) =>
                previous + 1
            );

            setSelectedBill(null);

          }}

          clearSelection={
            clearBillSelection
          }

        />


        {/* =========================
            SHARED BILL LIST
        ========================= */}

        <SharedBillList

          refreshKey={billRefreshKey}

          onEdit={(bill) => {

            setSelectedBill(bill);

            window.scrollTo({

              top: 0,

              behavior: "smooth"

            });

          }}

        />


        {/* =========================
            ADD / EDIT EXPENSE
        ========================= */}

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

          clearSelection={
            clearExpenseSelection
          }

        />


        {/* =========================
            SEARCH & FILTER
        ========================= */}

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


        {/* =========================
            EXPENSE LIST
        ========================= */}

        <ExpenseList

          expenses={expenses}

          loading={loading}

          onEdit={setSelectedExpense}

          refreshExpenses={
            loadExpenses
          }

        />


      </main>

    </div>

  );

}


export default App;

