

import { obtenerProductos } from "/JS/storage.js";
import { renderProductos } from "/JS/dom.js";

/* ===============================
   OBTENER PRODUCTOS
================================ */
const productos = obtenerProductos();

/* ===============================
   RENDER INDEX
================================ */
window.addEventListener("load", () => {
    renderProductos(productos, { mostrarBotones: true });
});


//FUNCION PARA LA BARRA DE BUSCAR

const buscador = document.getElementById('buscador')

buscador.addEventListener("input",()=>{
    const texto=buscador.value.toLowerCase();
    const tarjetas=document.querySelectorAll(".product-card");
    tarjetas.forEach(card=>{
        const nombre = card.querySelector("h3").textContent.toLowerCase()

        if(nombre.includes(texto)){
            card.style.display="block"
        }
        else {
            card.style.display="none"
        }
    })
})
