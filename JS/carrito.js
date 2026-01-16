import {
  obtenerCarrito,
  guardarCarrito,
} from "./storage.js";
import { crearCardProducto } from "./cartas.js"

/* ===============================
   VARIABLES
================================ */
const contenedor = document.getElementById("contenedorCarrito");
const totalSpan = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");

/* ===============================
   RENDER CARRITO
================================ */
function renderCarrito() {
  const carrito = obtenerCarrito();

  // Si no estamos en carrito.html, no hacemos nada
  if (!contenedor || !totalSpan) return;

  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-center text-gray-500'>El carrito está vacío</p>";
    totalSpan.textContent = "$0";
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow p-4 flex gap-4";

    div.innerHTML = `
      <img src="${item.imagen}" class="w-24 h-24 object-cover rounded">
      <div class="flex-1">
        <h3 class="font-bold text-lg">${item.nombre}</h3>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p class="font-semibold">Subtotal: $${subtotal}</p>
        <button class="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          data-id="${item.id}">
          Eliminar
        </button>
      </div>
    `;

    div.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item.id);
    });

    contenedor.appendChild(div);
  });

  totalSpan.textContent = `$${total}`;
}

/* ===============================
   ELIMINAR PRODUCTO
================================ */
function eliminarProducto(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito(carrito);
  renderCarrito();
}

/* ===============================
   VACIAR CARRITO
================================ */
if (botonVaciar) {
  botonVaciar.addEventListener("click", () => {
    guardarCarrito([]);
    renderCarrito();
  });
}
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

/* ===============================
   INICIALIZAR
================================ */
document.addEventListener("DOMContentLoaded", renderCarrito);
