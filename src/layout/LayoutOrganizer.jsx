import { Link, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

const LayoutOrganizer = () => {
  const navigate = useNavigate()

  const { logout, user } = useAuth()

  const handleLogout = () => {
    // borrar el LS, con la funcion logout del custom hook useAuth
    logout()
    // Redirigir al usuario al login
    navigate('/')
  }

  return (
    <>
      <header className="w-full min-w-5xl flex items-center flex-col mx-auto px-5 " >

        <div className=" flex w-full mx-auto justify-between py-6 px-8 items-center ">
          {/* <div className="flex w-full mx-auto items-center justify-between border"> */}
            
            {/* TÍTULO */}
            <Link to="/eventos">
              <h1 className="  font-playfair font-bold text-[40px] ">Calenda</h1>
            </Link>

            {/* NAV (centrado, enlaces distribuidos) */}

              <div className="hidden justify-around w-full min-w-[500px] px-6 font-bold font-playfair text-[24px] lg:flex">
                <Link to="/misEventos">Inicio</Link>
                <Link to="/misEventos">Mis Eventos</Link>
                <Link to="/misEventos">Participantes</Link>
              </div>



            {/* PERFIL */}
            <div className=" text-[24px] flex gap-2 items-center ">
              <span>{user?.nombre}</span>
              <button
                className="bg-red-300 text-red-500 rounded-lg"
                onClick={handleLogout}
                >
                Logout
              </button>
            </div>

          {/* </div> */}
          
        </div>
        <div className="w-full mx-auto rounded-[15px] h-1 bg-[#777777]"></div>

      
      </header>





      <main className="my-6">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutOrganizer