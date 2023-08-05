//Botones encontrar ruta e información
const botonEncontrarRuta = document.getElementById("btn-encontrar-ruta")
const botonInformacion  = document.getElementById("btn-informacion")
const dropDowns = document.getElementById('espacio-encontrar-ruta')
const cuadroInfo = document.getElementById('cuadroInfo');


botonInformacion.addEventListener('click', () => {
    dropDowns.style.display = 'none'
    cuadroInfo.style.display = 'block'
    borrarRecorrido()
});

botonEncontrarRuta.addEventListener('click', () => {
    dropDowns.style.display = 'block'
    cuadroInfo.style.display = 'none'
});

//Referncia boton Detalles con objeto en mapa 
document.addEventListener("DOMContentLoaded", function() {
    const detallesButtons = document.querySelectorAll(".boton-detalle");
  
    detallesButtons.forEach(button => {
      button.addEventListener("mouseover", function() {
        const targetId = button.getAttribute("data-target");
        const targetRect = document.getElementById(targetId);
        if (targetRect) {
          targetRect.style.fill = "#6A8599"; // Cambia el color a azul
        }
      });
  
      button.addEventListener("mouseout", function() {
        const targetId = button.getAttribute("data-target");
        const targetRect = document.getElementById(targetId);
        if (targetRect) {
          targetRect.style.fill = ""; // Restaura el color original (elimina el estilo inline)
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const detallesButtons = document.querySelectorAll(".boton-detalle");

    detallesButtons.forEach(button => {
        button.addEventListener("click", async function(event) {
        event.preventDefault();

        const spanElement = button.previousElementSibling;
        const nombreElemento = spanElement.textContent.trim();
        const entidad = button.getAttribute("data-entity"); // Por ejemplo: "oficina"
        const endpoint = `obtener-${entidad}`;

        let respuesta;
        switch (entidad) {
            case "oficina":
                respuesta = await EntidadAPI.obtenerPorNombre(nombreElemento, endpoint, RespuestaOficina);
                break;
            case "aula":
                respuesta = await EntidadAPI.obtenerPorNombre(nombreElemento, endpoint, RespuestaAula);
                break;
            case "baño":
                respuesta = await EntidadAPI.obtenerPorNombre(nombreElemento, endpoint, RespuestaBaño);
                break;
            case "salon-especial":
                respuesta = await EntidadAPI.obtenerPorNombre(nombreElemento, endpoint, RespuestaSalon);
                break;
            case "local-especial":
                respuesta = await EntidadAPI.obtenerPorNombre(nombreElemento, endpoint, RespuestaLocal);
                break;
            // Agrega más casos para otras entidades
            default:
                throw new Error(`Entidad "${entidad}" no reconocida.`);
        };

            const ventanasEmergentes = document.querySelectorAll(".detalle-popup");
            ventanasEmergentes.forEach(ventana => ventana.remove());

            mostrarInformacion(respuesta);
        });
    });

    // Evento de clic para cerrar la ventana emergente al hacer clic fuera de ella
    document.addEventListener("click", function(event) {
        const detallePopups = document.querySelectorAll(".detalle-popup");
        detallePopups.forEach(ventana => {
            if (!ventana.contains(event.target)) {
                ventana.remove();
            }
        });
    });
});

  function mostrarInformacion(respuesta) {
    const detalleDiv = document.createElement("div");
    detalleDiv.classList.add("detalle-popup");
    switch (true) {
        case respuesta instanceof RespuestaOficina:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Capacidad: ${respuesta.capacidad()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <p>Estado: ${respuesta.estado()}</p>
                <p>Piso: ${respuesta.piso()}</p>
                <p>Encargado: ${respuesta.encargado()}</p>
                <p>Horario inicio actividades: ${respuesta.horario_inicio_actividades()}</p>
                <p>Horario fin actividades: ${respuesta.horario_fin_actividades()}</p>
                <p>Dia inicio actividades: ${respuesta.dia_inicio_actividades()}</p>
                <p>Dia fin actividades: ${respuesta.dia_fin_actividades()}</p>
            `;
            break;
        case respuesta instanceof RespuestaAula:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Capacidad: ${respuesta.capacidad()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <p>Estado: ${respuesta.estado()}</p>
                <p>Piso: ${respuesta.piso()}</p>
                <!-- Otros atributos específicos de aula -->
            `;
            break;
        case respuesta instanceof RespuestaSalon:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Capacidad: ${respuesta.capacidad()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <p>Piso: ${respuesta.piso()}</p>
                <!-- Otros atributos específicos de aula -->
            `;
            break;
        
        case respuesta instanceof RespuestaLocal:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <!-- Otros atributos específicos de aula -->
            `;
            break;
        
        case respuesta instanceof RespuestaBaño:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <p>Piso: ${respuesta.piso()}</p>
                <!-- Otros atributos específicos de aula -->
            `;
            break;

        case respuesta instanceof RespuestaAula:
            detalleDiv.innerHTML = `
                <h2>${respuesta.nombre()}</h2>
                <p>id: ${respuesta.id()}</p>
                <p>Capacidad: ${respuesta.capacidad()}</p>
                <p>Descripción: ${respuesta.descripcion()}</p>
                <p>Estado: ${respuesta.estado()}</p>
                <p>Piso: ${respuesta.piso()}</p>
                <!-- Otros atributos específicos de aula -->
            `;
            break;
        // ... otros casos para más tipos de respuestas ...
        default:
            throw new Error("Tipo de respuesta no reconocido.");
    }
    

    const divMapa = document.querySelector(".div-mapa");
    divMapa.appendChild(detalleDiv);
}