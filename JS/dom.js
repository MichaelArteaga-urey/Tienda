// dom.js
import { crearCardProducto } from "/JS/cartas.js";

/* ===============================
   RENDER PRODUCTOS POR CATEGORÍA
================================ */
export function renderProductos(productos, opciones = {}) {

    const contenedores = {
        onepiece: document.getElementById("tiendaOnepiece"),
        dragonball: document.getElementById("tiendaDragonball"),
        bleach: document.getElementById("tiendaBleach")
    };

    Object.values(contenedores).forEach(c => {
        if (c) c.innerHTML = "";
    });

    productos.forEach(producto => {
        const contenedor = contenedores[producto.categoria];
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
