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
          await getYearlySummary(year);


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


  const getMonthData = () => {

    if (!summary?.monthlySpending) {
      return [];
    }

    return Object.entries(
      summary.monthlySpending
    );

  };


  const monthData =
    getMonthData();


  const maxAmount =
    monthData.length > 0
      ? Math.max(
          ...monthData.map(
            ([, amount]) =>
              Number(amount)
          )
        )
      : 0;


  return (

    <div className="card yearly-summary">


      {/* HEADER */}

      <div className="section-header">

        <div>

          <span className="section-label">
            FINANCIAL OVERVIEW
          </span>

          <h2>
            📅 Yearly Summary
          </h2>

          <p className="section-description">
            Review your overall spending
            and yearly financial activity.
          </p>

        </div>


        <div className="year-selector">

          <span>
            Year
          </span>

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

      </div>


      {/* LOADING */}

      {loading && (

        <div className="analytics-loading">

          <div className="loading-spinner" />

          <p>
            Loading yearly summary...
          </p>

        </div>

      )}


      {/* SUMMARY */}

      {!loading && summary && (

        <>


          {/* TOP SUMMARY CARDS */}

          <div className="yearly-summary-grid">


            <div className="yearly-stat-card">

              <div className="stat-icon">
                💰
              </div>

              <div>

                <span>
                  Total Yearly Spending
                </span>

                <strong>
                  ₹
                  {Number(
                    summary.totalSpent
                  ).toFixed(2)}
                </strong>

              </div>

            </div>


            <div className="yearly-stat-card">

              <div className="stat-icon">
                🧾
              </div>

              <div>

                <span>
                  Total Transactions
                </span>

                <strong>
                  {summary.totalTransactions}
                </strong>

              </div>

            </div>


            <div className="yearly-stat-card">

              <div className="stat-icon">
                📊
              </div>

              <div>

                <span>
                  Average Monthly Expense
                </span>

                <strong>
                  ₹
                  {Number(
                    summary.averageMonthlyExpense
                  ).toFixed(2)}
                </strong>

              </div>

            </div>


          </div>


          {/* MONTHLY OVERVIEW */}

          <div className="yearly-spending-section">


            <div className="section-title-row">

              <div>

                <span className="section-label">
                  MONTHLY BREAKDOWN
                </span>

                <h3>
                  📈 Month-wise Spending
                </h3>

              </div>

            </div>


            {monthData.length === 0 ? (

              <div className="premium-empty-state">

                <div className="empty-icon">
                  📊
                </div>

                <h3>
                  No spending data found
                </h3>

                <p>
                  Your monthly spending data
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="yearly-month-grid">

                {monthData.map(
                  ([monthName, amount]) => {

                    const numericAmount =
                      Number(amount);

                    const percentage =
                      maxAmount > 0
                        ? (
                            numericAmount /
                            maxAmount
                          ) * 100
                        : 0;


                    return (

                      <div
                        className="yearly-month-card"
                        key={monthName}
                      >


                        <div className="yearly-month-top">

                          <span className="month-name">

                            {monthName.slice(
                              0,
                              3
                            )}

                          </span>


                          <strong>

                            ₹
                            {numericAmount.toFixed(2)}

                          </strong>

                        </div>


                        <div className="month-mini-bar">

                          <div
                            className="month-mini-bar-fill"
                            style={{
                              width:
                                `${percentage}%`
                            }}
                          />

                        </div>


                      </div>

                    );

                  }
                )}

              </div>

            )}


          </div>


        </>

      )}


      {!loading && !summary && (

        <div className="premium-empty-state">

          <div className="empty-icon">
            📅
          </div>

          <h3>
            No yearly data available
          </h3>

          <p>
            Start adding expenses to view
            your yearly financial summary.
          </p>

        </div>

      )}


    </div>

  );

}


export default YearlySummary;