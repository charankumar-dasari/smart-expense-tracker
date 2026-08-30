import { useEffect, useState } from "react";

import {
  getMonthlySummary,
  getYearlySummary
} from "../services/summaryService";

function AnalyticsDashboard() {

  const currentDate = new Date();

  const [month, setMonth] =
    useState(currentDate.getMonth() + 1);

  const [year, setYear] =
    useState(currentDate.getFullYear());

  const [monthlySummary, setMonthlySummary] =
    useState(null);

  const [yearlySummary, setYearlySummary] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  const loadAnalytics = async () => {

    try {

      setLoading(true);

      const [
        monthlyResponse,
        yearlyResponse
      ] = await Promise.all([

        getMonthlySummary(month, year),

        getYearlySummary(year)

      ]);

      setMonthlySummary(
        monthlyResponse.data
      );

      setYearlySummary(
        yearlyResponse.data
      );

    } catch (error) {

      console.error(error);

      setMonthlySummary(null);

      setYearlySummary(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAnalytics();

  }, [month, year]);

  const getHighestCategory = () => {

    if (
      !monthlySummary ||
      !monthlySummary.categoryWiseSpending
    ) return null;

    const entries =
      Object.entries(
        monthlySummary.categoryWiseSpending
      );

    if (!entries.length) return null;

    return entries.reduce(
      (highest, current) =>
        Number(current[1]) >
        Number(highest[1])
          ? current
          : highest
    );

  };

  const getHighestMonth = () => {

    if (
      !yearlySummary ||
      !yearlySummary.monthlySpending
    ) return null;

    const entries =
      Object.entries(
        yearlySummary.monthlySpending
      );

    if (!entries.length) return null;

    return entries.reduce(
      (highest, current) =>
        Number(current[1]) >
        Number(highest[1])
          ? current
          : highest
    );

  };

  const highestCategory =
    getHighestCategory();

  const highestMonth =
    getHighestMonth();

  const monthlyData =
    yearlySummary?.monthlySpending
      ? Object.entries(
          yearlySummary.monthlySpending
        )
      : [];

  const maxMonthlyAmount =
    Math.max(
      ...monthlyData.map(
        ([, amount]) => Number(amount)
      ),
      1
    );

  return (

    <div className="analytics-dashboard">

      <div className="analytics-page-header">

        <span className="section-label">
          FINANCIAL INSIGHTS
        </span>

        <h2>
          Reports & Analytics
        </h2>

        <p>
          Understand your spending patterns
          and financial activity.
        </p>

      </div>

      <div className="analytics-filter-card">

        <div className="summary-filters">

          <select
            value={month}
            onChange={(e) =>
              setMonth(
                Number(e.target.value)
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
            min="2020"
            onChange={(e) =>
              setYear(
                Number(e.target.value)
              )
            }
          />

        </div>

      </div>

      {loading && (

        <div className="analytics-loading">

          Loading analytics...

        </div>

      )}

      {!loading &&
        monthlySummary &&
        yearlySummary && (

        <>

          <section className="analytics-section">

            <div className="analytics-section-header">

              <div>

                <span className="section-label">
                  PERFORMANCE
                </span>

                <h3>
                  Spending Insights
                </h3>

              </div>

            </div>

            <div className="analytics-insights-grid">

              <div className="insight-card">

                <span>
                  Highest Category
                </span>

                <strong>

                  {highestCategory
                    ? highestCategory[0]
                    : "No Data"}

                </strong>

              </div>

              <div className="insight-card">

                <span>
                  Category Amount
                </span>

                <strong>

                  ₹
                  {highestCategory
                    ? Number(
                        highestCategory[1]
                      ).toFixed(2)
                    : "0.00"}

                </strong>

              </div>

              <div className="insight-card">

                <span>
                  Highest Month
                </span>

                <strong>

                  {highestMonth
                    ? highestMonth[0]
                    : "No Data"}

                </strong>

              </div>

              <div className="insight-card">

                <span>
                  Highest Month Amount
                </span>

                <strong>

                  ₹
                  {highestMonth
                    ? Number(
                        highestMonth[1]
                      ).toFixed(2)
                    : "0.00"}

                </strong>

              </div>

            </div>

          </section>

          <section className="analytics-section">

            <h3>
              Category-wise Analysis
            </h3>

            <div className="category-analysis-grid">

              {Object.entries(
                monthlySummary.categoryWiseSpending
              ).map(
                ([category, amount]) => {

                  const percentage =
                    monthlySummary.totalSpent > 0
                      ? (
                          Number(amount) /
                          Number(
                            monthlySummary.totalSpent
                          )
                        ) * 100
                      : 0;

                  return (

                    <div
                      className="category-analysis-card"
                      key={category}
                    >

                      <div className="category-analysis-top">

                        <strong>
                          {category}
                        </strong>

                        <strong>

                          ₹
                          {Number(
                            amount
                          ).toFixed(2)}

                        </strong>

                      </div>

                      <div className="analytics-progress-container">

                        <div
                          className="analytics-progress-bar"
                          style={{
                            width:
                              `${Math.min(
                                percentage,
                                100
                              )}%`
                          }}
                        />

                      </div>

                      <span>

                        {percentage.toFixed(1)}%
                        {" "}of monthly spending

                      </span>

                    </div>

                  );

                }
              )}

            </div>

          </section>

          <section className="analytics-section chart-section">

            <div className="chart-header">

              <div>

                <span className="section-label">
                  YEARLY OVERVIEW
                </span>

                <h3>
                  Yearly Spending Trend
                </h3>

              </div>

              <span className="chart-year">

                {year}

              </span>

            </div>

            <div className="yearly-chart">

              {monthlyData.map(
                ([monthName, amount]) => {

                  const value =
                    Number(amount);

                  const height =
                    (value / maxMonthlyAmount) *
                    100;

                  return (

                    <div
                      className="chart-bar-column"
                      key={monthName}
                    >

                      <div className="chart-value">

                        ₹{value.toFixed(0)}

                      </div>

                      <div className="chart-bar-track">

                        <div
                          className="chart-bar"
                          style={{
                            height:
                              `${height}%`
                          }}
                        />

                      </div>

                      <span>

                        {monthName.substring(
                          0,
                          3
                        )}

                      </span>

                    </div>

                  );

                }
              )}

            </div>

          </section>

          <section className="analytics-section">

            <h3>
              Yearly Summary
            </h3>

            <div className="analytics-insights-grid yearly-summary-cards">

              <div className="insight-card">

                <span>
                  Total Spending
                </span>

                <strong>

                  ₹
                  {Number(
                    yearlySummary.totalSpent
                  ).toFixed(2)}

                </strong>

              </div>

              <div className="insight-card">

                <span>
                  Transactions
                </span>

                <strong>

                  {yearlySummary.totalTransactions}

                </strong>

              </div>

              <div className="insight-card">

                <span>
                  Average Monthly
                </span>

                <strong>

                  ₹
                  {Number(
                    yearlySummary.averageMonthlyExpense
                  ).toFixed(2)}

                </strong>

              </div>

            </div>

          </section>

        </>

      )}

    </div>

  );

}

export default AnalyticsDashboard;