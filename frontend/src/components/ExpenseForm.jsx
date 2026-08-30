import { useEffect, useState } from "react";

import {
  createExpense,
  updateExpense
} from "../services/expenseService";

const initialForm = {
  title: "",
  amount: "",
  category: "Food",
  currency: "INR",
  date: new Date().toISOString().split("T")[0],
  description: ""
};

function ExpenseForm({
  selectedExpense,
  onSuccess,
  clearSelection
}) {

  const [expense, setExpense] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (selectedExpense) {

      setExpense({
        ...selectedExpense,
        amount: selectedExpense.amount
      });

    } else {

      setExpense(initialForm);

    }

  }, [selectedExpense]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setExpense({
      ...expense,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const expenseData = {
        ...expense,
        amount: Number(expense.amount)
      };

      if (selectedExpense) {

        await updateExpense(
          selectedExpense.id,
          expenseData
        );

        alert("Expense updated successfully!");

      } else {

        await createExpense(expenseData);

        alert("Expense added successfully!");

      }

      setExpense(initialForm);

      clearSelection();

      onSuccess();

    } catch (error) {

      console.error(error);

      alert("Something went wrong!");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="card expense-form-card">

      <div className="section-header">

        <div>

          <span className="section-label">
            EXPENSE MANAGEMENT
          </span>

          <h2>
            {selectedExpense
              ? "Edit Expense"
              : "Add New Expense"}
          </h2>

          <p>
            Track and organize your daily spending.
          </p>

        </div>

      </div>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid two-columns">

          <div className="form-group">

            <label>
              Expense Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Example: Dinner"
              value={expense.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={expense.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
            >

              <option value="Food">🍔 Food</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Rent">🏠 Rent</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Bills">📄 Bills</option>
              <option value="Health">❤️ Health</option>
              <option value="Other">📦 Other</option>

            </select>

          </div>

          <div className="form-group">

            <label>
              Currency
            </label>

            <select
              name="currency"
              value={expense.currency}
              onChange={handleChange}
            >

              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>

            </select>

          </div>

        </div>

        <div className="form-grid date-description-grid">

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Optional note about this expense"
              value={expense.description}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-actions">

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : selectedExpense
              ? "Update Expense"
              : "+ Add Expense"}

          </button>

          {selectedExpense && (

            <button
              className="secondary-button"
              type="button"
              onClick={() => {

                setExpense(initialForm);

                clearSelection();

              }}
            >

              Cancel

            </button>

          )}

        </div>

      </form>

    </div>

  );

}

export default ExpenseForm;