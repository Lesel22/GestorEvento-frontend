const BASE_URL = import.meta.env.VITE_BACKEND_URL
const ENROLL_URL = `${BASE_URL}/inscripciones`
const EVENTO_URL = `${BASE_URL}/evento`

export const isEnroll = async (user, id) => {
  const url = `${ENROLL_URL}/${id}/estado`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access}`  // 👈 aquí pasas el token
    }
  })

  return await response.json()
}

export const fetchInscripciones = async (user) => {
  const url = `${ENROLL_URL}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access}`  // 👈 aquí pasas el token
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener inscripciones')
  }

  return await response.json()
}

export const createInscripcion = async (user, dataForm) => {
  const url = ENROLL_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access}`  // 👈 aquí pasas el token
    },
    body: JSON.stringify(dataForm)
  })
  
  const result = await response.json()

  // console.log("📌 Respuesta del backend:", result);
  // console.log("📌 Status:", response.status);


  if (response.ok) {
    
    return result
  }

  throw new Error(`Error al crear inscripciones \n - ${result.message}`)
}


