const BASE_URL = import.meta.env.VITE_BACKEND_URL
const folder = 'imagenes'

const generarCloudinaryLink = async (archivo) => {
    console.log(archivo)
    if(archivo){
        const [fileName, extension] = archivo.name.split('.')

        const response = await fetch(`${BASE_URL}/multimedia/generar-upload-link`,{
            method:'POST',
            headers:{'Content-Type':'application/json', 'authorization':`Bearer ${token}`},
            body:JSON.stringify({
                fileName,
                extension,
                folder,
                contentType:archivo.type
            },
            
        )})

        const data = await response.json()
        return data.content
    }
}

const subirCloudinary = async (content) => {
    console.log(content)
    // Para subir archivos multimedia mediante un fetch. axios
    const formData = new FormData()

    formData.append('file',archivo)
    formData.append('api_key',content.apiKey)
    formData.append('timestamp',String(content.timestamp)) // El valor de timestamp tiene que ser un string
    formData.append('signature',content.signature)
    formData.append('public_id', content.public_id)
    formData.append('folder', folder)

    const response = await fetch(content.url, {method:'POST', body:formData})
    console.log(response.status)
}

const actualizarFotoEnLaAPI = async (content) => {
    const [_, extension] = archivo.name.split('.')
    await fetch(`${BASE_URL}/multimedia/actualizar-foto-usuario`,{
        method:'PATCH', 
        headers:{
            'Content-Type':'application/json', 
            'authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            usuarioId,
            fileName:content.public_id,
            extension,
            folder,
            contentType:archivo.type
    })})
}

const actualizacionUsuario = async () => {
    await fetch(`${BASE_URL}/usuario`, {
        method:'PATCH', 
        headers:{
            'Content-Type':'application/json', 
            'authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            nombre:nombre.value,
            password:password.value
    })})
}

foto.addEventListener('change',(e)=>{
    archivo = e.target.files[0]
})


actualizar.addEventListener('click',async (e)=>{
    e.preventDefault()

    if(archivo){
        const content = await generarCloudinaryLink()

        await subirCloudinary(content)    
        await actualizarFotoEnLaAPI(content)
    }

    await actualizacionUsuario()

})


