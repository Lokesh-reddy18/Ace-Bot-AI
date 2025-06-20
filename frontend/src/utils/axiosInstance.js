import axios from "axios";
import toast from "react-hot-toast";
import { BASIC_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASIC_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 400) {
        // Redirect to login page
        window.location.href = "/";
      } else if (error.response.status === 500) {
        toast.error("Server Error. Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
