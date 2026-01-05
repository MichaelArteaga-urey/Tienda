//funcion para guardar infomacion 
function guardarAlmacenimientoLocal(llave, valor_a_guardar){
    localStorage.setItem(llave,JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenaminetoLocal (llave){
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let productos = obtenerAlmacenaminetoLocal('productos') || [];

//FUNCION PARA LA BARRA DE BUSCAR

const buscador = document.getElementById('buscador')

buscador.addEventListener("input",()=>{
    const texto=buscador.ariaValueMax.toLocaleLowerCase();
    const tarjetas=document.querySelectorAll(".product-card");
    tarjetas.forEach(card=>{
        const nombre = card.querySelector("h3").textContent.toLocaleLowerCase

        if(nombre.includes(texto)){
            card.style.display="block"
        }
        else {
            card.style.display="none"
        }
    })
})