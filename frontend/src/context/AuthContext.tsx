import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData, RegistrationFormData } from "../types";
import { axiosInstance } from "../lib/axios";

interface AuthContextType {
  login: (data: LoginFormData) => Promise<void>;
  registerUser: (data: RegistrationFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const resonse = await axiosInstance.post("/users/login", data);
      localStorage.setItem("token", resonse.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (data: RegistrationFormData) => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/users/register", {
        ...data,
        role: "ADMIN",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, registerUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
