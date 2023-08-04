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
  