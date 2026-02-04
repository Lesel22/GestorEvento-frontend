import { Link, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"

const LayoutOrganizer = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth()
  const ref = useRef(null);

  const handleLogout = () => {
    // borrar el LS, con la funcion logout del custom hook useAuth
    logout()
    // Redirigir al usuario al login
    navigate('/')
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className=" w-full flex flex-col items-center px-4 " >
        <div className=" relative w-full flex flex-row justify-between py-4 items-center ">
          <Link to="/eventos">
            <h1 className="  font-playfair font-bold text-[2.5rem] ">Calenda</h1>
          </Link>
          <div className="hidden lg:w-full lg:flex lg:justify-between">
            <div className="flex flex-row justify-around w-full items-center text-2xl font-bold font-playfair ">
              <Link to="/misEventos" onClick={() => setOpen(false)}>Inicio</Link>
              <Link to="/misEventos" onClick={() => setOpen(false)}>Mis Eventos</Link>
              <Link to="/misEventos" onClick={() => setOpen(false)}>Participaciones</Link>
            </div>
            <div className="flex flex-row text-2xl items-center gap-2 px-2 font-bold font-playfair  text-center">
              <span>{user?.nombre}</span>
              <button
                className=" text-red-500 text-center"
                onClick={handleLogout}
                >
                Logout
              </button>
            </div>
          </div>
          <div className="lg:hidden " ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className=" px-2 py-2 rounded  "
            >
              <img src= {`${import.meta.env.BASE_URL}icons/${open ? "x" : "menu"}.svg`} />
            </button>
            {open && (
              <div className=" absolute top-[104%] left-0 w-full z-50 " >
                <div className=" bg-white shadow-xl border border-[#777777] text-center text-[1.5rem]">
                  <div className="flex flex-col justify-around w-full py-4 gap-2 font-bold font-playfair ">
                    <Link to="/misEventos" onClick={() => setOpen(false)}>Inicio</Link>
                    <Link to="/misEventos" onClick={() => setOpen(false)}>Mis Eventos</Link>
                    <Link to="/misEventos" onClick={() => setOpen(false)}>Participaciones</Link>
                  </div>

                  <div className="w-full py-0.5 bg-[#777777]"></div>

                  <div className="flex flex-col justify-around w-full py-4 gap-2 font-bold font-playfair  text-center">
                    <span>{user?.nombre}</span>
                    <button
                      className=" text-red-500 text-center"
                      onClick={handleLogout}
                      >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mx-auto rounded-[15px] h-1 bg-[#777777]"></div>
      </header>

      <Outlet />

    </>
  )
}

export default LayoutOrganizer