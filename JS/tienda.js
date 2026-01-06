
import { obtenerProductos, inicializarStorage, obtenerCarrito} from "./storage.js";
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

// //CONTADOR DE CARRITO

// export function actualizarContadorCarrito(){
//     const contador=document.getElementById("carritoContador");
//     if(!contador)return;

//     const carrito=obtenerCarrito();

//     const totalCantidad= carrito.reduce(
//         (acc, item)=> acc+item.cantidad,
//         0
//     )
//     if(totalCantidad>0){
//         contador.textContent=totalCantidad;
//         contador.classList.remove("hidden")
//     }
//     else{
//         contador.classList.add("hidden")
//     }

// }

