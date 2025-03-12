import axiosDefault, { AxiosError } from "axios";

export const AXIOS_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
};

const axiosInstance = axiosDefault.create(AXIOS_CONFIG);

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Basic " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    // Clear the message after 2 seconds
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
    }, 2000);

    throw error;
  }
);

export const axios = axiosInstance;
