import React, { useEffect, useState } from 'react'
import { fetchInscripciones, fetchInscripciones2 } from '../services/inscripciones';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { searchEventos } from '../services/eventos';
import Icon from '../utils/Icon';

function InscripcionesPage() {
 const { user} = useAuth()
 const [inscripciones, setInscripciones] = useState([])

  useEffect(() => {
    fetchInscripciones2(user).then(results => {
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
    <main className=' w-full min-w-[320px]'>
      <h1 className="text-[40px] font-bold font-playfair text-center py-5">Inscripciones</h1>

      <section className=" flex flex-col items-center gap-3 mx-auto px-6">
        <div className="w-full  text-black relative">
          {/* <img 
            src="/src/assets/icons/tabler_search.svg" 
            alt="icono"
            className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
          /> */}
          <Icon 
          name= "tabler_search" 
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
        <div className=' w-full border-2 border-[#777777] rounded-[15px] overflow-hidden'> 

        <table className="w-full font-roboto text-[16px] table-auto font-medium ">
           <thead className="w-full bg-[#777777] text-white">
            <tr>
              <th className="px-4 py-2 w-5/12 text-left">Nombre</th>
              <th className="px-2 py-2 w-3/12 text-left">Fecha</th>
              <th className="px-2 py-2 w-2/12 text-left">Estado</th>
              <th className="px-2 py-2 w-2/12 text-left"></th>
            </tr>
          </thead>

          <tbody>
           
        {inscripciones?.map(inscripcion => {
          return ( 
            <tr key = {inscripcion.id } className="border-t border-gray-300" >
              <td className='px-4 py-2'>{inscripcion.nombre}</td>
              <td className='px-2 py-2'>{format(new Date(inscripcion.fecha), 'dd-MM-yyyy')}</td>
              <td className='px-2 py-2'>Pendiente</td>
              <td className='px-2 py-2 align-middle'>
                <div className="flex items-center justify-center">
                  <Link to={`/eventos/${inscripcion.id}`}>
                    <Icon name="tabler_info-circle" />
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