
import axios, { AxiosHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ENV from "@/config/env";

const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token automatically
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      config.headers = AxiosHeaders.from(config.headers);

      if (token && token.trim()) {
        config.headers.set(
          "Authorization",
          `Bearer ${token.trim()}`
        );
      } else {
        config.headers.delete("Authorization");

        if (
          config.url?.startsWith("/video/") ||
          config.url?.startsWith("/notes")
        ) {
          return Promise.reject(
            new Error("Please log in to access your videos and notes.")
          );
        }
      }

      return config;
    } catch (error) {
      console.error("Unable to retrieve access token:", error);
      return Promise.reject(error);
    }
  },
  async (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("API Success:", {
      url: response.config.url,
      status: response.status,
    });

    return response;
  },
  async (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    if (
      error.response?.status === 401 &&
      (error.config?.url?.startsWith("/video/") ||
        error.config?.url?.startsWith("/notes"))
    ) {
      console.error("401: Authentication failed. Check the JWT token.");
      try {
        await AsyncStorage.removeItem("accessToken");
      } catch (storageError) {
        console.error("Unable to clear invalid access token:", storageError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
