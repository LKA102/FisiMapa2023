const botonEncontrarRuta = document.getElementById("btn-encontrar-ruta")
const botonInformacion  = document.getElementById("btn-informacion")
const dropDowns = document.getElementById('espacio-encontrar-ruta')

botonInformacion.addEventListener('click', () => {
    dropDowns.style.display = 'none'
});

botonEncontrarRuta.addEventListener('click', () => {
    dropDowns.style.display = 'block'
})