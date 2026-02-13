import { getCSRFToken } from "../utils/csrf";

const API = import.meta.env.VITE_BACKEND_URL;

export const loginRequest = (data) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { 
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
     },
    body: JSON.stringify(data),
  });

export const getMeRequest = () =>
  fetch(`${API}/auth/me`, {
    credentials: "include",
  });

export const logoutRequest = () =>
  fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": getCSRFToken(),
    },
  });

export const registerRequest = (data) =>
  fetch(`${API}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify(data),
  });

export const validateRequest = (token) =>
  fetch(`${API}/auth/validar-usuario`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify(token),
  });

  //   const res = await fetch(
  //   `${import.meta.env.VITE_BACKEND_URL}/validar-usuario`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include", // 🔥 MUY IMPORTANTE
  //     body: JSON.stringify({ token }),
  //   }
  // );