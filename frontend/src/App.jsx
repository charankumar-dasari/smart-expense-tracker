
import { useEffect, useState } from "react";

import "./App.css";

import BudgetTracker from "./components/BudgetTracker";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MemberManager from "./components/MemberManager";
import SharedBillForm from "./components/SharedBillForm";
import MonthlySummary from "./components/MonthlySummary";
import YearlySummary from "./components/YearlySummary";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

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

  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [budgetRefreshKey, setBudgetRefreshKey] =
    useState(0);

  const [searchKeyword, setSearchKeyword] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");


  const loadExpenses = async () => {

    try {

      setLoading(true);

      const response =
        await getExpenses();

      setExpenses(
        response.data
      );

    } catch (error) {

      console.error(
        "Failed to load expenses:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadExpenses();

  }, []);


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
          await searchExpenses(
            value
          );

        setExpenses(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };


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

        setExpenses(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };


  const clearSelection = () => {

    setSelectedExpense(null);

  };


  const handleExpenseSuccess = () => {

    loadExpenses();

    setBudgetRefreshKey(
      (previous) => previous + 1
    );

  };


  return (

    <div className="app">


      {/* HEADER */}

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


        {/* =====================
            BUDGET TRACKING
        ===================== */}

        <BudgetTracker
          refreshKey={
            budgetRefreshKey
          }
        />


        {/* =====================
            MONTHLY SUMMARY
        ===================== */}

        <MonthlySummary />


        {/* =====================
            YEARLY SUMMARY
        ===================== */}

        <YearlySummary />


        {/* =====================
            REPORTS & ANALYTICS
        ===================== */}

        <AnalyticsDashboard />


        {/* =====================
            MEMBER MANAGEMENT
        ===================== */}

        <MemberManager />


        {/* =====================
            SHARED BILLS
        ===================== */}

        <SharedBillForm
          onSuccess={() => {

            console.log(
              "Bill created successfully"
            );

          }}
        />


        {/* =====================
            EXPENSE FORM
        ===================== */}

        <ExpenseForm
          selectedExpense={
            selectedExpense
          }
          onSuccess={
            handleExpenseSuccess
          }
          clearSelection={
            clearSelection
          }
        />


        {/* =====================
            SEARCH & FILTER
        ===================== */}

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


        {/* =====================
            EXPENSE LIST
        ===================== */}

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
