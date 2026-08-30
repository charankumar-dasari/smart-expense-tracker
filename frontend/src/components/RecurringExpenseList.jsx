
import { useEffect, useState } from "react";

import {
  getRecurringExpenses,
  toggleRecurringExpense,
  deleteRecurringExpense
} from "../services/recurringExpenseService";


function RecurringExpenseList({
  refreshKey,
  onEdit
}) {

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const loadRecurringExpenses =
    async () => {

      try {

        setLoading(true);

        const response =
          await getRecurringExpenses();

        setExpenses(response.data);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load recurring expenses"
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadRecurringExpenses();

  }, [refreshKey]);


  const handleToggle =
    async (id) => {

      try {

        await toggleRecurringExpense(id);

        await loadRecurringExpenses();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update status"
        );

      }

    };


  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this recurring expense?"
        );

      if (!confirmed) {

        return;

      }

      try {

        await deleteRecurringExpense(id);

        await loadRecurringExpenses();

        alert(
          "Recurring expense deleted successfully!"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete recurring expense"
        );

      }

    };


  if (loading) {

    return (

      <div className="card">

        <h2>
          🔄 Recurring Expenses
        </h2>

        <p>
          Loading recurring expenses...
        </p>

      </div>

    );

  }


  return (

    <div className="card">

      <h2>
        🔄 Recurring Expenses
      </h2>


      {expenses.length === 0 ? (

        <p>
          No recurring expenses added yet.
        </p>

      ) : (

        <div className="recurring-expense-list">

          {expenses.map(
            (expense) => (

              <div
                className="recurring-expense-item"
                key={expense.id}
              >

                <div>

                  <h3>
                    {expense.title}
                  </h3>


                  <p>

                    <strong>
                      Amount:
                    </strong>

                    {" "}

                    {expense.currency === "INR"
                      ? "₹"
                      : expense.currency === "USD"
                      ? "$"
                      : "€"}

                    {Number(
                      expense.amount
                    ).toFixed(2)}

                  </p>


                  <p>

                    <strong>
                      Category:
                    </strong>

                    {" "}

                    {expense.category}

                  </p>


                  <p>

                    <strong>
                      Frequency:
                    </strong>

                    {" "}

                    {expense.frequency}

                  </p>


                  <p>

                    <strong>
                      Next Due Date:
                    </strong>

                    {" "}

                    {expense.nextDueDate}

                  </p>


                  <p>

                    <strong>
                      Status:
                    </strong>

                    {" "}

                    {expense.active
                      ? "🟢 Active"
                      : "🔴 Inactive"}

                  </p>


                  {expense.description && (

                    <p>

                      <strong>
                        Description:
                      </strong>

                      {" "}

                      {expense.description}

                    </p>

                  )}

                </div>


                <div className="recurring-actions">

                  <button
                    onClick={() =>
                      onEdit(expense)
                    }
                  >

                    ✏️ Edit

                  </button>


                  <button
                    onClick={() =>
                      handleToggle(
                        expense.id
                      )
                    }
                  >

                    {expense.active
                      ? "⏸️ Deactivate"
                      : "▶️ Activate"}

                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        expense.id
                      )
                    }
                  >

                    🗑️ Delete

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}


export default RecurringExpenseList;

