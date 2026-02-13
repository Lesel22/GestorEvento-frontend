import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";


export default function ValidarUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { validateUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/error");
      return;
    }

    const handleValidation = async () => {
      try {
        await validateUser(token);
        navigate("/inicio");
      } catch (err) {
        console.error(err);
        navigate("/error");
      }
    };

    handleValidation();
  }, [location, navigate, validateUser]);

  return <p>Validando cuenta, por favor espera...</p>;
}
