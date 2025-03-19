import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.BACKEND_BASE_URL ||
    "https://dev-casino-backend-production.up.railway.app:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization token
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("Authorization");
    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Function to set or remove auth token
export const setAuthToken = (token?: string): void => {
  if (token) {
    localStorage.setItem("Authorization", token);
    axiosInstance.defaults.headers.common["Authorization"] = token;
  } else {
    localStorage.removeItem("Authorization");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
