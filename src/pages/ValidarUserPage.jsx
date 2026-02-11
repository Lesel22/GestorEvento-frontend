import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";


export default function ValidarUserPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtener token del query string
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/error"); // Token no encontrado
      return;
    }

    // POST al backend para validar
    fetch(`${import.meta.env.VITE_BACKEND_URL}/validar-usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (!res.ok) {
          // Manejar errores
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al validar");
        }
        return res.json();
      })
      .then((data) => {
        // Guardar JWT en localStorage para login automático
        localStorage.setItem("AUTH", JSON.stringify(data.token));

        // Redirigir al dashboard o página principal
        navigate("/inicio");
      })
      .catch((err) => {
        console.error(err);
        navigate("/error"); // Token inválido, expirado o cualquier otro error
      });

  }, [location, navigate]);

  return <p>Validando cuenta, por favor espera...</p>;
}
