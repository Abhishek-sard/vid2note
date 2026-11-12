
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

const TOKEN_KEY = "accessToken";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  isAuthenticated: false,

  // LOGIN
  login: async (email, password) => {
    try {
      set({ loading: true });

      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!data.success || !data.accessToken || !data.user) {
        throw new Error("Login response does not contain a valid access token.");
      }

      // Save token before updating authenticated state
      await AsyncStorage.setItem(
        TOKEN_KEY,
        data.accessToken
      );

      const savedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (!savedToken) {
        throw new Error("Unable to save authentication token.");
      }

      set({
        user: data.user,
        token: savedToken,
        isAuthenticated: true,
        loading: false,
      });

      console.log("Login successful. Token saved:", Boolean(savedToken));

    } catch (error) {
      set({
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      });

      await AsyncStorage.removeItem(TOKEN_KEY);

      throw error;
    }
  },

  // REGISTER
  register: async (name, email, password) => {
    try {
      set({ loading: true });

      const data = await registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (!data.success || !data.accessToken || !data.user) {
        throw new Error("Registration response does not contain a valid access token.");
      }

      await AsyncStorage.setItem(
        TOKEN_KEY,
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

  // LOGOUT
  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      await AsyncStorage.removeItem(TOKEN_KEY);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  // LOAD EXISTING SESSION
  loadUser: async () => {
    try {
      set({ loading: true });

      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });

        return;
      }

      const data = await getMe();

      if (!data.success || !data.user) {
        throw new Error("Unable to verify current user.");
      }

      set({
        user: data.user,
        token,
        isAuthenticated: true,
        loading: false,
      });

    } catch (error) {
      console.error("Session loading failed:", error);

      await AsyncStorage.removeItem(TOKEN_KEY);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export { useAuthStore };
