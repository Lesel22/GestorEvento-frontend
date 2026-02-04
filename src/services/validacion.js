const BASE_URL = import.meta.env.VITE_BACKEND_URL
const VALIDATE_URL = `${BASE_URL}/habilitar-usuario`

export const HabilitarUser = async (token) => {
  const url = VALIDATE_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // 👈 aquí pasas el token
    },
    body: JSON.stringify(token)
  })

  if (!response.ok) {
    throw new Error('Error al obtener inscripciones')
  }

  return await response.json()
}


// export const ValidarUser = async (dataForm) => {
//   const url = VALIDATE_URL

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'  // 👈 aquí pasas el token
//     },
//     body: JSON.stringify(dataForm)
//   })

//   if (!response.ok) {
//     throw new Error('Error al obtener inscripciones')
//   }

//   return await response.json()
// }