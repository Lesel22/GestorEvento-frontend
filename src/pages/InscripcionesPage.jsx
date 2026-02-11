import React, { useEffect, useState } from 'react'
import { fetchInscripciones } from '../services/inscripciones';
import { useAuth } from "../hooks/useAuth"
import { format } from 'date-fns';
import { Link } from 'react-router';
import { searchEventos } from '../services/eventos';

function InscripcionesPage() {
 const { user} = useAuth()
 const [inscripciones, setInscripciones] = useState([])

  useEffect(() => {
    fetchInscripciones(user).then(results => {
      setInscripciones(results.content)
    });
  }, []);

  const [form, setForm] = useState({
    search: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleEnter = () => {
    searchEventos(form).then(results => {
      setInscripciones(results.content)
    });
  }

  return (
    <main className=' overflow-x-auto w-full flex flex-col min-[500px]:items-center min-h-screen'>
      <div className='w-full inline-block min-w-[500px] '>
        <h1 className=" text-[2.5rem] font-bold font-playfair text-center py-5">Inscripciones</h1>
      </div>
      <section className=" flex flex-col items-center gap-3 mx-auto px-6 w-full min-w-[500px] max-w-[1000px] ">
        <div className="w-full  text-black relative">
          <img 
            src= {`${import.meta.env.BASE_URL}icons/tabler_search.svg`}
            alt="icono"
            className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            className=" w-full h-[50px] py-7 px-16.5  bg-white border border-black rounded-[15px]"
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
        <div className='w-full border-2 border-[#777777] rounded-[15px] overflow-hidden'> 
          <table className="w-full border-collapse font-roboto text-[1rem] table-auto font-medium ">
            <thead className=" bg-[#777777] text-white">
              <tr>
                <th className="px-4 py-2 w-5/12 text-left">Nombre</th>
                <th className="px-2 py-2 w-3/12 text-left">Fecha</th>
                <th className="px-2 py-2 w-2/12 text-left">Rol</th>
                <th className="px-2 py-2 w-2/12 text-left"></th>
              </tr>
            </thead>

            <tbody>
              {inscripciones?.map(inscripcion => {
                return ( 
                  <tr key = {inscripcion.id } className="border-t border-gray-300" >
                    <td className='px-4 py-2'>{inscripcion.nombre}</td>
                    <td className='px-2 py-2'>{format(new Date(inscripcion.fecha), 'dd-MM-yyyy')}</td>
                    <td className='px-2 py-2'>{inscripcion.tipoUsuario_display}</td>
                    <td className='px-2 py-2 align-middle'>
                      <div className="flex items-center justify-center">
                        <Link to={`/eventos/${inscripcion.eventoId}`}>
                          <img  src= {`${import.meta.env.BASE_URL}icons/tabler_info-circle.svg`} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default InscripcionesPage