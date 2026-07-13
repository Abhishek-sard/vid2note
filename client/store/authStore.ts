import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "@/services/authApi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

 const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      set({ loading: true });

      const data = await loginUser({
        email,
        password,
      });

      await AsyncStorage.setItem(
        "accessToken",
        data.accessToken
      );

      set({
        user: data.user,
        token: data.accessToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true });

      const data = await registerUser({
        name,
        email,
        password,
      });

      await AsyncStorage.setItem(
        "accessToken",
        data.accessToken
      );

      set({
        user: data.user,
        token: data.accessToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutUser();

      await AsyncStorage.removeItem("accessToken");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.log(error);
    }
  },

  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem(
        "accessToken"
      );

      if (!token) return;

      const data = await getMe();

      set({
        user: data.user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export {useAuthStore};