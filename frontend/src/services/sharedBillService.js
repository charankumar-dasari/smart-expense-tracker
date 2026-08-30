import axios from "axios";

const API_URL =
  "http://localhost:8080/api/shared-bills";

export const createSharedBill = (bill) => {
  return axios.post(API_URL, bill);
};

export const getSharedBills = () => {
  return axios.get(API_URL);
};

export const getBillSplit = (id) => {
  return axios.get(
    `${API_URL}/${id}/split`
  );
};

export const getSettlements = (id) => {
  return axios.get(
    `${API_URL}/${id}/settlements`
  );
};

export const deleteSharedBill = (id) => {
  return axios.delete(
    `${API_URL}/${id}`
  );
};
export const updateSharedBill = (id,bill) => {

  return axios.put(`${API_URL}/${id}`,
    bill
  );
};