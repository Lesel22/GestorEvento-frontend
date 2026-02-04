const BASE_URL = import.meta.env.VITE_BACKEND_URL
const PRODUCT_URL = `${BASE_URL}/eventos`
const EVENTO_URL = `${BASE_URL}/evento`

export const fetchEventos = async () => {
  const url = PRODUCT_URL

  const response = await fetch(url)

  return await response.json()
}

export const getEvento = async (id) => {
  const url = `${EVENTO_URL}/${id}`
  console.log(url)

  const response = await fetch(url)

  return await response.json()
}

export const searchEventos = async (form) => {
  const cleanForm = Object.fromEntries(
    Object.entries(form).filter(([_, value]) => value !== "")
  );
  const url = `${PRODUCT_URL}?${new URLSearchParams(cleanForm).toString()}`

  const response = await fetch(url)

  return await response.json()
}

export const createEvento = async (user, dataForm, imagen) => {
  const url = PRODUCT_URL

  const formData = new FormData();

  formData.append("data", JSON.stringify(dataForm));
  formData.append("imagen", imagen); // "imagen" debe coincidir con lo que espera tu backend

  console.log("📌 FormData1:", dataForm);
  console.log("📌 FormData2:", imagen);
  console.log("📌 FormData:", formData);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${user.access}` // NO pongas Content-Type
    },
    body: formData
  });

  const result = await response.json();

  console.log("📌 Respuesta del backend:", result);
  console.log("📌 Status:", response.status);

  if (response.ok) return result;

  throw new Error(`Error al crear evento \n - ${result.message}`);
}


export const updateEvento = async (user, id, dataForm, imagen) => {
  const url = `${EVENTO_URL}/${id}`

  const formData = new FormData();

  formData.append("data", JSON.stringify(dataForm));
  formData.append("imagen", imagen); // "imagen" debe coincidir con lo que espera tu backend

  console.log("📌 FormData1:", dataForm);
  console.log("📌 FormData2:", imagen);
  console.log("📌 FormData:", formData);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${user.access}` // NO pongas Content-Type
    },
    body: formData
  });

  const result = await response.json();

  console.log("📌 Respuesta del backend:", result);
  console.log("📌 Status:", response.status);

  if (response.ok) return result;

  throw new Error(`Error al crear evento \n - ${result.message}`);
}

export const deleteEvento = async (user, id) => {
  const url = `${EVENTO_URL}/${id}`
  console.log(url)

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${user.access}` // NO pongas Content-Type
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error eliminando evento");
  }

  // 204 No Content
  if (response.status === 204) {
    return true;
  }

  return await response.json();
}