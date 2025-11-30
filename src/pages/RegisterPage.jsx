import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { loginUser, registerUser } from '../services/auth';

const REGISTER_URL = "http://127.0.0.1:8000/registro";

function RegisterPage() {
  const { isAuth, setAuth } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      // Redireccionamos al login
      navigate('/eventos')
    }

  }, [isAuth])

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    password_confirm: '',
    tipoUsuario: '3'
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const registro = await registerUser(form)
    if(registro){
        const form2 = {
            'correo': form.correo,
            'password' : form.password
        }
        const data = await loginUser(form2)
        if (data){
            setAuth(data)
            navigate('/eventos')
        }
    }  
  }

  return (
    <main className="flex flex-row justify-center gap-10">
      <div className=" w-[600px] min-w-[600px] pl-[45px] pr-[45px] flex flex-col gap-[88px] text-[24px]"> 
        <h2 className="text-black text-center text-[96px] font-playfair font-bold ">Calenda</h2>

        <form onSubmit={handleRegister} className="flex flex-col text-black  gap-[25px]">
          <div className=" text-black relative ">
            <input
              className=" w-full py-7 px-[33px] bg-white border border-black rounded-[15px]"
              type="text"
              name="nombre"
              placeholder="Name"
              onChange={handleChange}
              value={form.nombre}
              required
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
              type="text"
              name="apellido"
              placeholder="Lastname"
              onChange={handleChange}
              value={form.apellido}
              required
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
              type="email"
              name="correo"
              placeholder="Email"
              onChange={handleChange}
              value={form.correo}
              required
            />
            <img 
              src="/src/assets/icons/tabler_mail.svg" 
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
              required
            />
            <img 
              src="/src/assets/icons/tabler_lock-filled.svg" 
              alt="icono"
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className=" w-full py-7 px-[33px] bg-white border border-black rounded-[15px]"
              type="password"
              name="password_confirm"
              placeholder="Confirm password"
              onChange={handleChange}
              value={form.password_confirm}
              required
            />
            <img 
              src="/src/assets/icons/tabler_lock-filled.svg" 
              alt="icono"
              className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-[15px] py-7 font-boldr text-white bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
          >
            Crear
          </button>

        </form>
      </div>
      <div className="w-[600px] min-w-[600px] hidden xl:flex">
        <img src="Online-calendar.svg" alt="Logo" />
      </div>
      {/* <img className= "w-[1000px] h-[599px]  overflow-visible hidden sm:flex"src="Online-calendar.svg" alt="Logo"></img> */}
    </main>
  )
}

export default RegisterPage