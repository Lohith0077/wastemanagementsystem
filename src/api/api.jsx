import axios from "axios";

// 1. Create the instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Automatically attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Inject the Bearer token into every request
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 (Unauthorized), the token is likely invalid or expired
    if (error.response && error.response.status === 401) {
      console.error("Session expired. Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login (Note: window.location is a 'brute force' way, but effective)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
