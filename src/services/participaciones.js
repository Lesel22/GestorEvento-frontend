const BASE_URL = import.meta.env.VITE_BACKEND_URL
const ENROLL_URL = `${BASE_URL}/participaciones`

export const fetchInscripciones2 = async (user) => {
  const url = `${ENROLL_URL}/${user.id}`

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