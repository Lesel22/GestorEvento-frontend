import { Link, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"
import Icon from "../utils/Icon";

const LayoutUser = () => {
  const navigate = useNavigate()


  const [open, setOpen] = useState(false);

  const { logout, user } = useAuth()
  const [abierto, setAbierto] = useState(false);
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
        console.log('abierto')
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full flex flex-col items-center px-4 " >

        <div className=" relative w-full flex flex-row justify-between py-4 items-center ">
          <Link to="/eventos">
            <h1 className="  font-playfair font-bold text-[40px] ">Calenda</h1>
          </Link>

          <div className=" " ref={ref}>


          {/* Botón */}
          <button
            onClick={() => setOpen(!open)}
            className="  px-2 py-2 rounded "
            >
            <Icon name={open ? "x" : "menu"} />
          </button>

         
          {/* Overlay + menú */}
          {open && (
            <div className="px-2 absolute top-full left-0 w-full z-50" >

              

              {/* Menú deslizable */}
              <div className=" bg-white shadow-xl p-4 border rounded-[15px] text-center text-[20px]">
              

                <div className="flex flex-col justify-around w-full p-2 font-bold font-playfair ">
                    <Link to="/inicio" onClick={() => setOpen(false)}>Inicio</Link>
                    <Link to="/eventos" onClick={() => setOpen(false)}>Eventos</Link>
                    <Link to="/inscripciones" onClick={() => setOpen(false)}>Inscripciones</Link>
                  </div>

                  <div className="w-full py-0.5 bg-[#777777]"></div>

                  <div className="flex flex-col justify-around w-full p-2 font-bold font-playfair  text-center">
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

            {/* <div className=" flex-row justify-between relative inline-block sm:hidden " ref={ref}>
              <button
                onClick={() => setAbierto(!abierto)}
                className=" px-4 py-2 text-white rounded "
              >
                <Icon name="delete" />
              </button>

              {abierto && (
                <div className="absolute px-2 bg-white border rounded shadow-lg w-40 z-1 ">
                  <div className="flex flex-col justify-around w-full p-2 font-bold font-playfair text-[16px]">
                    <Link to="/inicio">Inicio</Link>
                    <Link to="/eventos">Eventos</Link>
                    <Link to="/inscripciones">Inscripciones</Link>
                  </div>

                  <div className="w-full py-0.5 bg-[#777777]"></div>

                  <div className="flex flex-col justify-around w-full p-2 font-bold font-playfair text-[16px] lg:flex">
                    <span>{user?.nombre}</span>
                    <button
                      className=" text-red-500 text-left"
                      onClick={handleLogout}
                      >
                      Logout
                    </button>
                  </div>
                </div>
              )}



              <div className="hidden">
                <div className="hidden justify-around w-full min-w-[500px] px-6 font-bold font-playfair text-[24px] sm:flex">
                  <Link to="/inicio">Inicio</Link>
                  <Link to="/eventos">Eventos</Link>
                  <Link to="/inscripciones">Inscripciones</Link>
                </div>

                <div className=" text-[24px] flex gap-2 items-center ">
                  <span>{user?.nombre}</span>
                  <button
                    className="bg-red-300 text-red-500 rounded-lg"
                    onClick={handleLogout}
                    >
                    Logout
                  </button>
                </div>

              </div>

            </div> */}



    
          
        </div>
        <div className="w-full mx-auto rounded-[15px] h-1 bg-[#777777]"></div>

      
      </header>





      <main className="my-6">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutUser