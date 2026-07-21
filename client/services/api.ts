import axios from "axios";
import ENV from "@/config/env";


import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
    baseURL: ENV.API_URL,
    timeout: 30000,
    headers:{
        "Content-Type": "application/json"
    }
});

//Attach token automatically

api.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem(
            "accessToken"
        );

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log("API Request:", {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
        });
        
        return config;
    },

    error => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error Details:", {
            message: error.message,
            code: error.code,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            status: error.response?.status,
            data: error.response?.data,
        });
        
        // Enhance error message
        if (error.code === 'ECONNREFUSED') {
            error.message = `Cannot connect to server at ${error.config?.baseURL}. Make sure the backend is running.`;
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            error.message = 'Request timeout. Server may be unresponsive.';
        } else if (error.message === 'Network Error') {
            error.message = `Network Error: Cannot reach ${error.config?.baseURL}. Check if server is running and your network connection.`;
        }
        
        return Promise.reject(error);
    }
);

export default api;