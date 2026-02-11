import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router";

const RoleValidation = ({ role }) => {
  const { user } = useAuth();

  // Si no hay usuario o el rol no coincide, redirigir
  if (!user) return <Navigate to="/" replace />;

  // Usuario autorizado, renderizar las rutas hijas
  return <Outlet />;
};

export default RoleValidation;
