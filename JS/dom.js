import { crearCardProducto } from "./cartas.js";
import { actualizarContadorCarrito } from "./contador.js";
export function renderProductos(productos, opciones = {}) {

    const contenedores = document.querySelectorAll("[data-categoria]");

    // limpiar
    contenedores.forEach(c => c.innerHTML = "");

    productos.forEach(producto => {
        const contenedor = document.querySelector(
            `[data-categoria="${producto.categoria}"]`
        );

        if (!contenedor) return;

        const card = crearCardProducto(producto, opciones);
        contenedor.appendChild(card);
    });
}




// ===============================
// BUSCADOR DE PRODUCTOS
// ===============================
const buscador = document.getElementById("buscador");

if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const tarjetas = document.querySelectorAll(".product-card");

        tarjetas.forEach(card => {
            const nombre = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (nombre.includes(texto)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}
// AGREGAR PRODUCTOS

//=====================================0
// AGREGAR AL CARRITO
//=====================================

export function agregarProducto(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}