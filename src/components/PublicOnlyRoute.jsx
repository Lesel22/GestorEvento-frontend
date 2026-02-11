import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router"

const PublicOnyRoute = () => {
  const {isAuthenticated, loading} = useAuth()

  if (loading) {
    return null; // o un spinner
  }

  if (isAuthenticated) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />
}

export default PublicOnyRoute