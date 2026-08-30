import axios from "axios";

const API_URL = "http://localhost:8080/api/members";

export const getMembers = () => {
  return axios.get(API_URL);
};

export const createMember = (member) => {
  return axios.post(API_URL, member);
};

export const deleteMember = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};