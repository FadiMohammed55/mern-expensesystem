import { createContext, useContext, useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../utils/helpers";
import { useNavigate } from "react-router";

const BASE_URL = "http://localhost:5000/api";

const axiosPublic = axios.create({ baseURL: BASE_URL });
const authAxios = axios.create({ baseURL: BASE_URL });

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  authAxios.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.token)
      config.headers.Authorization = `Bearer ${userData.token}`;
    return config;
  });

  const login = async (email, password) => {
    const { data } = await axiosPublic.post("/auth/login", { email, password });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    showSuccess("Logged in successfully!");
    navigate("/dashboard");
  };

  const register = async (username, email, password) => {
    const { data } = await axiosPublic.post("/auth/register", {
      username,
      email,
      password,
    });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    showSuccess("Registered successfully!");
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showSuccess("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
