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

  const [activeSection, setActiveSection] =
    useState("dashboard");

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

      setExpenses(response.data);

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
          await searchExpenses(value);

        setExpenses(
          response.data
        );

      } catch (error) {

        console.error(
          "Search failed:",
          error
        );

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

        console.error(
          "Filter failed:",
          error
        );

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


  const handleEditExpense =
    (expense) => {

      setSelectedExpense(expense);

      setActiveSection("expenses");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  const navigationItems = [

    {
      id: "dashboard",
      label: "Dashboard",
      icon: "⌂"
    },

    {
      id: "expenses",
      label: "Expenses",
      icon: "💳"
    },

    {
      id: "budget",
      label: "Budget",
      icon: "📊"
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: "📈"
    },

    {
      id: "bills",
      label: "Shared Bills",
      icon: "🧾"
    },

    {
      id: "members",
      label: "Members",
      icon: "👥"
    }

  ];


  const renderDashboard = () => (

    <>

      <div className="dashboard-hero">

        <div>

          <span className="hero-badge">
            PERSONAL FINANCE DASHBOARD
          </span>

          <h1>
            Take control of your
            <span> money.</span>
          </h1>

          <p>
            Track expenses, manage budgets,
            analyze spending and split bills
            with ease.
          </p>

        </div>

        <div className="hero-icon">
          💰
        </div>

      </div>


      <div className="dashboard-quick-actions">

        <button
          className="quick-action-card"
          onClick={() =>
            setActiveSection("expenses")
          }
        >

          <span>💳</span>

          <div>

            <strong>
              Manage Expenses
            </strong>

            <small>
              Add and track spending
            </small>

          </div>

        </button>


        <button
          className="quick-action-card"
          onClick={() =>
            setActiveSection("budget")
          }
        >

          <span>📊</span>

          <div>

            <strong>
              Budget Planning
            </strong>

            <small>
              Control your monthly budget
            </small>

          </div>

        </button>


        <button
          className="quick-action-card"
          onClick={() =>
            setActiveSection("analytics")
          }
        >

          <span>📈</span>

          <div>

            <strong>
              View Analytics
            </strong>

            <small>
              Understand your spending
            </small>

          </div>

        </button>


        <button
          className="quick-action-card"
          onClick={() =>
            setActiveSection("bills")
          }
        >

          <span>🧾</span>

          <div>

            <strong>
              Split Bills
            </strong>

            <small>
              Manage shared expenses
            </small>

          </div>

        </button>

      </div>


      <div className="dashboard-section">

        <div className="section-title-row">

          <div>

            <span className="section-label">
              OVERVIEW
            </span>

            <h2>
              Monthly Overview
            </h2>

          </div>

        </div>

        <MonthlySummary />

      </div>

    </>

  );


  const renderExpenses = () => (

    <>

      <div className="page-heading">

        <span className="section-label">
          EXPENSE MANAGEMENT
        </span>

        <h1>
          Manage Your Expenses
        </h1>

        <p>
          Add, edit and organize all your
          daily spending in one place.
        </p>

      </div>


      <ExpenseForm
        selectedExpense={selectedExpense}
        onSuccess={handleExpenseSuccess}
        clearSelection={clearSelection}
      />


      <div className="card filters">

        <div className="filter-header">

          <div>

            <span className="section-label">
              FIND EXPENSES
            </span>

            <h2>
              Search & Filter
            </h2>

          </div>

        </div>


        <div className="filter-controls">

          <input
            type="text"
            placeholder="Search by expense title..."
            value={searchKeyword}
            onChange={(e) =>
              handleSearch(e.target.value)
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
              🍔 Food
            </option>

            <option value="Travel">
              ✈️ Travel
            </option>

            <option value="Shopping">
              🛍️ Shopping
            </option>

            <option value="Rent">
              🏠 Rent
            </option>

            <option value="Entertainment">
              🎬 Entertainment
            </option>

            <option value="Bills">
              📄 Bills
            </option>

            <option value="Health">
              ❤️ Health
            </option>

            <option value="Other">
              📦 Other
            </option>

          </select>

        </div>

      </div>


      <ExpenseList
        expenses={expenses}
        loading={loading}
        onEdit={handleEditExpense}
        refreshExpenses={loadExpenses}
      />

    </>

  );


  const renderBudget = () => (

    <>

      <div className="page-heading">

        <span className="section-label">
          FINANCIAL PLANNING
        </span>

        <h1>
          Budget Management
        </h1>

        <p>
          Plan your monthly spending and
          stay in control of your finances.
        </p>

      </div>


      <BudgetTracker
        refreshKey={budgetRefreshKey}
      />

    </>

  );


  const renderAnalytics = () => (

    <>

      <div className="page-heading">

        <span className="section-label">
          FINANCIAL INSIGHTS
        </span>

        <h1>
          Reports & Analytics
        </h1>

        <p>
          Discover where your money goes
          with detailed spending insights.
        </p>

      </div>


      <AnalyticsDashboard />


      <YearlySummary />

    </>

  );


  const renderBills = () => (

    <>

      <div className="page-heading">

        <span className="section-label">
          BILL MANAGEMENT
        </span>

        <h1>
          Shared Bills
        </h1>

        <p>
          Create shared expenses and split
          costs fairly between members.
        </p>

      </div>


      <SharedBillForm
        onSuccess={() => {

          console.log(
            "Bill created successfully"
          );

        }}
      />

    </>

  );


  const renderMembers = () => (

    <>

      <div className="page-heading">

        <span className="section-label">
          PEOPLE MANAGEMENT
        </span>

        <h1>
          Manage Members
        </h1>

        <p>
          Add people who participate
          in your shared expenses.
        </p>

      </div>


      <MemberManager />

    </>

  );


  const renderActiveSection = () => {

    switch (activeSection) {

      case "dashboard":

        return renderDashboard();


      case "expenses":

        return renderExpenses();


      case "budget":

        return renderBudget();


      case "analytics":

        return renderAnalytics();


      case "bills":

        return renderBills();


      case "members":

        return renderMembers();


      default:

        return renderDashboard();

    }

  };


  return (

    <div className="app">


      {/* =====================
          NAVIGATION BAR
      ===================== */}

      <header className="top-navbar">

        <div className="navbar-container">


          <button
            className="brand"
            onClick={() =>
              setActiveSection("dashboard")
            }
          >

            <span className="brand-icon">
              💰
            </span>

            <div>

              <strong>
                Smart Expense
              </strong>

              <small>
                TRACKER
              </small>

            </div>

          </button>


          <nav className="navbar-menu">

            {navigationItems.map(
              (item) => (

                <button
                  key={item.id}
                  className={
                    activeSection === item.id
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() =>
                    setActiveSection(item.id)
                  }
                >

                  <span>
                    {item.icon}
                  </span>

                  {item.label}

                </button>

              )
            )}

          </nav>


          <div className="navbar-profile">

            <div className="profile-avatar">
              C
            </div>

          </div>


        </div>

      </header>


      {/* =====================
          MAIN CONTENT
      ===================== */}

      <main className="main-content">

        {renderActiveSection()}

      </main>


      {/* =====================
          FOOTER
      ===================== */}

      <footer>

        <strong>
          💰 Smart Expense Tracker
        </strong>

        <span>
          Manage your money smarter.
        </span>

      </footer>


    </div>

  );

}

export default App;