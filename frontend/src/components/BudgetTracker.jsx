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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const loadSummary = async () => {

    try {

      setLoading(true);

      const response =
        await getBudgetSummary(
          month,
          year
        );

      setSummary(response.data);

      setAmount(
        response.data.budgetAmount
      );

    } catch (error) {

      // No budget available for this month
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

      alert(
        "Failed to save budget"
      );

    } finally {

      setLoading(false);

    }

  };

  const getStatusClass = () => {

    if (!summary) {

      return "";

    }

    return summary.status.toLowerCase();

  };

  return (

    <div className="card budget-card">

      <h2>
        📊 Budget Tracking
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="budget-inputs">

          {/* Month */}

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

          {/* Year */}

          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(
                Number(e.target.value)
              )
            }
            min="2020"
          />

          {/* Budget Amount */}

          <input
            type="number"
            placeholder="Monthly Budget"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            min="1"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : "Save Budget"}

        </button>

      </form>

      {/* Budget Summary */}

      {summary && (

        <div className="budget-summary">

          <div className="summary-grid">

            {/* Monthly Budget */}

            <div className="summary-item">

              <span>
                Monthly Budget
              </span>

              <strong>
                ₹
                {summary.budgetAmount.toFixed(2)}
              </strong>

            </div>

            {/* Total Spent */}

            <div className="summary-item">

              <span>
                Total Spent
              </span>

              <strong>
                ₹
                {summary.totalSpent.toFixed(2)}
              </strong>

            </div>

            {/* Remaining */}

            <div className="summary-item">

              <span>
                Remaining
              </span>

              <strong>
                ₹
                {summary.remainingAmount.toFixed(2)}
              </strong>

            </div>

            {/* Usage */}

            <div className="summary-item">

              <span>
                Usage
              </span>

              <strong>
                {summary.usagePercentage.toFixed(1)}
                %
              </strong>

            </div>

          </div>

          {/* Progress Bar */}

          <div className="progress-container">

            <div
              className="progress-bar"
              style={{

                width: `${Math.min(
                  summary.usagePercentage,
                  100
                )}%`

              }}
            />

          </div>

          {/* Status */}

          <div
            className={
              `budget-status ${getStatusClass()}`
            }
          >

            Budget Status: {summary.status}

          </div>

        </div>

      )}

      {/* No Budget */}

      {!summary && !loading && (

        <p className="no-budget">

          No budget has been created for this month.
          Set your monthly budget above.

        </p>

      )}

    </div>

  );
}

export default BudgetTracker;