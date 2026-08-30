
import { useEffect, useState } from "react";

import {
  getYearlySummary
} from "../services/summaryService";


function YearlySummary() {

  const currentYear =
    new Date().getFullYear();


  const [year, setYear] =
    useState(currentYear);


  const [summary, setSummary] =
    useState(null);


  const [loading, setLoading] =
    useState(false);


  const loadSummary =
    async () => {

      try {

        setLoading(true);


        const response =
          await getYearlySummary(
            year
          );


        setSummary(
          response.data
        );

      } catch (error) {

        console.error(error);

        setSummary(null);

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadSummary();

  }, [year]);


  return (

    <div className="card yearly-summary">


      <h2>
        📅 Yearly Summary
      </h2>


      {/* YEAR SELECTOR */}

      <div className="summary-filters">

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

      </div>


      {/* LOADING */}

      {loading && (

        <p>
          Loading yearly summary...
        </p>

      )}


      {/* SUMMARY */}

      {!loading && summary && (

        <>


          <div className="summary-grid">


            {/* TOTAL SPENT */}

            <div className="summary-item">

              <span>
                💰 Total Yearly Spending
              </span>

              <strong>

                ₹

                {Number(
                  summary.totalSpent
                ).toFixed(2)}

              </strong>

            </div>


            {/* TRANSACTIONS */}

            <div className="summary-item">

              <span>
                🧾 Total Transactions
              </span>

              <strong>

                {summary.totalTransactions}

              </strong>

            </div>


            {/* AVERAGE */}

            <div className="summary-item">

              <span>
                📊 Average Monthly Expense
              </span>

              <strong>

                ₹

                {Number(
                  summary.averageMonthlyExpense
                ).toFixed(2)}

              </strong>

            </div>


          </div>


          {/* MONTH-WISE SPENDING */}

          <h3>
            📈 Month-wise Spending
          </h3>


          <div className="yearly-month-list">

            {Object.entries(
              summary.monthlySpending
            ).map(

              ([month, amount]) => (

                <div
                  className="yearly-month-item"
                  key={month}
                >

                  <span>

                    {month}

                  </span>


                  <strong>

                    ₹

                    {Number(
                      amount
                    ).toFixed(2)}

                  </strong>


                </div>

              )

            )}

          </div>


        </>

      )}


    </div>

  );

}


export default YearlySummary;

