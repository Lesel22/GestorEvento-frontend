const BASE_URL = import.meta.env.VITE_BACKEND_URL
const REGISTER_URL = `${BASE_URL}/registro`
const LOGIN_URL = `${BASE_URL}/login`

export const registerUser = async (dataForm) => {
  const url = REGISTER_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // 👈 aquí pasas el token
    },
    body: JSON.stringify(dataForm)
  })

  if (!response.ok) {
    throw new Error('Error al obtener inscripciones')
  }

  return await response.json()
}

export const loginUser = async (dataForm) => {
  const url = LOGIN_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // 👈 aquí pasas el token
    },
    body: JSON.stringify(dataForm)
  })

  const result = await response.json();

  console.log("📌 Respuesta del backend:", result);
  console.log("📌 Status:", response.status);

  if (response.ok) return result;

  throw new Error(`Error al login \n - ${result.message}`);
}