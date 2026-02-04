import React, { useEffect, useState } from 'react'
import { fetchEventos, searchEventos } from '../services/eventos';
import { format } from 'date-fns';
import { Link } from 'react-router';

function InicioPage() {
  const [eventos, setEventos] = useState([])
  useEffect(() => {
    fetchEventos().then(results => {
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

  const handleEnter = () => {
    searchEventos(form).then(results => {
      setEventos(results.content)
    });
  }

  return (
    <main className='w-full flex flex-col items-center p-6 min-w-[320px] gap-4'>
      <div className=" flex justify-center">
        <img className='w-[320px] h-auto object-contain' src="Pana.svg" alt="Home" />
      </div>
      <section className="w-full flex flex-col gap-3 max-w-[1000px]">
        <div className="w-full  text-black relative">
          <img 
            src= {`${import.meta.env.BASE_URL}icons/tabler_search.svg`}
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
        <div className='grid grid-cols-1 min-[500px]:grid-cols-2 min-[1000px]:grid-cols-3  gap-4'>
          {eventos?.map(evento => {
            return (
              <Link to={`/eventos/${evento.id}`} key = {evento.id } className="w-full mx-auto  border rounded-[15px] p-2.5" >
                <div className="font-bold font-playfair text-[2.5rem] px-2.5">{evento.nombre}</div>
                
                <div className='flex flex-col justify-between py-4'>
                  <div className="flex flex-row items-center gap-1 text-[1rem] px-2.5">
                    <img 
                      src= {`${import.meta.env.BASE_URL}icons/location_on.svg`}
                      alt="icono"
                    />
                    <span className='font-roboto font-medium'>{evento.lugar}</span>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-[1rem] p-2.5">
                    <img 
                      src= {`${import.meta.env.BASE_URL}icons/tabler_calendar-week-filled.svg`}
                      alt="icono"
                    />
                    <span className='font-roboto font-medium'>{format(new Date(evento.fecha), 'dd-MM-yyyy')}</span>
                  </div>
                </div>
                <p className='text-[1rem] px-2.5 leading-6 line-clamp-2'>{evento.descripcion}</p>  
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default InicioPage
