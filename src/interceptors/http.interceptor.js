import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.jwt = `Bearer ${token}`;
      console.log(config);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
