
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

      console.log("========== AUTH DEBUG ==========");
      console.log("Request URL:", config.url);
      console.log("Request Method:", config.method);
      console.log("Token exists:", Boolean(token));
      console.log("Token length:", token?.length || 0);

      if (token && token.trim()) {
        config.headers.set(
          "Authorization",
          `Bearer ${token.trim()}`
        );

        console.log("Authorization header attached: YES");
      } else {
        config.headers.delete("Authorization");

        console.log("Authorization header attached: NO");
      }

      console.log("Base URL:", config.baseURL);
      console.log("================================");

      return config;
    } catch (error) {
      console.error("Unable to retrieve access token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
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
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.error("401: Authentication failed. Check the JWT token.");
    }

    return Promise.reject(error);
  }
);

export default api;
