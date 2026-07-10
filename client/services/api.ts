import axios from "axios";
import ENV from "@/config/env";


import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
    baseURL: ENV.API_URL,
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
        return config;
    },

    error=> Promise.reject(error)
);

export default api;