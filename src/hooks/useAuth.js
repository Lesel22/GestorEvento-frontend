import { useState } from "react"

export const useAuth = () => {
  const [user, setUser] = useState(
    () => {
      return JSON.parse(localStorage.getItem('AUTH')) ?? null
    }
  )

  const isAuth = Boolean(user?.access) // Verificamos si el usuario está logueado

  const setAuth = (data) => {
    setUser(data)

    localStorage.setItem('AUTH', JSON.stringify(data))
  }

  const logout = () => localStorage.removeItem('AUTH')

  return {
    user,
    isAuth,
    setAuth,
    logout
  }
}