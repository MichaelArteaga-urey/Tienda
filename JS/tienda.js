
import { obtenerProductos, inicializarStorage, obtenerCarrito} from "../JS/storage.js";
import { renderProductos } from "./dom.js";

inicializarStorage();

document.addEventListener("DOMContentLoaded", () => {
  const productos = obtenerProductos();
  renderProductos(productos, { mostrarBotones: true});
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

