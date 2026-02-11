import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  getMeRequest,
  logoutRequest,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (data) => {
    const res = await loginRequest(data);

    if (!res.ok) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const result = await res.json();
    setUser(result.user);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const res = await getMeRequest();
      const data = await res.json();

      if (data.id) {
        setUser(data);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
