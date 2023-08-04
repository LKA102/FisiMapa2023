const BaseURL = "http://127.0.0.1:8000/"


class Respuesta{
    constructor(object){
        this.object = object
    }

    nombre(){
        return this.object.nombreOficina
    }

    capacidad(){
        return this.object.capacidad
    }

    descripcion(){
        return this.object.descripcion
    }
}

class OficinaAPI{
    static async obtenerOficinas(){
        let url = BaseURL + "obtener-oficinas"
        return await fetch(url)
    }

    static async obtenerOficinaPorNombre(nombre){
        let url = BaseURL + "obtener-oficina"
        const respuesta = await fetch(url + `/${nombre}`)
        return new Respuesta(await respuesta.json())
    }
}

console.log(OficinaAPI.obtenerOficinas().then(
   async response => {console.log(await response.json())})
)

OficinaAPI.obtenerOficinaPorNombre("CERSEU").then(data => {
    console.log(data.nombre());
});