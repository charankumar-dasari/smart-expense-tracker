
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const generateExpenseReport = (
  expenses
) => {

  const doc = new jsPDF();


  /* =========================
     TITLE
  ========================= */

  doc.setFontSize(18);

  doc.text(
    "Smart Expense Tracker",
    14,
    20
  );


  doc.setFontSize(12);

  doc.text(
    "Expense Report",
    14,
    28
  );


  /* =========================
     TABLE DATA
  ========================= */

  const tableData =
    expenses.map(
      (expense, index) => [

        index + 1,

        expense.title,

        expense.category,

        expense.currency,

        expense.amount,

        expense.date,

        expense.description ||
          "-"

      ]
    );


  /* =========================
     EXPENSE TABLE
  ========================= */

  autoTable(
    doc,
    {

      startY: 35,

      head: [
        [
          "No.",
          "Title",
          "Category",
          "Currency",
          "Amount",
          "Date",
          "Description"
        ]
      ],

      body:
        tableData

    }
  );


  /* =========================
     TOTAL
  ========================= */

  const totalAmount =
    expenses.reduce(
      (total, expense) =>
        total +
        Number(expense.amount),
      0
    );


  const finalY =
    doc.lastAutoTable
      .finalY + 10;


  doc.setFontSize(12);


  doc.text(
    `Total Expenses: ₹${totalAmount.toFixed(2)}`,
    14,
    finalY
  );


  /* =========================
     GENERATE DATE
  ========================= */

  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    14,
    finalY + 8
  );


  /* =========================
     DOWNLOAD PDF
  ========================= */

  doc.save(
    "expense-report.pdf"
  );

};

