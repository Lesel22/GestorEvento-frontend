import { Link, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"

const LayoutHome = () => {

  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
        <div className=" relative w-full flex flex-row justify-between py-4 px-2 items-center ">
          <Link to="/eventos">
            <h1 className="  font-playfair font-bold text-[2.5rem] ">Calenda</h1>
          </Link>
          <div className="hidden lg:flex">
            <div className="flex flex-row justify-around w-full items-center text-2xl font-bold font-playfair gap-4">
              <Link className="h-12.5 w-37.5 border border-[#777777] rounded-[15px] font-bold text-[#777777] flex items-center justify-center" to="/login" onClick={() => setOpen(false)}>Log in</Link>
              <Link className="h-12.5 w-37.5 border border-[#777777] bg-[#777777] rounded-[15px] font-bold text-white flex items-center justify-center"  to="/register" onClick={() => setOpen(false)}>Sign up</Link>
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
                  <div className="flex flex-col justify-around w-full font-bold font-playfair ">
                    <Link className="bg-white text-[#777777] p-3" to="/login" onClick={() => setOpen(false)}>Log in</Link>
                    <Link className="bg-[#777777] text-white p-3" to="/register" onClick={() => setOpen(false)}>Sign up</Link>
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

export default LayoutHome