import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router';
import { deleteEvento, fetchEventos } from '../services/eventos';

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

  const eliminarEvento = async (id) => {
    await deleteEvento(user, id);

    setEventos(prev =>
      prev.filter(evento => evento.id !== id)
    );
  };
  const handleButton = () => {
    navigate("/crearEvento");
  }

  return (
    <main className='overflow-x-auto w-full flex flex-col min-[500px]:items-center min-h-screen'>
      <div className='w-full inline-block min-w-[500px] '>
        <h1 className=" text-[2.5rem] font-bold font-playfair text-center py-5">Mis Eventos</h1>
      </div>
      <section className="flex flex-col items-center gap-3 mx-auto px-6 w-full min-w-[500px] max-w-[1000px]  ">
        <div className="w-full  text-black relative">
          <img 
            src= {`${import.meta.env.BASE_URL}icons/tabler_search.svg`}
            alt="icono"
            className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            className=" w-full h-[50px] py-7 px-16.5 bg-white border border-black rounded-[15px]"
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
          <table className=" w-full border-collapse font-roboto text-[1rem]  table-auto font-medium ">
            <thead className="bg-[#777777] text-white">
              <tr>
                <th className="px-4 py-2 w-2/12 text-left">Codigo</th>
                <th className="px-2 py-2 w-4/12 text-left">Nombre</th>
                <th className="px-2 py-2 w-2/12 text-left">Fecha</th>
                <th className="px-2 py-2 w-2/12 text-left">Estado</th>
                <th className="px-2 py-2 w-2/12 text-left "></th>
              </tr>
            </thead>
            <tbody>
              {eventos?.map(evento => {
                return ( 
                  <tr key = {evento.id } className="border-t border-gray-300" >
                    <td className='px-4 py-2'>000</td>
                    <td className='px-2 py-2'>{evento.nombre}</td>
                    <td className='px-2 py-2'>{format(new Date(evento.fecha), 'dd-MM-yyyy')}</td>
                    <td className='px-2 py-2'>Finalizado</td>
                    <td className='px-2 py-2 flex justify-around'>
                      <Link to={`/editarEvento/${evento.id}`} state={{ evento }}>
                        <img src= {`${import.meta.env.BASE_URL}icons/tabler_edit.svg`} />
                      </Link>
                      <img
                        src={`${import.meta.env.BASE_URL}icons/delete.svg`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (window.confirm("¿Estás seguro de eliminar este evento?")) {
                            eliminarEvento(evento.id);
                          }
                        }}
                      />

                      {/* <Link to={`/eventos/${evento.id}`}>
                        <img src= {`${import.meta.env.BASE_URL}icons/delete.svg`} />
                      </Link> */}
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
          >
            Crear evento
          </button>
        </div>
      </section>
    </main>
  )
}

export default MisEventosPage