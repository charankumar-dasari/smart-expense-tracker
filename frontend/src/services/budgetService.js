import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/budgets`;

export const createOrUpdateBudget = (budget) =>
  axios.post(API_URL, budget);

export const getBudgetSummary = (month, year) =>
  axios.get(
    `${API_URL}/summary?month=${month}&year=${year}`
  );

export const deleteBudget = (id) =>
  axios.delete(`${API_URL}/${id}`);