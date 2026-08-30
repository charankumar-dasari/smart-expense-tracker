
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/recurring-expenses`;


export const getRecurringExpenses =
  () => {

    return axios.get(
      API_URL
    );

  };


export const getActiveRecurringExpenses =
  () => {

    return axios.get(
      `${API_URL}/active`
    );

  };


export const getRecurringExpenseById =
  (id) => {

    return axios.get(
      `${API_URL}/${id}`
    );

  };


export const createRecurringExpense =
  (expense) => {

    return axios.post(
      API_URL,
      expense
    );

  };


export const updateRecurringExpense =
  (
    id,
    expense
  ) => {

    return axios.put(
      `${API_URL}/${id}`,
      expense
    );

  };


export const toggleRecurringExpense =
  (id) => {

    return axios.patch(
      `${API_URL}/${id}/toggle`
    );

  };


export const deleteRecurringExpense =
  (id) => {

    return axios.delete(
      `${API_URL}/${id}`
    );

  };

