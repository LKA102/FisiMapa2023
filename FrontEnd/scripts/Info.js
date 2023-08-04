const BaseURL = "http://127.0.0.1:8000/"

const fieldMapping = {
    nombre: ['nombreOficina', 'nombreAula', 'nombrePabellon', 'nombreSalon', 'nombreLocal', 'nombreLaboratorio', 'nombreBaño'/* otros nombres de campos */],
    id: ['idOficina', 'idAula', 'idPabellon', 'idSalon', 'idLocal', 'idLaboratorio', 'idBaño'],
    // Agrega más campos y sus correspondientes nombres aquí
};


class Respuesta{
    constructor(object){
        this.object = object
    }

    obtenerCampoGenerico(campo) {
        const nombresEspecificos = fieldMapping[campo];
        if (!nombresEspecificos) {
            throw new Error(`Campo "${campo}" no encontrado en el mapeo.`);
        }

        for (const nombreEspecifico of nombresEspecificos) {
            if (this.object[nombreEspecifico] !== undefined) {
                return this.object[nombreEspecifico];
            }
        }

        throw new Error(`Ninguno de los nombres específicos encontrados para el campo "${campo}".`);
    }

    id(){
        return this.obtenerCampoGenerico['id']
    }

    nombre(){
        return this.obtenerCampoGenerico('nombre')
    }

    capacidad(){
        return this.object.capacidad
    }

    descripcion(){
        return this.object.descripcion
    }

    estado(){
        return this.object.estado
    }

    piso(){
        return this.object.piso
    }


}

class RespuestaOficina extends Respuesta{
    constructor(object){
        super(object)
    }

    horario_inicio_actividades(){
        return this.object.horarioInicioActividades
    }

    horario_fin_actividades(){
        return this.object.horarioFinActividades
    }

    dia_inicio_actividades(){
        return this.object.diaInicioActividades
    }

    dia_fin_actividades(){
        return this.object.diaFinActividades
    }

    encargado(){
        return this.object.encargado
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
    console.log(data.capacidad());
});