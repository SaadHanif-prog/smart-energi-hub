import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, 
});

export const apiClientWithoutAuth = axios.create({
  baseURL: "/api/v1",
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 → try refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await apiClient.post("/auth/refresh");
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 → logout immediately
    if (error.response?.status === 403) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
