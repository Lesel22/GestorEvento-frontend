import { format } from 'date-fns';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router'
import { createEvento } from '../services/eventos';
import { useAuth } from "../hooks/useAuth"
import { createInscripcion } from '../services/inscripciones';

function CrearEventoPage() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fecha, setFecha] = useState(null);

    const [form, setForm] = useState({
      nombre: '',
      fecha: '',
      lugar: '',
      imagen: null,
      descripcion: '',
      usuarioId: user.id
    })

    const MIN_WORDS = 30;

    // Contar palabras reales (ignora espacios dobles)
    const wordCount = form.descripcion.length;

    const isValid = wordCount >= MIN_WORDS;
  
    const handleChange = (event) => {
      const { name, value } = event.target
      setForm({ ...form, [name]: value })
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setImagen(file);
      setPreview(URL.createObjectURL(file)); // genera la vista previa
    };

  const createEvent = async (event) => {
      event.preventDefault();
      try {
        form.fecha = format(fecha, "yyyy-MM-dd")
        form.imagen = imagen?.name

        const result = await createEvento(user, form, imagen);
        navigate('/misEventos');
        

      } catch (error) {
        console.error("❌ Error al crear evento:", error);
        alert(error.message);
      }
  }

  return (
    <main className="w-full flex flex-row items-start justify-center gap-10 pt-10">
      <div className=" w-full max-w-[500px] min-w-[320px] p-6 flex justify-center flex-col gap-12 text-base"> 
        <h2 className="text-black text-center text-6xl font-playfair font-bold">Crear Evento</h2>
        <form onSubmit={createEvent} className="box-border flex flex-col text-black gap-3">
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="nombre" className="font-bold font-roboto text-black">Nombre*</label>
            <input 
            id="nombre"
            name="nombre"
            type="text"
            onChange={handleChange}
            className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
            placeholder="Ejemplo: Dia del estudiante"
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="fecha" className="font-bold font-roboto text-black">Fecha*</label>
            <DatePicker
              selected={fecha}
              id='fecha'
              name='fecha'
              onChange={date => setFecha(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccione una fecha"
              className='box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]'
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="lugar" className="font-bold font-roboto text-black">Lugar*</label>
            <input 
              id="lugar"
              name="lugar"
              type="text"
              onChange={handleChange}
              className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
              placeholder="Ejemplo: Teatro fenix"
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="imagen" className="font-bold font-roboto text-black">Imagen*</label>
            <input
              type="file"
              id = 'imagen'
              nombre = 'imagen'
              accept="image/*"
              onChange={handleFileChange}
              className="box-border text-[1rem] font-semibold w-full py-5 px-6 bg-white border border-black rounded-[15px]"
            />
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                className="w-40 h-40 object-cover rounded border"
              />
            )}
          </div>
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="descripcion" className="font-bold font-roboto text-black">Descripcion</label>
            <textarea
              id='descripcion'
              name='descripcion'
              value={form.descripcion}
              onChange={handleChange}
              className={`border rounded-lg p-3 h-40 resize-none ${
              isValid ? "border-gray-400" : "border-red-500"
              }`}
              placeholder="Escribe aquí la descripción..."
            />
            <p className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
              Caracteres: {wordCount}/{MIN_WORDS}
            </p>
            {!isValid && (
              <p className="text-red-600 text-xs">
                La descripción debe tener al menos {MIN_WORDS} caracteres.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-[15px] py-7 font-boldr text-white bg-[#777777] hover:bg-[#3C3C3C] duration-300 cursor-pointer"
          >
            Crear Evento
          </button>
        </form>
      </div>
    </main>
  )
}

export default CrearEventoPage