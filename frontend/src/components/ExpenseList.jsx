import { deleteExpense } from "../services/expenseService";

function ExpenseList({
  expenses,
  loading,
  onEdit,
  refreshExpenses
}) {

  const getCategoryIcon = (category) => {

    const icons = {
      Food: "🍔",
      Travel: "✈️",
      Shopping: "🛍️",
      Rent: "🏠",
      Entertainment: "🎬",
      Bills: "📄",
      Health: "❤️",
      Other: "📦"
    };

    return icons[category] || "💳";

  };

  const getCurrencySymbol = (currency) => {

    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€"
    };

    return symbols[currency] || "₹";

  };

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

    return (

      <div className="expense-loading">

        <div className="loading-spinner"></div>

        <p>
          Loading your expenses...
        </p>

      </div>

    );

  }

  return (

    <section className="expenses-list-section">

      <div className="expense-list-header">

        <div>

          <span className="section-label">
            YOUR RECORDS
          </span>

          <h2>
            My Expenses
          </h2>

          <p className="section-description">
            View and manage all your transactions.
          </p>

        </div>

        <div className="expense-count">

          {expenses.length} Transactions

        </div>

      </div>

      {expenses.length === 0 ? (

        <div className="premium-empty-state">

          <div className="empty-icon">
            💳
          </div>

          <h3>
            No expenses yet
          </h3>

          <p>
            Start adding your expenses to track
            where your money goes.
          </p>

        </div>

      ) : (

        <div className="premium-expense-list">

          {expenses.map((expense) => (

            <div
              className="premium-expense-item"
              key={expense.id}
            >

              <div className="expense-main-info">

                <div className="expense-category-icon">

                  {getCategoryIcon(expense.category)}

                </div>

                <div className="expense-details">

                  <h3>
                    {expense.title}
                  </h3>

                  <div className="expense-meta">

                    <span className="category-pill">

                      {expense.category}

                    </span>

                    <span className="expense-date">

                      {expense.date}

                    </span>

                  </div>

                  {expense.description && (

                    <p className="expense-description">

                      {expense.description}

                    </p>

                  )}

                </div>

              </div>

              <div className="expense-right-section">

                <strong className="expense-amount">

                  {getCurrencySymbol(expense.currency)}

                  {Number(expense.amount).toFixed(2)}

                </strong>

                {/* PROFESSIONAL ACTION BUTTONS */}

                <div className="premium-expense-actions">

                  <button
                    type="button"
                    className="expense-action-btn edit-expense-btn"
                    onClick={() => onEdit(expense)}
                    title="Edit expense"
                    aria-label="Edit expense"
                  >

                    <span className="action-icon">
                      ✎
                    </span>

                    <span>
                      Edit
                    </span>

                  </button>

                  <button
                    type="button"
                    className="expense-action-btn delete-expense-btn"
                    onClick={() =>
                      handleDelete(expense.id)
                    }
                    title="Delete expense"
                    aria-label="Delete expense"
                  >

                    <span className="action-icon">
                      ×
                    </span>

                    <span>
                      Delete
                    </span>

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}

export default ExpenseList;