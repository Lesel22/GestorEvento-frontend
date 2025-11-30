import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router"
import { loginUser } from "../services/auth";

const LOGIN_URL = "http://127.0.0.1:8000/login";

const LoginPage = () => {
  const { user, isAuth, setAuth } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      // Redireccionamos al login
      if (user.tipo_usuario === "2") { //user.tipo_usuario es null, setAuth no funciona?
        navigate("/misEventos");
      } else {
        navigate("/eventos");
      }
    }

  }, [isAuth])

  const [form, setForm] = useState({
    correo: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = await loginUser(form)

    if (data){
      setAuth(data)
      console.log(data)
      console.log(data.tipo_usuario)
      if (data.tipo_usuario === "2") { //user.tipo_usuario es null, setAuth no funciona?
        navigate("/misEventos");
      } else {
        navigate("/eventos");
      }
    }


    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(form)
    // }
    // console.log(options)
    
    // // const response = await fetch('https://dummyjson.com/auth/login', options)
    // const response = await fetch(LOGIN_URL, options)

    // if (response.ok) {
    //   const data = await response.json()

    //   console.log(data)

    //   setAuth(data)
    //   // setAuth(data.access)

    //   navigate('/eventos')
    // }
  }

  return (
    <main className="flex flex-row justify-center gap-10">
      <div className=" w-[600px] min-w-[600px] pl-[45px] pr-[45px] flex flex-col gap-[88px] text-[24px]"> 
        <h2 className="text-black text-center text-[96px] font-playfair font-bold ">Calenda</h2>

        <form onSubmit={handleLogin} className="flex flex-col text-black  gap-[25px]">
          <div className=" text-black relative ">
            <input
              className=" w-full py-7 px-[33px] bg-white border border-black rounded-[15px]"
              type="text"
              name="correo"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
            />
            <img 
              src="/src/assets/icons/tabler_user-filled.svg" 
              alt="icono"
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className=" w-full py-7 px-[33px] bg-white border border-black rounded-[15px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <img 
              src="/src/assets/icons/tabler_lock-filled.svg" 
              alt="icono"
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="flex flex-row text-center relative">
            <label className=" flex items-center gap-3 cursor-pointer select-none p-1">
              <input
                type="checkbox"
                name="remember"
                className=" h-6 w-6 rounded border-3 border-black text-black focus:ring-black accent-[#3C3C3C]"
              />
              <span className=" text-black font-bold">Remember me</span>
            </label>
            <Link to='/'>
              <h1 className="absolute right-1 top-1/2 -translate-y-1/2  font-bold text-center">Forget password</h1>
            </Link>

          </div>
          <button
            type="submit"
            className="w-full rounded-[15px] py-7 font-boldr text-white bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center ">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="font-bold cursor-pointer]"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
      <div className="w-[600px] min-w-[600px] hidden xl:flex">
        <img src="Online-calendar.svg" alt="Logo" />
      </div>
      {/* <img className= "w-[1000px] h-[599px]  overflow-visible hidden sm:flex"src="Online-calendar.svg" alt="Logo"></img> */}
    </main>
  )
}

export default LoginPage