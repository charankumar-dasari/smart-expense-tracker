
import { useEffect, useState } from "react";

import {
  createRecurringExpense,
  updateRecurringExpense
} from "../services/recurringExpenseService";


const initialForm = {
  title: "",
  amount: "",
  category: "Food",
  currency: "INR",
  frequency: "MONTHLY",
  startDate: new Date()
    .toISOString()
    .split("T")[0],
  description: ""
};


function RecurringExpenseForm({
  selectedExpense,
  onSuccess,
  clearSelection
}) {

  const [expense, setExpense] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);


  /* =========================
     LOAD DATA FOR EDIT
  ========================= */

  useEffect(() => {

    if (selectedExpense) {

      setExpense({

        title:
          selectedExpense.title || "",

        amount:
          selectedExpense.amount || "",

        category:
          selectedExpense.category || "Food",

        currency:
          selectedExpense.currency || "INR",

        frequency:
          selectedExpense.frequency || "MONTHLY",

        startDate:
          selectedExpense.startDate ||
          initialForm.startDate,

        description:
          selectedExpense.description || ""

      });

    } else {

      setExpense(initialForm);

    }

  }, [selectedExpense]);


  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setExpense({
      ...expense,
      [name]: value
    });

  };


  /* =========================
     SUBMIT FORM
  ========================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      if (
        !expense.title.trim()
      ) {

        alert(
          "Please enter an expense title"
        );

        return;

      }


      if (
        !expense.amount ||
        Number(expense.amount) <= 0
      ) {

        alert(
          "Please enter a valid amount"
        );

        return;

      }


      try {

        setLoading(true);


        const expenseData = {

          ...expense,

          amount:
            Number(expense.amount)

        };


        if (selectedExpense) {

          await updateRecurringExpense(

            selectedExpense.id,

            expenseData

          );


          alert(
            "Recurring expense updated successfully!"
          );

        } else {

          await createRecurringExpense(
            expenseData
          );


          alert(
            "Recurring expense created successfully!"
          );

        }


        setExpense(initialForm);


        if (clearSelection) {

          clearSelection();

        }


        if (onSuccess) {

          onSuccess();

        }


      } catch (error) {

        console.error(error);

        alert(
          "Failed to save recurring expense"
        );

      } finally {

        setLoading(false);

      }

    };


  /* =========================
     CANCEL EDIT
  ========================= */

  const handleCancel = () => {

    setExpense(initialForm);

    if (clearSelection) {

      clearSelection();

    }

  };


  return (

    <div className="card">


      <h2>

        {selectedExpense
          ? "✏️ Edit Recurring Expense"
          : "🔄 Add Recurring Expense"}

      </h2>


      <form
        onSubmit={handleSubmit}
      >


        {/* TITLE */}

        <input

          type="text"

          name="title"

          placeholder="Expense title (Example: Netflix)"

          value={expense.title}

          onChange={handleChange}

          required

        />


        {/* AMOUNT */}

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


        {/* CATEGORY */}

        <select

          name="category"

          value={expense.category}

          onChange={handleChange}

        >

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


        {/* CURRENCY */}

        <select

          name="currency"

          value={expense.currency}

          onChange={handleChange}

        >

          <option value="INR">
            INR ₹
          </option>

          <option value="USD">
            USD $
          </option>

          <option value="EUR">
            EUR €
          </option>

        </select>


        {/* FREQUENCY */}

        <select

          name="frequency"

          value={expense.frequency}

          onChange={handleChange}

        >

          <option value="DAILY">
            Daily
          </option>

          <option value="WEEKLY">
            Weekly
          </option>

          <option value="MONTHLY">
            Monthly
          </option>

          <option value="YEARLY">
            Yearly
          </option>

        </select>


        {/* START DATE */}

        <input

          type="date"

          name="startDate"

          value={expense.startDate}

          onChange={handleChange}

          required

        />


        {/* DESCRIPTION */}

        <textarea

          name="description"

          placeholder="Description (optional)"

          value={expense.description}

          onChange={handleChange}

        />


        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : selectedExpense
            ? "Update Recurring Expense"
            : "Add Recurring Expense"}

        </button>


        {/* CANCEL BUTTON */}

        {selectedExpense && (

          <button

            type="button"

            onClick={handleCancel}

          >

            Cancel Edit

          </button>

        )}


      </form>


    </div>

  );

}


export default RecurringExpenseForm;

