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

function ExpenseForm({ selectedExpense, onSuccess, clearSelection }) {

  const [expense, setExpense] = useState(initialForm);
  const [loading, setLoading] = useState(false);

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
        await updateExpense(selectedExpense.id, expenseData);
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
    <div className="card">
      <h2>
        {selectedExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={expense.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <select
          name="currency"
          value={expense.currency}
          onChange={handleChange}
        >
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
        </select>

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={expense.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : selectedExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>

        {selectedExpense && (
          <button
            type="button"
            onClick={() => {
              setExpense(initialForm);
              clearSelection();
            }}
          >
            Cancel Edit
          </button>
        )}

      </form>
    </div>
  );
}

export default ExpenseForm;