import axios from "axios";
import { appStorage } from "./storage";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const setupAuthHeader = () => {
  const token = appStorage.getItem("token");

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

setupAuthHeader();

export { api };
