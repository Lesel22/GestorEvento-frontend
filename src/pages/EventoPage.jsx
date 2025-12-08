import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getEvento } from '../services/eventos';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { createInscripcion, fetchInscripciones, fetchInscripciones2 } from '../services/inscripciones';
import Icon from '../utils/Icon';



function EventoPage() {
  const {id} = useParams()
  const {user} = useAuth()

  const navigate = useNavigate()
  const [evento, setEvento] = useState([])
  useEffect(() => {
      getEvento(id).then(results => {
        setEvento(results)
      });
  }, []);

  const form = {
    'eventoId' : id,
    'usuarioId' : user.id
  }

  const handleButton = async () => {
    try {
        console.log(user)
        console.log(form)
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

  return (
    <main className='flex flex-col items-center p-10'>
        <div>
            <div className='w-full flex flex-row py-2 '>

                <div className="w-[400px] mx-auto flex flex-col p-2.5 " >
                    <div className="font-bold font-playfair text-[40px] px-1.5">{evento.nombre}</div>
                
                    <div className='flex flex-col'>
                        <div className="flex flex-row items-center gap-1 text-[16px] px-2.5">
                            {/* <img 
                            src="/src/assets/icons/location_on.svg" 
                            alt="icono"
                            /> */}
                            <Icon 
                            name= "location_on" 
                            />
                            <span className='font-roboto font-medium'>{evento.lugar}</span>
                        </div>
                        <div className="flex flex-row items-center gap-1 text-[16px] p-2.5">
                            {/* <img 
                            src="/src/assets/icons/tabler_calendar-week-filled.svg" 
                            alt="icono"
                            /> */}
                            <Icon 
                            name= "tabler_calendar-week-filled" 
                            />
                            <span className='font-roboto font-medium'>{evento.fecha? format(new Date(evento.fecha), 'dd-MM-yyyy'): 'Nada'}</span>
                        </div>
                    </div>
                    <p className='text-[16px] px-2.5'>{evento.descripcion}</p>
               
                    {/* <p className='text-[16px] px-2.5'>Lorem ipsum dolor sit amet consectetur adipiscing elit luctus, auctor ultrices ullamcorper hac sagittis tempus arcu, velit ligula ac etiam per senectus primis. Diam montes nostra accumsan habitasse faucibus, luctus ultricies rhoncus leo suspendisse, purus nisi porta ante. Curae varius commodo lobortis ullamcorper accumsan primis sapien, eu malesuada hac vehicula sociosqu conubia, et montes quis venenatis velit tristique.</p> */}
                </div>
                <div className="flex justify-content p-3">
                    <img className="w-[400px] h-auto"src={evento.imagen} alt="imagen" />
                </div>
            </div>
            
            <div className='flex justify-center px-2'>
                <button 
                className='p-1.5 text-[16px] font-bold text-center text-white w-full h-[50px] mx-auto rounded-[15px] bg-[#777777] cursor-pointer hover:bg-[#3C3C3C] duration-300'
                onClick={handleButton}
                >Inscribirme</button>
            </div>
        </div>
    </main>
  )
}

export default EventoPage