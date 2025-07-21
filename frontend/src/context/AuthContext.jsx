import { createContext, useContext, useState } from "react";
import { showError, showSuccess } from "../utils/helpers";
import { useNavigate } from "react-router";
import api from "../utils/axios.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  api.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.token)
      config.headers.Authorization = `Bearer ${userData.token}`;
    return config;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    showSuccess("Logged in successfully!");
    navigate("/dashboard");
  };

  const register = async (username, email, password) => {
    const { data } = await api.post("/auth/register", {
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
    <AuthContext.Provider value={{ user, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
