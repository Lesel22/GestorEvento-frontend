import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router"

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null)

    try {
      await login(form); 
      navigate("/inicio");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="w-full flex flex-row items-start justify-center gap-10 pt-10">
      <div className=" w-full max-w-[500px] min-w-[320px] px-8 flex justify-center flex-col gap-12 text-base"> 
        <h2 className="text-black text-center text-6xl font-playfair font-bold ">Calenda</h2>

        <form onSubmit={handleLogin} className="box-border flex flex-col text-black gap-3">
          <div className=" text-black relative  ">
            {error && (
              <p className="text-red-600 text-center font-semibold">
                {error}
              </p>
            )}
            <input
              className=" box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="text"
              name="email"
              placeholder="Username"
              onChange={handleChange}
              value={form.email}
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_user-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative ">
            <input
              className=" box-border text-[1rem]  font-semibold  w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_lock-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="flex flex-col gap-2  px-1 py-3 text-center min-[20rem]:flex-row min-[20rem]:justify-between">
            <label className=" flex items-center gap-1 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                className=" h-6 w-6 rounded border-3 border-black text-black focus:ring-black accent-[#3C3C3C]"
              />
              <span className=" text-black font-bold">Remember me</span>
            </label>
            <Link to='/'
              className="flex items-center font-bold text-center"
            >
              Forget password?
            </Link>

          </div>
          <button
            type="submit"
            className="w-full box-border border border-[#777777] leading-none rounded-[15px] py-5.5 text-white text-[1.25rem] font-bold bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center py-3">
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
    </main>
  )
}

export default LoginPage