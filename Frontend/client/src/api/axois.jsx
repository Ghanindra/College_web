import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { Authorization: token },
});

export default instance;
