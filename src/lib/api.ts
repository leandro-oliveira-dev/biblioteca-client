import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const setupAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

setupAuthHeader();

export { api };
