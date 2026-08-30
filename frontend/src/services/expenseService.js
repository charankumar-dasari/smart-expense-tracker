import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/expenses`;

export const getExpenses = () => axios.get(API_URL);

export const getExpenseById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createExpense = (expense) =>
  axios.post(API_URL, expense);

export const updateExpense = (id, expense) =>
  axios.put(`${API_URL}/${id}`, expense);

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const searchExpenses = (keyword) =>
  axios.get(`${API_URL}/search?keyword=${keyword}`);

export const getExpensesByCategory = (category) =>
  axios.get(`${API_URL}/category/${category}`);