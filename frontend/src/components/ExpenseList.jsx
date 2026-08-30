import { deleteExpense } from "../services/expenseService";

function ExpenseList({
  expenses,
  loading,
  onEdit,
  refreshExpenses
}) {

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      await deleteExpense(id);
      alert("Expense deleted successfully!");
      refreshExpenses();

    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        No expenses found.
      </div>
    );
  }

  return (
    <div className="card">
      <h2>My Expenses</h2>

      <div className="expense-list">

        {expenses.map((expense) => (

          <div className="expense-item" key={expense.id}>

            <div>
              <h3>{expense.title}</h3>

              <p>
                {expense.category} • {expense.date}
              </p>

              {expense.description && (
                <small>{expense.description}</small>
              )}
            </div>

            <div className="expense-actions">

              <strong>
                {expense.currency === "INR" && "₹"}
                {expense.currency === "USD" && "$"}
                {expense.currency === "EUR" && "€"}
                {expense.amount}
              </strong>

              <button onClick={() => onEdit(expense)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(expense.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default ExpenseList;