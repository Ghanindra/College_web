import axios from "axios";

const API_URL = "http://localhost:5000/api/student"; // change if needed

// Register user/admin
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// Login user/admin
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  // returns { token }
  return res.data;
};
