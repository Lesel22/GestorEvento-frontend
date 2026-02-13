import { useState } from 'react'
import { useNavigate } from 'react-router'
import { registerRequest } from '../services/authService';

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    password_confirm: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const registro = await registerRequest(form)
    if(registro){
        navigate('/esperando-validacion')
      }
      
  }

  return (
    <main className="w-full flex flex-row items-start justify-center gap-10 pt-10">
      <div className="  w-full max-w-[500px] min-w-[320px] px-8 flex justify-center flex-col gap-12 text-base"> 
        <h2 className="text-black text-center text-6xl font-playfair font-bold ">Calenda</h2>

        <form onSubmit={handleRegister} className="box-border flex flex-col text-black gap-3">
          <div className=" text-black relative ">
            <input
              className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="text"
              name="nombre"
              placeholder="Name"
              onChange={handleChange}
              value={form.nombre}
              required
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_user-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className=" box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="text"
              name="apellido"
              placeholder="Last name"
              onChange={handleChange}
              value={form.apellido}
              required
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_user-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="email"
              name="correo"
              placeholder="Email"
              onChange={handleChange}
              value={form.correo}
              required
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_mail.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className=" box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_lock-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="text-black relative">
            <input
              className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              type="password"
              name="password_confirm"
              placeholder="Confirm password"
              onChange={handleChange}
              value={form.password_confirm}
              required
            />
            <img 
              src= {`${import.meta.env.BASE_URL}icons/tabler_lock-filled.svg`}
              alt="icono"
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <button
            type="submit"
            className="w-full box-border border border-[#777777] leading-none rounded-[15px] py-5.5 text-white text-[1.25rem] font-bold bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="w-[500px] min-w-[500px] hidden xl:flex">
        <img src="Online-calendar.svg" alt="Logo" />
      </div>
    </main>
  )
}

export default RegisterPage