import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router"
import { loginUser } from "../services/auth";
import userIcon from "../assets/icons/tabler_user-filled.svg"
import candadoIcon from "../assets/icons/tabler_lock-filled.svg"
import Icon from "../utils/Icon";

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
    console.log(form)
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
      <div className=" sm:w-[600px] max-w-[700px] min-w-[320px] pl-[45px] pr-[45px] flex flex-col gap-10 text-[16px]"> 
        <h2 className="text-black text-center text-[60px] font-playfair font-bold ">Calenda</h2>

        <form onSubmit={handleLogin} className="flex flex-col text-black px-10 gap-4">
          <div className=" text-black relative ">
            <input
              className=" w-full py-4 px-6 bg-white border border-black rounded-[15px]"
              type="text"
              name="correo"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
            />
            <Icon 
              name= "tabler_user-filled" 
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className=" w-full py-4 px-6 bg-white border border-black rounded-[15px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
           
            <Icon 
              name= "tabler_lock-filled" 
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="flex flex-col pl-2 text-center sm:flex-row sm:justify-between">
            <label className=" flex items-center gap-3 cursor-pointer select-none p-1">
              <input
                type="checkbox"
                name="remember"
                className=" h-6 w-6 rounded border-3 border-black text-black focus:ring-black accent-[#3C3C3C]"
              />
              <span className=" text-black font-bold">Remember me</span>
            </label>
            <Link to='/'
            className="flex items-center font-bold text-center">
              <h1 >Forget password?</h1>
            </Link>

          </div>
          <button
            type="submit"
            className="w-full rounded-[15px] py-4 font-boldr text-white bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
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
      <div className="w-[500px] min-w-[500px] hidden xl:flex">
        <img src="Online-calendar.svg" alt="Logo" />
      </div>
      {/* <img className= "w-[1000px] h-[599px]  overflow-visible hidden sm:flex"src="Online-calendar.svg" alt="Logo"></img> */}
    </main>
  )
}

export default LoginPage