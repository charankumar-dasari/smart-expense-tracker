
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


  const loadAnalytics = async () => {

    try {

      setLoading(true);

      const [
        monthlyResponse,
        yearlyResponse
      ] = await Promise.all([

        getMonthlySummary(
          month,
          year
        ),

        getYearlySummary(
          year
        )

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
    ) {

      return null;

    }

    const entries = Object.entries(
      monthlySummary.categoryWiseSpending
    );

    if (entries.length === 0) {

      return null;

    }

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
    ) {

      return null;

    }

    const entries = Object.entries(
      yearlySummary.monthlySpending
    );

    if (entries.length === 0) {

      return null;

    }

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


  return (

    <div className="card analytics-dashboard">

      <h2>
        📊 Reports & Analytics
      </h2>


      {/* FILTERS */}

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


      {loading && (

        <p>
          Loading analytics...
        </p>

      )}


      {!loading &&
        monthlySummary &&
        yearlySummary && (

        <>


          {/* KEY INSIGHTS */}

          <h3>
            💡 Spending Insights
          </h3>


          <div className="analytics-grid">


            <div className="summary-item">

              <span>
                Highest Spending Category
              </span>

              <strong>

                {highestCategory
                  ? highestCategory[0]
                  : "No Data"}

              </strong>

            </div>


            <div className="summary-item">

              <span>
                Highest Category Amount
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


            <div className="summary-item">

              <span>
                Highest Spending Month
              </span>

              <strong>

                {highestMonth
                  ? highestMonth[0]
                  : "No Data"}

              </strong>

            </div>


            <div className="summary-item">

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


          {/* CATEGORY ANALYSIS */}

          <h3>
            🏷️ Category-wise Analysis
          </h3>


          <div className="analytics-list">

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
                    className="analytics-item"
                    key={category}
                  >

                    <div>

                      <strong>
                        {category}
                      </strong>

                      <p>

                        ₹
                        {Number(
                          amount
                        ).toFixed(2)}

                        {" · "}

                        {percentage.toFixed(1)}%

                      </p>

                    </div>


                    <div
                      className="analytics-progress-container"
                    >

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

                  </div>

                );

              }
            )}

          </div>


          {/* YEARLY MONTH ANALYSIS */}

          <h3>
            📈 Yearly Spending Trend
          </h3>


          <div className="analytics-list">

            {Object.entries(
              yearlySummary.monthlySpending
            ).map(
              ([monthName, amount]) => {

                const percentage =
                  yearlySummary.totalSpent > 0

                    ? (
                        Number(amount) /
                        Number(
                          yearlySummary.totalSpent
                        )
                      ) * 100

                    : 0;


                return (

                  <div
                    className="analytics-item"
                    key={monthName}
                  >

                    <div>

                      <strong>
                        {monthName}
                      </strong>

                      <p>

                        ₹
                        {Number(
                          amount
                        ).toFixed(2)}

                      </p>

                    </div>


                    <div
                      className="analytics-progress-container"
                    >

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

                  </div>

                );

              }
            )}

          </div>


        </>

      )}

    </div>

  );

}


export default AnalyticsDashboard;
