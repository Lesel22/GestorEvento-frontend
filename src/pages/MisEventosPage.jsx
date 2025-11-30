import React, { useEffect, useState } from 'react'
import { fetchInscripciones, fetchInscripciones2 } from '../services/inscripciones';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router';
import { fetchEventos, searchEventos } from '../services/eventos';

function MisEventosPage() {
const { user} = useAuth()
 const [eventos, setEventos] = useState([])

 const navigate = useNavigate()

  useEffect(() => {
    fetchEventos(user).then(results => {
        setEventos(results.content)
    });
  }, []);

  const [form, setForm] = useState({
    search: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleButton = () => {
    navigate("/crearEvento");
  }

  return (
    <main className='w-full min-w-5xl'>
      <h1 className="text-[40px] font-bold font-playfair text-center py-5">Mis Eventos</h1>

      <section className="w-full flex flex-col items-center gap-4 mx-auto px-20 ">
        <div className="w-full  text-black relative">
          <img 
            src="/src/assets/icons/tabler_search.svg" 
            alt="icono"
            className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            className=" w-full h-[50px] py-7 px-[66px] bg-white border border-black rounded-[15px]"
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEnter(); 
              }
            }}
            value={form.search}
            required
          />
          
        </div>
        <div className=' w-full border border-[#777777] rounded-[15px] overflow-hidden'> 

          <table className=" w-full font-roboto text-[16px]  table-fixed font-medium ">
            <thead className="bg-[#777777] text-white">
              <tr>
                <th className="pl-10 py-2 w-2/12 text-left">Codigo</th>
                <th className="px-4 py-2 w-4/12 text-left">Nombre</th>
                <th className="px-4 py-2 w-2/12 text-left">Fecha</th>
                <th className="px-4 py-2 w-2/12 text-left">Estado</th>
                <th className="px-4 py-2 w-2/12 text-left "></th>
              </tr>
            </thead>

            <tbody>
            
          {eventos?.map(evento => {
            return ( 
              <tr key = {evento.id } className="border-t border-gray-300" >
                <td className='pl-10 py-2'>000</td>
                <td className='px-4 py-2'>{evento.nombre}</td>
                <td className='px-4 py-2'>{format(new Date(evento.fecha), 'dd-MM-yyyy')}</td>
                <td className='px-4 py-2'>Finalizado</td>
                <td className='px-4 py-2 flex justify-around'>
                  <Link to={`/eventos/${evento.id}`}>
                    <img 
                      src="/src/assets/icons/tabler_edit.svg" 
                      alt="icono"
                      />
                  </Link>
                  <Link to={`/eventos/${evento.id}`}>
                    <img 
                      src="/src/assets/icons/delete.svg" 
                      alt="icono"
                      />
                  </Link>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        
        </div>
        <div className='w-full  justify-center'>
            <button 
            className='p-1.5 text-[16px] font-bold text-center text-white w-full h-[50px] mx-auto rounded-[15px] bg-[#777777] cursor-pointer hover:bg-[#3C3C3C] duration-300'
            onClick={handleButton}
            >Crear evento</button>
        </div>
      </section>
    </main>
  )
}

export default MisEventosPage