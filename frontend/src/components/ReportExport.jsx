
import {
  generateExpenseReport
} from "../services/pdfService";


function ReportExport({
  expenses
}) {


  const handleExport = () => {

    if (
      !expenses ||
      expenses.length === 0
    ) {

      alert(
        "No expenses available to export."
      );

      return;

    }


    generateExpenseReport(
      expenses
    );

  };


  return (

    <div className="card report-export">


      <h2>
        📄 Export Expense Report
      </h2>


      <p>
        Download your expense details
        as a PDF report.
      </p>


      <button
        onClick={
          handleExport
        }
      >

        📥 Download PDF Report

      </button>


    </div>

  );

}


export default ReportExport;

