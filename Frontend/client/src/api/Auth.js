import axios from "axios";
import Base_Url from '../api/Base_Url'
// const API_URL = "http://localhost:5000/api/student"; // change if needed
const API_URL = `${Base_Url}/student`; // change if needed
// console.log('api url',API_URL);

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
