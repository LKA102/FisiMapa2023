class OficinaAPI{
    static async obtenerOficinas(){
        return await fetch("http://127.0.0.1:8000/obtener-oficinas")
    }
}

console.log(OficinaAPI.obtenerOficinas().then(
    response => console.log(response)
))