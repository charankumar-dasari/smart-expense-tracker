import { useEffect, useState } from "react";

import {
  createOrUpdateBudget,
  getBudgetSummary
} from "../services/budgetService";

function BudgetTracker({ refreshKey }) {

  const currentDate = new Date();

  const [month, setMonth] =
    useState(currentDate.getMonth() + 1);

  const [year, setYear] =
    useState(currentDate.getFullYear());

  const [amount, setAmount] =
    useState("");

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  const loadSummary = async () => {

    try {

      setLoading(true);

      const response =
        await getBudgetSummary(month, year);

      setSummary(response.data);

      setAmount(
        response.data.budgetAmount
      );

    } catch (error) {

      setSummary(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadSummary();

  }, [month, year, refreshKey]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !amount ||
      Number(amount) <= 0
    ) {

      alert(
        "Please enter a valid budget amount"
      );

      return;

    }

    try {

      setLoading(true);

      await createOrUpdateBudget({

        amount: Number(amount),

        month: Number(month),

        year: Number(year)

      });

      alert(
        "Budget saved successfully!"
      );

      await loadSummary();

    } catch (error) {

      console.error(error);

      alert("Failed to save budget");

    } finally {

      setLoading(false);

    }

  };

  const getStatusClass = () => {

    if (!summary) return "";

    return summary.status.toLowerCase();

  };

  return (

    <div className="budget-tracker">

      <div className="section-header">

        <div>

          <span className="section-label">
            FINANCIAL PLANNING
          </span>

          <h2>
            Budget Management
          </h2>

          <p>
            Plan your spending and stay in
            control of your finances.
          </p>

        </div>

      </div>

      <div className="card budget-card">

        <h3>
          Monthly Budget
        </h3>

        <form
          className="budget-form"
          onSubmit={handleSubmit}
        >

          <select
            value={month}
            onChange={(e) =>
              setMonth(
                Number(e.target.value)
              )
            }
          >

            {monthNames.map(
              (monthName, index) => (

                <option
                  key={index}
                  value={index + 1}
                >

                  {monthName}

                </option>

              )
            )}

          </select>

          <input
            type="number"
            value={year}
            min="2020"
            onChange={(e) =>
              setYear(
                Number(e.target.value)
              )
            }
          />

          <input
            type="number"
            placeholder="Enter monthly budget"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            min="1"
          />

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : "Save Budget"}

          </button>

        </form>

      </div>

      {summary && (

        <div className="budget-overview-grid">

          <div className="summary-item">

            <span>
              Monthly Budget
            </span>

            <strong>

              ₹
              {summary.budgetAmount.toFixed(2)}

            </strong>

          </div>

          <div className="summary-item">

            <span>
              Total Spent
            </span>

            <strong>

              ₹
              {summary.totalSpent.toFixed(2)}

            </strong>

          </div>

          <div className="summary-item">

            <span>
              Remaining
            </span>

            <strong>

              ₹
              {summary.remainingAmount.toFixed(2)}

            </strong>

          </div>

          <div className="summary-item">

            <span>
              Usage
            </span>

            <strong>

              {summary.usagePercentage.toFixed(1)}%

            </strong>

          </div>

        </div>

      )}

      {summary && (

        <div className="card budget-progress-card">

          <div className="budget-progress-header">

            <span>
              Budget Usage
            </span>

            <strong>

              {summary.usagePercentage.toFixed(1)}%

            </strong>

          </div>

          <div className="progress-container">

            <div
              className="progress-bar"
              style={{
                width:
                  `${Math.min(
                    summary.usagePercentage,
                    100
                  )}%`
              }}
            />

          </div>

          <div
            className={
              `budget-status ${getStatusClass()}`
            }
          >

            Budget Status: {summary.status}

          </div>

        </div>

      )}

      {!summary && !loading && (

        <div className="premium-empty-state">

          <div className="empty-icon">
            📊
          </div>

          <h3>
            No budget created
          </h3>

          <p>
            Set a monthly budget to start
            tracking your spending.
          </p>

        </div>

      )}

    </div>

  );

}

export default BudgetTracker;