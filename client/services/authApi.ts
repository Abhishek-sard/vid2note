
import api from "./api";

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Register
const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
};

// Login
const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

// Logout
const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Get current user
const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
