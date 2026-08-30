import axios from "axios";

const API_URL = "http://localhost:8080/api/budgets";

export const createOrUpdateBudget = (budget) =>
  axios.post(API_URL, budget);

export const getBudgetSummary = (month, year) =>
  axios.get(
    `${API_URL}/summary?month=${month}&year=${year}`
  );

export const deleteBudget = (id) =>
  axios.delete(`${API_URL}/${id}`);