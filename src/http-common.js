import axios from "axios";
const access_token = localStorage.getItem("access_token");

export default axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    access_token: access_token,
  },
});
