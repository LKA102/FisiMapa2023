//Botones encontrar ruta e información
const botonEncontrarRuta = document.getElementById("btn-encontrar-ruta")
const botonInformacion  = document.getElementById("btn-informacion")
const dropDowns = document.getElementById('espacio-encontrar-ruta')
const cuadroInfo = document.getElementById('cuadroInfo');


botonInformacion.addEventListener('click', () => {
    dropDowns.style.display = 'none'
    cuadroInfo.style.display = 'block'
});

botonEncontrarRuta.addEventListener('click', () => {
    dropDowns.style.display = 'block'
    cuadroInfo.style.display = 'none'
});


