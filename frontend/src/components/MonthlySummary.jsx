
import { useEffect, useState } from "react";

import {
  getMonthlySummary
} from "../services/summaryService";


function MonthlySummary() {

  const currentDate =
    new Date();


  const [month, setMonth] =
    useState(
      currentDate.getMonth() + 1
    );


  const [year, setYear] =
    useState(
      currentDate.getFullYear()
    );


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


  const loadSummary =
    async () => {

      try {

        setLoading(true);


        const response =
          await getMonthlySummary(
            month,
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

  }, [month, year]);


  return (

    <div className="card monthly-summary">


      <h2>
        📈 Monthly Summary
      </h2>


      <div className="summary-filters">


        <select
          value={month}
          onChange={(e) =>
            setMonth(
              Number(
                e.target.value
              )
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


        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(
              Number(
                e.target.value
              )
            )
          }
          min="2020"
        />


      </div>


      {loading && (

        <p>
          Loading summary...
        </p>

      )}


      {!loading && summary && (

        <>

          <div className="summary-grid">


            <div className="summary-item">

              <span>
                💰 Total Spent
              </span>

              <strong>
                ₹
                {Number(
                  summary.totalSpent
                ).toFixed(2)}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                🧾 Transactions
              </span>

              <strong>
                {summary.totalTransactions}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                📊 Average Expense
              </span>

              <strong>
                ₹
                {Number(
                  summary.averageExpense
                ).toFixed(2)}
              </strong>

            </div>


          </div>


          <h3>
            Category-wise Spending
          </h3>


          {Object.keys(
            summary.categoryWiseSpending
          ).length === 0 ? (

            <p>
              No expenses found for this month.
            </p>

          ) : (

            <div className="category-summary">

              {Object.entries(
                summary.categoryWiseSpending
              ).map(
                ([category, amount]) => (

                  <div
                    className="category-summary-item"
                    key={category}
                  >

                    <span>
                      {category}
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

          )}

        </>

      )}


    </div>

  );

}


export default MonthlySummary;

