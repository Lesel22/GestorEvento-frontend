import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { deleteEvento, getEvento } from '../services/eventos';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { createInscripcion, isEnroll } from '../services/inscripciones';

function EventoPage() {
  const {id} = useParams()
  const {user} = useAuth()

  const navigate = useNavigate()
  const [evento, setEvento] = useState([])
  const [inscrito, setInscrito] = useState(null);

  useEffect(() => {
      getEvento(id).then(results => {
        setEvento(results)
      });
      isEnroll(user, id).then(results => {
        setInscrito(results.estado)
      });
  }, []);

  console.log(evento)
  const form = {
    'eventoId' : id,
    'usuarioId' : user.id,
    'tipoUsuario': '3'
  }

  const eliminarEvento = async (id) => {
    await deleteEvento(user, id);
    navigate("/crearEvento");

  };

  const handleButton = async () => {
    try {
      const result = await createInscripcion(user, form);

      if (result) {
      // No necesitas fetchInscripciones aquí
      navigate('/inscripciones');
      }

    } catch (error) {
      console.error("❌ Error al crear inscripción:", error);
      alert(error.message);
    }
  }
// flex flex-col items-center gap-3 mx-auto px-6 w-full min-w-[500px] max-w-[1000px] 
  return (
    <main className=' overflow-x-auto w-full flex flex-col min-[500px]:items-center min-h-screen '>
      <div className='py-10 max-w-[1000px]'>

      <div className='w-full flex flex-col min-[800px]:flex-row   '>
        <div className="w-full mx-auto flex flex-col p-2.5 " >
          <h2 className="font-bold font-playfair leading-[120%] text-[2.5rem] px-1.5">{evento.nombre}</h2>
          <div className='py-4 flex flex-col'>
            <div className="flex flex-row items-center gap-1 text-[1rem] px-2.5">
              <img src= {`${import.meta.env.BASE_URL}icons/location_on.svg`} />
              <span className='font-roboto font-medium'>{evento.lugar}</span>
            </div>
            <div className="flex flex-row items-center gap-1 text-[1rem] p-2.5">
              <img src= {`${import.meta.env.BASE_URL}icons/tabler_calendar-week-filled.svg`} />
              <span className='font-roboto font-medium'>{evento.fecha? format(new Date(evento.fecha), 'dd-MM-yyyy'): 'Nada'}</span>
            </div>
          </div>
          <p className='text-[1rem] px-2.5'>{evento.descripcion}</p>
        </div>
        <div className="flex justify-center p-5">
          <img className="w-[320px] h-auto object-contain"
                src={evento.imagen || "/Pana.svg"} alt="imagen" />
        </div>
      </div>
      <div className='w-full flex justify-center px-2'>
        {inscrito ==='1' && (
          <div className='w-full flex flex-col justify-center text-center px-2 gap-2'>
            <div className='flex flex-row gap-1'>
              <Link 
                to={`/editarEvento/${evento.id}`} 
                state={{ evento }}
                className='p-1.5 text-[1rem] font-bold  flex items-center justify-center text-white w-full h-[50px] mx-auto rounded-[15px] bg-blue-600 hover:bg-[#3C3C3C] cursor-pointer duration-300'
                >
                Editar
              </Link>
              <button
                className='p-1.5 text-[1rem] font-bold  flex items-center justify-center text-white w-full h-[50px] mx-auto rounded-[15px] bg-red-600 hover:bg-[#3C3C3C] cursor-pointer duration-300'
                onClick={() => {
                  if (window.confirm("¿Estás seguro de eliminar este evento?")) {
                    eliminarEvento(evento.id);
                  }
                }}
              >
                Eliminar
              </button> 
            </div>
            <Link 
              to={`/misEventos`} 
              state={{ evento }}
              className='p-1.5 text-[1rem] font-bold flex items-center justify-center text-white w-full h-[50px] mx-auto rounded-[15px] bg-[#777777] hover:bg-[#3C3C3C] cursor-pointer duration-300'
            >
              Participantes
            </Link>
          </div>
        )}
        {inscrito !='1' && (
          <button 
          disabled={inscrito}
          onClick={!inscrito ? handleButton : undefined}
          className={`p-1.5 text-[1rem] font-bold text-center text-white w-full h-[50px] mx-auto rounded-[15px] 
                    ${inscrito
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-[#777777] hover:bg-[#3C3C3C] cursor-pointer duration-300'}
          `}
          >
            {inscrito? 'Ya inscrito' : 'Inscribirme'}
          </button>
        )}

        
          </div>
      </div>
    </main>
  )
}

export default EventoPage