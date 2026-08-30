
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/summary`;


/* =========================
   MONTHLY SUMMARY
========================= */

export const getMonthlySummary =
  (month, year) => {

    return axios.get(
      `${API_URL}/monthly`,
      {
        params: {
          month,
          year
        }
      }
    );

  };


/* =========================
   YEARLY SUMMARY
========================= */

export const getYearlySummary =
  (year) => {

    return axios.get(
      `${API_URL}/yearly`,
      {
        params: {
          year
        }
      }
    );

  };

