import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  getMeRequest,
  logoutRequest,
  validateRequest
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

const validateUser = async (token) => {
  const res = await validateRequest(token)

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al validar cuenta");
  }

  await checkAuth();
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
      value={{ user, isAuthenticated, loading, login, logout, validateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
