import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const RoleValidation = ({ role }) => {
  const { user } = useAuth();

  // Si no hay usuario o el rol no coincide, redirigir
  if (!user) return <Navigate to="/" replace />;
  if (String(user.tipo_usuario) !== String(role)) return <Navigate to="/" replace />;

  // Usuario autorizado, renderizar las rutas hijas
  return <Outlet />;
};

export default RoleValidation;


// import { useEffect } from "react"
// import { useAuth } from "../hooks/useAuth"
// import { Navigate, Outlet, useNavigate } from "react-router"

// const RoleValidation = ({ role }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/');
//       return;
//     }

//     if (user.tipo_usuario !== role) {
//       navigate('/'); // manejo de autorizacion
//     }
//   }, [user]);

//   return <Outlet />;
// };

// export default RoleValidation;

// const RoleValidation = ({role}) => {
//   const { user, isAuth } = useAuth()
//   console.log(user)
//   console.log(isAuth)

//   const navigate = useNavigate()

//   useEffect(() => {
//     console.log(isAuth)
//     console.log(user.tipo_usuario)
//     console.log(role)
//     if (!user) return <Navigate to="/login" replace />;

//     if (user.tipoUsuario !== role) return <Navigate to="/unauthorized" replace />;
//     // if (!isAuth || user.tipoUsuario !== role) {

//     //     navigate('/')
//     // }

//   }, [isAuth])

//   return <Outlet />
// }

// export default RoleValidation